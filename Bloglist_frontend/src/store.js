import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageSlice";
import blogReducer from "./reducers/blogSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    blogs: blogReducer,
  },
});
