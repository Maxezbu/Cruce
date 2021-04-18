import React from "react";
import { useSelector } from "react-redux";
import AdminPanel from "../components/Admin/AdminPanel";
import Error from "../components/Error";

export default function App() {
  const user = useSelector((state) => state.users.user);

  return <div>{user.id && user.admin ? <AdminPanel /> : <Error />}</div>;
}
