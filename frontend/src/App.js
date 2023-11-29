import Login from "./login/login";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Predict from "./predict";
import Header from "./header/header";
import Footer from "./footer/footer";
import Register from "./register/register";
import Home from "./home/home";
import { setAuthorization } from "./services/axios";

export const AuthContext = React.createContext();

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: {},
    select: 1,
  });

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("store"));
    if (local) {
      setAuthorization(local.token);
      setAuthState((state) => ({
        ...state,
        isAuthenticated: true,
        user: local.user,
      }));
    }
  }, []);

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
