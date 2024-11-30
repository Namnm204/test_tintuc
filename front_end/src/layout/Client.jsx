import { Outlet } from "react-router-dom";
import Header from "./componentClient/Header";
import Banner from "./componentClient/Banner";
import Nav from "./componentClient/Nav";
import Footer from "./componentClient/Footer";

const Client = () => {
  return (
    <div>
      {/* <Header />
      <Banner />
      <Nav /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Client;
