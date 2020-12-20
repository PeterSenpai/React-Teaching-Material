import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

export default function TodoItem({
  handleDelete,
  handleToggle,
  todo,
  id,
  status,
}) {
  return (
    <ListItem key={id} role={undefined} dense button>
      <ListItemIcon>
        <Checkbox
          onClick={handleToggle(id)}
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
        <IconButton edge="end" aria-label="comments" onClick={handleDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
