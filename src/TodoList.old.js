import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import { nanoid } from "nanoid";

import TodoItem from "./TodoItem";

const styles = (theme) => ({
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
});
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 0, task: "Homework", status: "pending" },
        { id: 2, task: "Lunch", status: "done" },
        { id: 1, task: "Dinner", status: "pending" },
      ],
    };
  }

  handleToggle = (id) => () => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "pending" ? "done" : "pending",
        };
      } else {
        return todo;
      }
    });
    this.setState({ todos: newTodos });
  };

  handleDelete = (id) => () => {
    const newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodos });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        todos: [
          ...this.state.todos,
          { id: nanoid(10), task: e.target.value, status: "pending" },
        ],
      });
      e.target.value = "";
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <TextField
          onKeyDown={this.handleKeyDown}
          className={classes.root}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />

        <List className={classes.root}>
          {this.state.todos.map((todo) => {
            return (
              <TodoItem
                todo={todo.task}
                id={todo.id}
                status={todo.status}
                handleToggle={this.handleToggle}
                handleDelete={this.handleDelete}
              ></TodoItem>
            );
          })}
        </List>
      </>
    );
  }
}

export default withStyles(styles)(TodoList);
