import "./App.css";
import { Outlet } from "react-router-dom";

import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
