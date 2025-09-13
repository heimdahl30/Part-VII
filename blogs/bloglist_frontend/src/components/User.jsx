import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const User = ({ user }) => {
  return (
    <Page>
      <table>
        <thead>
          <tr>
            <th style={{ paddingRight: "50px", fontSize: "20px" }}>Name</th>
            <th style={{ fontSize: "20px" }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </p>
            </td>
            <td style={{ paddingLeft: "30px", fontSize: "18px" }}>
              {user.blogs.length}
            </td>
          </tr>
        </tbody>
      </table>
    </Page>
  );
};

export default User;
