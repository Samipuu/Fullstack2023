import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Notification from "./utils/notification";
import Blogs from "./components/Blogs";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { login, setUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { Routes, Route, useMatch } from "react-router-dom";
import User from "./components/User";
import Menu from "./components/Menu";
import { Container } from "@mui/material";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const blogs = useSelector((state) => {
    console.log(state.blogs);
    return [...state.blogs];
  });
  const user = useSelector((state) => {
    return state.user;
  });
  const users = useSelector((state) => {
    return state.users;
  });

  const match = useMatch("/users/:id");
  const userProfile = match
    ? users.find((profile) => profile.id === match.params.id)
    : null;
  const userBlogs = match
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : null;
  const blogMatch = useMatch("/blogs/:id");
  const blogProfile = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const dispatch = useDispatch();
  const compareLikes = (a, b) => {
    return -(a.likes - b.likes);
  };
  blogs.sort(compareLikes);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username);
    try {
      dispatch(login(username, password));
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Login succesfull`));
    } catch (exception) {
      console.log("Login failed");
      dispatch(setNotification(`error Login failed ${exception}`));
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  if (user === null) {
    return (
      <Container>
        <div>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            password={password}
            username={username}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <Menu />
        <Notification />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route
            path="/users/:id"
            element={<User props={userProfile} blogs={userBlogs} />}
          />
          <Route path="/" element={<Blogs blogs={blogs} />} />
          <Route path="/blogs/:id" element={<Blog blog={blogProfile} />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
