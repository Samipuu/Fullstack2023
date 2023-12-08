import { Button, AppBar, Toolbar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { out } from "../reducers/userReducer";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const logout = (event) => {
    console.log("Logging out");
    dispatch(out());
    window.localStorage.clear();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit">
          <Link to="/">blogs</Link>
        </Button>
        <Button color="inherit">
          <Link to="/users">users</Link>
        </Button>
        Logged in as {user.username}{" "}
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
