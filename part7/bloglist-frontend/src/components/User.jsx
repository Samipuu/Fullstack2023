import { List, ListItem } from "@mui/material";

const User = ({ props, blogs }) => {
  if (!props) {
    return null;
  }
  return (
    <div>
      <h2>{props.name}</h2>
      <h3>Added blogs</h3>
      <List>
        {blogs.map((blog) => {
          return <ListItem key={blog.id}>{blog.title}</ListItem>;
        })}
      </List>
    </div>
  );
};

export default User;
