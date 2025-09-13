import { useParams } from "react-router-dom";
import { useState } from "react";
import { addComments } from "../reducers/blogSlice";
import { useDispatch } from "react-redux";
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

const BlogView = ({ user, handleLogOut, blogs, increaseLike, deleteBlog }) => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const addComment = (commentedBlog, text) => {
    dispatch(addComments(commentedBlog, { comment: text }));
    setComment("");
  };

  console.log("comment", comment);

  if (blog.users.length !== 0 && blog.users[0].name === user.name) {
    return (
      <Page>
        <h2>blogs</h2>
        <h2>{blog.title}</h2>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <div data-testid="likes">
          likes {blog.likes} {"\n"}
          <Button onClick={() => increaseLike(blog)}>like</Button>
        </div>
        <div>added by {blog.users[0].name} </div>
        <div>
          <Button
            onClick={() => deleteBlog(blog)}
            style={{ background: "blue" }}
          >
            {" "}
            remove blog{" "}
          </Button>
          <h3>comments</h3>
          <Input
            type="text"
            value={comment}
            name="Comment"
            onChange={(event) => setComment(event.target.value)}
          />
          <Button onClick={() => addComment(blog, comment)}>add comment</Button>
        </div>
        <ul>
          {blog.comments
            ? blog.comments.map((item, index) => <li key={index}>{item}</li>)
            : []}
        </ul>
      </Page>
    );
  } else if (blog.users.length !== 0 && blog.users[0].name !== user.name) {
    return (
      <Page>
        <h2>blogs</h2>
        <p>
          {" "}
          {user.name} logged in <button onClick={handleLogOut}>logout</button>
        </p>
        <h2>{blog.title}</h2>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <div data-testid="likes">
          likes {blog.likes} {"\n"}
          <Button onClick={() => increaseLike(blog)}>like</Button>
        </div>
        <div>added by {blog.users[0].name}</div>
        <h3>comments</h3>
        <Input
          type="text"
          value={comment}
          name="Comment"
          onChange={(event) => setComment(event.target.value)}
        />
        <Button onClick={() => addComment(blog, comment)}>add comment</Button>
        <ul>
          {blog.comments
            ? blog.comments.map((item, index) => <li key={index}>{item}</li>)
            : []}
        </ul>
      </Page>
    );
  } else {
    <Page>
      <h2>blogs</h2>
      <p>
        {" "}
        {user.name} logged in <button onClick={handleLogOut}>logout</button>
      </p>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>
      <div data-testid="likes">
        likes {blog.likes} {"\n"}
        <Button onClick={() => increaseLike(blog)}>like</Button>
      </div>
      <h3>comments</h3>
      <Input
        type="text"
        value={comment}
        name="Comment"
        onChange={(event) => setComment(event.target.value)}
      />
      <Button onClick={() => addComment(blog, comment)}>add comment</Button>
      <ul>
        {blog.comments
          ? blog.comments.map((item, index) => <li key={index}>{item}</li>)
          : []}
      </ul>
    </Page>;
  }
};

export default BlogView;
