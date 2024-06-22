import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

//components
import Todo from "./Todo";

//OTHERS
import { TodosContext } from "../context/todosContext";
import { useContext, useState, useEffect } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setdisplayedTodosTypet] = useState("all");

  //FİLTERATİON ARRAYS
  const completedTodos = todos.filter((t) => {
    return t.iscompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.iscompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ??[];
    setTodos(storageTodos);
  }, [] );

  function changeDisplayedType(e) {
    setdisplayedTodosTypet(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      iscompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style={{ maxHeight: "80vh" , overflow:"scroll" }}>
        <CardContent>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            مهامي
          </Typography>
          <Divider />

          {/* FIILTER BUTTONS */}
          <ToggleButtonGroup
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              direction: "ltr",
            }}
          >
            <ToggleButton value="non-completed">الغير منجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* ===== FIILTER BUTTONS ===== */}

          {/* ALL TODOS */}
          {todosJsx}
          {/* ==== ALL TODOS ==== */}

          {/* INPUT + ADD BUTTON */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              xs={8}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length ===0}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
          {/* ====INPUT + ADD BUTTON==== */}
        </CardContent>
      </Card>
    </Container>
  );
}
