import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(createBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, blog);
    const blogList = await blogService.getAll();
    const updatedBlogList = blogList.map((blogItem) =>
      blogItem.id === blog.id ? likedBlog : blogItem
    );
    dispatch(setBlogs(updatedBlogList));
  };
};

export const delBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    const blogList = await blogService.getAll();
    const updatedList = blogList.filter((blogItem) => blogItem.id !== blog.id);
    dispatch(setBlogs(updatedList));
  };
};

export const { createBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
