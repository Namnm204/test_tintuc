import { Route, Routes } from "react-router-dom";
import "./App.css";
import Client from "./layout/Client";
import HomePage from "./pages/HomePage";
import UserList from "./pages/UserList ";
import UserForm from "./pages/UserForm";

function App() {
  return (
    <Routes>
      <Route element={<Client />}>
        {/* Đặt Client là route cha */}
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
        {/* <Route path="/edit/:id" element={<UserForm />} /> */}
        <Route index element={<HomePage />} /> {/* HomePage là route con */}
      </Route>
    </Routes>
  );
}

export default App;
