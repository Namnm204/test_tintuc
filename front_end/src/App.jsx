import { Route, Routes } from "react-router-dom";
import "./App.css";
import Client from "./layout/client/Client";
// import HomePage from "./pages/HomePage";
import AdminLayout from "./layout/admin/index";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/admin/user/Login ";
import BannerList from "./pages/admin/banner";
import ProductsDetail from "./pages/client/component/conponent/ProductDetail/ProductsDetail";
import TintucList from "./pages/admin/tintucs/TintucList ";
import TintucAdd from "./pages/admin/tintucs/TintucAdd";
import UpdatePostForm from "./pages/admin/tintucs/TintucUpdate";
import DetailTintucPageAdmin from "./pages/admin/tintucs/TintucDetailPage";
import NotFound from "./pages/client/component/NotFoudPage";

function App() {
  return (
    <Routes>
      <Route path="" element={<Client />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="tintuc">
        <Route path=":slug" element={<ProductsDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />

      <Route path="admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
        <Route path="" element={<PrivateRoute><TintucList /></PrivateRoute>} />
        <Route path="add" element={<PrivateRoute><TintucAdd /></PrivateRoute>} />
        <Route path="edit/:slug" element={<PrivateRoute><UpdatePostForm /></PrivateRoute>} />
        <Route path=":slug" element={<PrivateRoute><DetailTintucPageAdmin /></PrivateRoute>} />
        <Route path="banners" element={<PrivateRoute><BannerList /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
