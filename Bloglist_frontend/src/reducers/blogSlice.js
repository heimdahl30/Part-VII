import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { initializeUsers } from "./userSlice";

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
    console.log("newBlog blogSlice vich", newBlog);
    dispatch(createBlog(newBlog));
    dispatch(initializeUsers());
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, blog);
    const blogList = await blogService.getAll();
    console.log("blogList", blogList);
    /* const updatedBlogList = blogList.map((blogItem) =>
      blogItem.id === blog.id ? likedBlog : blogItem
    ); */
    dispatch(setBlogs(blogList));
  };
};

export const delBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    const blogList = await blogService.getAll();
    console.log("delete blogList", blogList);
    // const updatedList = blogList.filter((blogItem) => blogItem.id !== blog.id);
    dispatch(setBlogs(blogList));
    dispatch(initializeUsers());
  };
};

export const addComments = (blog, comment) => {
  return async (dispatch) => {
    await blogService.comment(comment, blog.id);
    const blogList = await blogService.getAll();
    dispatch(setBlogs(blogList));
  };
};

export const { createBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
