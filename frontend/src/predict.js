import React, { useState } from "react";

const Predict = () => {
  const [inputData, setInputData] = useState("");

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handlePredictClick = () => {
    // Gọi hàm predict ở đây (cần triển khai hàm predict trước đó)
    // Ví dụ: predict(inputData);
    console.log(`Đã dự đoán: ${inputData}`);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Dự Đoán</h2>
      <input
        type="text"
        placeholder="Nhập dữ liệu đầu vào"
        value={inputData}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handlePredictClick}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Dự đoán
      </button>
    </div>
  );
};

export default Predict;
