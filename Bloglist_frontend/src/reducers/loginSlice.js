import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { printMsg, clearMsg } from "./messageSlice";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    userData: (state, action) => {
      return action.payload;
    },
  },
});

export const userLogin = (object) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(object);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(userData(user));
    } catch (exception) {
      dispatch(printMsg("Wrong Credentials"));
      setTimeout(() => {
        dispatch(clearMsg());
      }, 5000);
    }
  };
};

export const { userData } = loginSlice.actions;
export default loginSlice.reducer;
