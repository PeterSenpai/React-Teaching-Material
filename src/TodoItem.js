import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "./redux/slices/todosSlice";

function TodoItem({ todo, id, status }) {
  const dispatch = useDispatch();
  return (
    <ListItem key={id} role={undefined} dense button>
      <ListItemIcon>
        <Checkbox
          onClick={() => {
            dispatch(toggleTodo(id));
          }}
          edge="start"
          checked={status === "done"}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": id }}
        />
      </ListItemIcon>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/todo/${id}`}
      >
        <ListItemText id={id} primary={`${todo}`} />
      </Link>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => {
            dispatch(deleteTodo(id));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TodoItem;
