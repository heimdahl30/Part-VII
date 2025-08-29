export const messageReducer = (state = null, action) => {
  switch (action.type) {
    case "MESSAGE":
      return action.payload;
    case "ERROR":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};
