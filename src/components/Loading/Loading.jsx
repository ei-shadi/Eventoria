import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
      <div className="w-11/12 mx-auto  flex justify-center h-[90vh]">
           <div className="loader">
      <div className="loading-text text-green-500">
        Loading<span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
      {/* <div className="loading-bar-background">
        <div className="loading-bar">
          <div className="white-bars-container">
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
          </div>
        </div>
      </div> */}
    </div>
   </div>
  );
};

export default Loading;
