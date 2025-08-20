import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
