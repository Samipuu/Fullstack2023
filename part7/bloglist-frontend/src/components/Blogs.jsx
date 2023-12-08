import Togglable from "../utils/visibility";
import AddForm from "./AddForm";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const Blogs = ({ blogs }) => {
  const addFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  console.log(blogs);

  const handleNewBlog = async (blog) => {
    console.log(`Creating new blog ${blog.title} by user ${user}`);
    try {
      const newBlog = {
        user: user,
        title: blog.title,
        author: blog.author,
        url: blog.url,
      };

      dispatch(createBlog(newBlog));
      dispatch(setNotification(`Blog ${blog.title} has been added`));
      addFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log("Creating failed");
      console.log(exception);
      dispatch(setNotification(`error ${exception}`));
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Add blog" ref={addFormRef}>
        <AddForm handleNewBlog={handleNewBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow className="blog" key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>

                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
