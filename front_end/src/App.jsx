import { Route, Routes } from "react-router-dom";
import "./App.css";
import Client from "./layout/client/Client";
// import HomePage from "./pages/HomePage";
import UserList from "./pages/admin/products/UserList ";
import UserForm from "./pages/admin/products/UserForm";
import AdminLayout from "./layout/admin/index";
import ProductDetailPage from "./pages/admin/products/ProductDetailPage";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/admin/user/Login ";
import BannerList from "./pages/admin/banner";

function App() {
  return (
    <Routes>
      <Route path="" element={<Client />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route
        path="admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route
          path=""
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="add"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path=":id"
          element={
            <PrivateRoute>
              <ProductDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="banners"
          element={
            <PrivateRoute>
              <BannerList />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
