import React from "react";
import "./home.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import Typed from "react-typed";
import { Link, useParams } from "react-router-dom";

export const Home = (props) => {
  const { authState } = useContext(AuthContext);
  const [select, setSelect] = useState(1);
  useEffect(() => {
    setSelect(authState.select);
  }, [authState]);

  return (
    <div className="text-white mt-10">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">
          TRÍCH XUẤT NỘI DUNG BƯU THIẾP
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          THEO DỮ LIỆU.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            LINH HOẠT CHO
          </p>
          <Typed
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={["BƯU THIẾP", "NỘI DUNG", "VĂN BẢN"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          TRÍCH XUẤT DỮ LIỆU BƯU THIẾP NHANH, GỌN, TIỆN LỢI.
        </p>
        <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
          <Link to={authState?.isAuthenticated ? "/predict" : "/login"}>
            BẮT ĐẦU NGAY
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
