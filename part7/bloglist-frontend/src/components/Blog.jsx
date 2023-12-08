import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, upvoteBlog, addComment } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import { List, ListItem, TextField, Button } from "@mui/material";

const Blog = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const loggedUserJSON = window.localStorage.getItem("loggedUser");
  const user = JSON.parse(loggedUserJSON);

  if (!blog || !user) {
    return null;
  }
  const createdBy = {
    display: blog.user.username !== user.username ? "none" : "",
  };

  const removeBlog = () => {
    if (!window.confirm(`Are you sure you want to remove blog ${blog.title}`)) {
      return;
    }
    const id = blog.id;
    dispatch(deleteBlog(id, user));
  };

  const likeBlog = () => {
    dispatch(upvoteBlog(blog));
  };

  const handleAddComment = (event) => {
    console.log(event);
    event.preventDefault();
    const id = blog.id;
    console.log(`Adding comment ${comment} to blog ${id}`);
    dispatch(addComment(id, comment));
    setComment("");
  };

  console.log(blog);
  console.log(blog.user);
  return (
    <div id={blog.id}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <List>
          <ListItem>
            <Link to={blog.url}>{blog.url}</Link>
          </ListItem>
          <ListItem>
            {blog.likes} likes
            <Button variant="contained" color="primary" onClick={likeBlog}>
              Like
            </Button>
          </ListItem>
          <ListItem>Added by {blog.user.username}</ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              style={createdBy}
              onClick={removeBlog}
            >
              Remove
            </Button>
          </ListItem>
        </List>
        <div>
          <h3>Comments</h3>
          <form onSubmit={handleAddComment}>
            <TextField
              label="Comment"
              type="text"
              value={comment}
              name="Comment"
              id="comment"
              onChange={({ target }) => setComment(target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Add comment
            </Button>
          </form>
          <List>
            {blog.comments.map((comment, index) => {
              return <ListItem key={index}>{comment}</ListItem>;
            })}
          </List>
        </div>
      </div>
    </div>
  );
};
export default Blog;
