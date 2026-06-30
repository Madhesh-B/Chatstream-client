import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.loading);
  return (
    <div
      className={`bg-black w-100 h-100 ${isLoading ? "d-flex" : "d-none"} justify-content-center align-items-center position-absolute top-0 start-0 z-3`}
    >
      <div className="spinner-border text-primary"></div>
    </div>
  );
};

export default Loading;
