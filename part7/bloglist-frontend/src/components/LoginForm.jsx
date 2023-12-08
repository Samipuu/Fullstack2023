import { TextField, Button } from "@mui/material";
import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Login</h2>

      <TextField
        label="Username"
        type="text"
        id="username"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      <TextField
        label="Password"
        type="password"
        id="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <Button variant="contained" color="primary" type="submit" id="loginButton">
      Login
    </Button>
  </form>
);

LoginForm.protoTypes = {
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
