const initialState = [
  { id: 0, task: "Homework", status: "pending" },
  { id: 2, task: "Lunch", status: "done" },
  { id: 1, task: "Dinner", status: "pending" },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];

    case "DELETE_TODO":
      return state.filter((todo) => {
        return todo.id !== action.payload;
      });

    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            status: todo.status === "pending" ? "done" : "pending",
          };
        } else {
          return todo;
        }
      });

    default:
      return state;
  }
};
