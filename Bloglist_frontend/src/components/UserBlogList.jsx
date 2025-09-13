import { useParams } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const UserBlogList = ({ userInfo }) => {
  const id = useParams().id;
  const user = Array.isArray(userInfo)
    ? userInfo.find((user) => user.id === id)
    : [];

  return (
    <Page>
      <h2>blogs</h2>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Page>
  );
};

export default UserBlogList;
