import PropTypes from "prop-types";

import styled from "styled-components";

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Page>
      <div style={blogStyle} className="blog">
        {blog.title} {"\n"} {blog.author} {"\n"}{" "}
      </div>
    </Page>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
