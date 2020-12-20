import "./App.css";
// import TodoList from "./TodoList";
import TodoList from "./TodoList";
import TodoDetail from "./TodoDetail";
import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { nanoid } from "nanoid";

import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([
    { id: 0, task: "Homework", status: "pending" },
    { id: 2, task: "Lunch", status: "done" },
    { id: 1, task: "Dinner", status: "pending" },
  ]);

  const handleToggle = (id) => () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "pending" ? "done" : "pending",
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => () => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      const newTodos = [
        ...todos,
        { id: nanoid(10), task: e.target.value, status: "pending" },
      ];
      setTodos(newTodos);

      e.target.value = "";
    }
  };
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
        typography: {
          // In Chinese and Japanese the characters are usually larger,
          // so a smaller fontsize may be appropriate.
          fontSize: 24,
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/">
              <TodoList
                todos={todos}
                handleDelete={handleDelete}
                handleKeyDown={handleKeyDown}
                handleToggle={handleToggle}
                margin="10px"
              ></TodoList>
            </Route>

            <Route exact path="/todo/:id">
              <TodoDetail todos={todos}></TodoDetail>
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
