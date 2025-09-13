import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import User from "./components/User";
import BlogView from "./components/BlogView";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
import BlogCreateForm from "./components/BlogCreateForm";
import UserBlogList from "./components/UserBlogList";
// import blogService from "./services/blogs";
// import loginService from "./services/login";
import { printMsg, clearMsg } from "./reducers/messageSlice";
import {
  appendBlog,
  initializeBlogs,
  likeBlog,
  delBlog,
} from "./reducers/blogSlice";
import { userLogin } from "./reducers/loginSlice";
import { initializeUsers } from "./reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;
const Input = styled.input`
  margin: 0.25em;
`;
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;
const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  // const [user, setUser] = useState(null);

  const [blogFormVisible, setBlogFormVisible] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.messages);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const userInfo = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  console.log("userinfo", userInfo);

  let sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes);

  console.log(sortedBlog);

  const handleLogin = async (event) => {
    event.preventDefault();
    //const user = await loginService.login({ username, password });

    dispatch(userLogin({ username, password }));

    /*window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log("Success", user);
      setUser(user);
      */
    setUsername("");
    setPassword("");
  };

  const handleLogOut = async () => {
    window.localStorage.removeItem("loggedUser");
    navigate("/");
    window.location.reload();
  };

  const addBlog = (newBlog) => {
    console.log("newBlog", newBlog);
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
      navigate("/");
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
      <Page>
        <ErrorNotification errorMessage={msg} />

        <Routes>
          <Route
            path="/"
            element={
              <form onSubmit={handleLogin}>
                <div>
                  username
                  <Input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div>
                  password
                  <Input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <Button type="submit">login</Button>
              </form>
            }
          />
        </Routes>
      </Page>
    );
  } else {
    const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
    const showWhenVisible = { display: blogFormVisible ? "" : "none" };

    return (
      <Page>
        <Navigation>
          <Link
            to="/"
            style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
          >
            blogs
          </Link>
          <Link
            to="/users"
            style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
          >
            users
          </Link>{" "}
          {user.name} logged in <Button onClick={handleLogOut}>logout</Button>
        </Navigation>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SuccessNotification message={msg} />
                <h2>blogs</h2>
                <div style={hideWhenVisible} key="first">
                  <Button onClick={() => setBlogFormVisible(true)}>
                    create blog
                  </Button>
                </div>
                <div style={showWhenVisible} key="second">
                  <BlogCreateForm createBlog={addBlog} />
                  <Button onClick={() => setBlogFormVisible(false)}>
                    cancel
                  </Button>
                </div>
                <br></br>
                {sortedBlog.map((blog) => (
                  <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      <Blog blog={blog} />
                    </Link>
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blogs={blogs}
                increaseLike={increaseLike}
                user={user}
                handleLogOut={handleLogOut}
                deleteBlog={deleteBlog}
              />
            }
          />
          <Route
            path="/users"
            element={
              <>
                <h2>Users</h2>
                {Array.isArray(userInfo)
                  ? userInfo.map((user) => <User key={user.id} user={user} />)
                  : []}
              </>
            }
          />
          <Route
            path="/users/:id"
            element={<UserBlogList userInfo={userInfo} />}
          />
        </Routes>
      </Page>
    );
  }
};

export default App;
