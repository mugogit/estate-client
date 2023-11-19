import React from "react";
import { Outlet } from "react-router-dom";
import "./mainLayout.scss";

const MainLayout = (): JSX.Element => {
  return (
    <div className="main-layout">
      <Outlet />
    </div>
  );
};

export default MainLayout;
