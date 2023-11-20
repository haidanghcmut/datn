import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../App";
import { signinUser, setAuthorization } from "../services/axios.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    if (!email || !password) {
      return;
    }
    setLoading(true);
    signinUser({
      email,
      password,
    })
      .then((res) => {
        setAuthorization(res.data?.token);
        setAuthState({
          isAuthenticated: true,
          user: res.data?.user,
        });
        localStorage.setItem("store", JSON.stringify(res.data));

        navigate("/predict");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e?.message);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <div className="text-3xl font-semibold text-center mb-4 text-green-500">
          ĐĂNG NHẬP
        </div>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <button
              type="button"
              className={`w-full px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none ${
                isLoading && "opacity-50 cursor-not-allowed"
              }`}
              onClick={onLogin}
              disabled={isLoading}
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <div className="text-center">
          <p>
            Tạo tài khoản mới?
            <Link to="/register" className="mx-3 text-green-500">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
