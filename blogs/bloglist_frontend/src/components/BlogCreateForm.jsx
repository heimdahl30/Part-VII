import { useState } from "react";
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

const BlogCreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <Input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title...."
          />
        </div>
        <div>
          author:
          <Input
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author...."
          />
        </div>
        <div>
          url:
          <Input
            data-testid="url"
            type="url"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url...."
          />
        </div>
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
};

export default BlogCreateForm;
