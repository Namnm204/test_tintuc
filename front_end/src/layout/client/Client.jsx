import HomePage from "../../pages/client/HomePage";
import Banner from "./componentClient/Banner";
import Footer from "./componentClient/Footer";
import Header from "./componentClient/Header";
import Nav from "./componentClient/Nav";

const Client = () => {
  return (
    <div>
      <Header />
      {/* <Banner /> */}
      {/* <Nav /> */}
      <main>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
};

export default Client;
