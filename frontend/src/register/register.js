import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { signupUser, setAuthorization } from "../services/axios";
import { AuthContext } from "../App";

export const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isMatchPassword, setIsMatchPassword] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [checkMail, setCheckMail] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSignUp = () => {
    if (!canSubmit()) {
      return;
    }

    setLoading(true);
    signupUser({
      username,
      email,
      password,
    })
      .then((res) => {
        setAuthorization(res.data?.token);
        setAuthState({
          isAuthenticated: true,
          user: res.data?.user,
        });
        navigate("/predict");

        localStorage.setItem("store", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const canSubmit = () => {
    return !(
      !username ||
      !ValidateEmail(email) ||
      !password ||
      !rePassword ||
      !isMatchPassword ||
      isLoading
    );
  };

  const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const changeEmail = (mail) => {
    setEmail(mail);
    setCheckMail(ValidateEmail(email) ? 2 : 1);
  };

  const changePassword = (pass) => {
    setPassword(pass);
    if (!isCheck) return;
    if (rePassword !== pass) {
      setIsMatchPassword(false);
    } else setIsMatchPassword(true);
  };

  const changeRePassword = (pass) => {
    setRePassword(pass);
    if (password !== pass) {
      setIsMatchPassword(false);
    } else setIsMatchPassword(true);
    setIsCheck(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <div className="text-3xl font-semibold text-center mb-4 text-green-500">
          ĐĂNG KÝ
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Tên người dùng
            </label>
            <input
              id="username"
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                checkMail === 1 && "border-red-500"
              }`}
              value={email}
              onChange={(event) => changeEmail(event.target.value)}
            />
            {checkMail === 1 && (
              <div className="text-red-500">
                <span>Email chưa hợp lệ</span>
              </div>
            )}
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
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(event) => changePassword(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-600"
            >
              Mật khẩu xác nhận
            </label>
            <input
              id="rePassword"
              type="password"
              className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                !isMatchPassword && "border-red-500"
              }`}
              value={rePassword}
              onChange={(event) => changeRePassword(event.target.value)}
            />
            {!isMatchPassword && (
              <div className="text-red-500">
                <span>Mật khẩu chưa trùng khớp</span>
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              className={`w-full px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none ${
                !canSubmit() && "opacity-50 cursor-not-allowed"
              }`}
              onClick={onSignUp}
              disabled={!canSubmit()}
            >
              Đăng ký
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p>
            Đã có tài khoản?
            <Link to="/login" className="mx-3 text-green-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
