import React from "react";
import Header from "./components/custom/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default Layout;
