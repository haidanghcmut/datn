// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { setAuthorization } from "../services/axios";

const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    setAuthorization();
    localStorage.setItem("store", null);
    setAuthState({
      select: 1,
      isAuthenticated: false,
      user: {},
    });
    navigate("/");
  };

  const goHome = () => {
    setAuthState((state) => ({
      ...state,
      select: 1,
    }));
    navigate("/");
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-green-500 text-xl font-bold mb-4 md:mb-0">
          OCR
        </Link>
        <div className="flex">
          {!authState?.isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="mx-1 px-4 py-2 bg-green-500 text-black font-bold rounded"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="mx-1 px-4 py-2 bg-green-500 text-black font-bold rounded"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <button
                className="mx-1 px-4 py-2 bg-green-500 text-black font-bold rounded"
                onClick={goHome}
              >
                Trang chủ
              </button>
              <button
                className="mx-1 px-4 py-2 bg-green-500 text-black font-bold rounded"
                onClick={logOut}
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
