import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, selectTodos } from "./redux/slices/todosSlice";

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

function TodoList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(addTodo(e.target.value));

      e.target.value = "";
    }
  };

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
            ></TodoItem>
          );
        })}
      </List>
    </>
  );
}

export default TodoList;
