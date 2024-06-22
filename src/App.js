import React from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./context/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";



const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});
const initislTodos = [
  {
    id: uuidv4(),
    title: "Learn React",
    details: "start from in the basics",
    iscompleted: false,
  },
  {
    id: uuidv4(),
    title: "Learn React",
    details: "start from in the basics",
    iscompleted: false,
  },
  {
    id: uuidv4(),
    title: "Learn React",
    details: "start from in the basics",
    iscompleted: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initislTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
