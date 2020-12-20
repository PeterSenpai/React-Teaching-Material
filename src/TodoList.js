import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import TodoItem from "./TodoItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    backgroundColor: theme.palette.background.paper,
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function TodoList({
  todos,
  handleDelete,
  handleKeyDown,
  handleToggle,
}) {
  const classes = useStyles();

  // const [todos, setTodos] = useState([
  //   { id: 0, task: "Homework", status: "pending" },
  //   { id: 2, task: "Lunch", status: "done" },
  //   { id: 1, task: "Dinner", status: "pending" },
  // ]);

  // const handleToggle = (id) => () => {
  //   const newTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       return {
  //         ...todo,
  //         status: todo.status === "pending" ? "done" : "pending",
  //       };
  //     } else {
  //       return todo;
  //     }
  //   });
  //   setTodos(newTodos);
  // };

  // const handleDelete = (id) => () => {
  //   const newTodos = todos.filter((todo) => {
  //     return todo.id !== id;
  //   });
  //   setTodos(newTodos);
  // };

  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 13) {
  //     const newTodos = [
  //       ...todos,
  //       { id: nanoid(10), task: e.target.value, status: "pending" },
  //     ];
  //     setTodos(newTodos);

  //     e.target.value = "";
  //   }
  // };

  return (
    <>
      <TextField
        onKeyDown={handleKeyDown}
        className={classes.root}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />

      <List className={classes.root}>
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo.task}
              id={todo.id}
              status={todo.status}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            ></TodoItem>
          );
        })}
      </List>
    </>
  );
}
