import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => {
    return state.users;
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={user.id}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
