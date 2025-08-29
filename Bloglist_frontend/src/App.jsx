import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
import BlogCreateForm from "./components/BlogCreateForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { printMsg, clearMsg } from "./reducers/messageSlice";
import {
  appendBlog,
  initializeBlogs,
  likeBlog,
  delBlog,
} from "./reducers/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);

  const [blogFormVisible, setBlogFormVisible] = useState(false);

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.messages);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  console.log(username);
  console.log(password);

  let sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes);

  console.log(sortedBlog);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogService.setToken(user.token);

      console.log("Success", user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setUsername("");
      setPassword("");
      dispatch(printMsg("Wrong Credentials"));
      setTimeout(() => {
        dispatch(clearMsg());
      }, 5000);
    }
  };

  const handleLogOut = async () => {
    window.localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  const addBlog = (newBlog) => {
    dispatch(appendBlog(newBlog));
    dispatch(printMsg(`a new blog ${newBlog.title} has been created`));
    setTimeout(() => {
      dispatch(clearMsg());
    }, 5000);
  };

  const increaseLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    console.log(blog.id);
    console.log(updatedBlog);

    dispatch(likeBlog(updatedBlog));

    /*blogService
      .update(blog.id, updatedBlog)
      .then((result) => {
        setBlogs(
          blogs.map((blog) => (blog.id === result.id ? updatedBlog : blog))
        );
      })
      .catch((error) => console.log(error));
      */
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title}`)) {
      dispatch(delBlog(blog));
      /*
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((post) => post.id !== blog.id));
        })
        .catch((error) => console.log(error));
        */
    }
  };

  if (user === null) {
    return (
      <div>
        <ErrorNotification errorMessage={msg} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
    const showWhenVisible = { display: blogFormVisible ? "" : "none" };

    return (
      <div>
        <SuccessNotification message={msg} />
        <h2>blogs</h2>
        <p>
          {" "}
          {user.name} logged in <button onClick={handleLogOut}>logout</button>
        </p>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogCreateForm createBlog={addBlog} />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
        <br></br>
        {sortedBlog.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            increaseLike={increaseLike}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    );
  }
};

export default App;
