import { Route, Routes } from "react-router-dom";
import "./App.css";
import Client from "./layout/client/Client";
// import HomePage from "./pages/HomePage";
import UserList from "./pages/admin/products/TintucList ";
import UserForm from "./pages/admin/products/TintucForm";
import AdminLayout from "./layout/admin/index";
import ProductDetailPage from "./pages/admin/products/TintucDetailPage";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/admin/user/Login ";
import BannerList from "./pages/admin/banner";
import ProductsDetail from "./pages/client/component/conponent/ProductDetail/ProductsDetail";

function App() {
  return (
    <Routes>
      <Route path="" element={<Client />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="tintuc">
        <Route path=":slug" element={<ProductsDetail />} />
      </Route>

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
          path=":slug"
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
