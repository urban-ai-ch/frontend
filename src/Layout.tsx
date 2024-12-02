import React from "react";
import "./Layout.css";

import { Navbar } from "./components/Navbar";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      <main className="container-fluid">{props.children}</main>
    </>
  );
};

export default Layout;
