import { UserInterface } from "../../interfaces/Interfaces";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import axios from "axios";
import { FireErrorNotification } from "../../utils/FireNotificiation";
import { useContext } from "react";
import ReloadDashboardContext from "../../context/ReloadDashboardContext";

const UsersList = ({ users }: { users: UserInterface[] }) => {
  const ReloadCtx = useContext(ReloadDashboardContext);

  const handleDelete = (userID: string, username: string) => {
    Swal.fire({
      title: `Delete user (${username})?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#ff1867",
      cancelButtonColor: "#27282c",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/users/${userID}`)
          .then((res) => {
            FireErrorNotification("User deleted successfully.");
            ReloadCtx.UpdateReloadUsers();
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Registred on</th>
            <th>Role</th>
            <th className="text-center">Orders</th>
            <th className="text-center">Remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{new Date(user.createdAt).toString().substring(0, 15)}</td>
                <td>{user.role}</td>
                <td className="text-center">{user.totalOrders}</td>
                <td className="text-center">
                  <Tooltip title="Delete user">
                    <button
                      className="decline rounded"
                      onClick={() => {
                        handleDelete(user._id, user.username);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
