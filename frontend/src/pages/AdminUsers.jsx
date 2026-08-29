import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2, Ban, CheckCircle } from "lucide-react";
import api from "../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (u) => {
    const newStatus = u.status === "active" ? "blocked" : "active";
    try {
      await api.put(`/admin/users/${u._id}/status`, { status: newStatus });
      toast.success(`User ${newStatus === "blocked" ? "blocked" : "unblocked"}`);
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <div className="page-loader">Loading users...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Users</h1>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge badge-${u.role}`}>{u.role}</span>
                </td>
                <td>
                  <span className={`badge ${u.status === "active" ? "badge-active" : "badge-blocked"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="admin-actions">
                  {u.status === "active" ? (
                    <Ban size={16} title="Block user" onClick={() => toggleStatus(u)} />
                  ) : (
                    <CheckCircle size={16} title="Unblock user" onClick={() => toggleStatus(u)} />
                  )}
                  <Trash2 size={16} onClick={() => handleDelete(u._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
