import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageSlice";
import blogReducer from "./reducers/blogSlice";
import loginReducer from "./reducers/loginSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
  },
});
