import { Route, Routes } from "react-router-dom";
import "./App.css";
import Client from "./layout/Client";
// import HomePage from "./pages/HomePage";
import UserList from "./pages/admin/products/UserList ";
import UserForm from "./pages/admin/products/UserForm";
import AdminLayout from "./layout/admin/index";

function App() {
  return (
    <Routes>
      <Route path="" element={<Client />}>
      
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="" element={<UserList />} />
        <Route path="add" element={<UserForm />} />
      </Route>
    </Routes>
  );
}

export default App;
