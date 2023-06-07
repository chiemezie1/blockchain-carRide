import React, { useState } from "react";
import profileImage from "../../assets/profile.svg";
import driver from "../../assets/_driver.svg";
import home from "../../assets/home.svg";
import activity from "../../assets/activity.svg";

const DriveDashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState("profile");

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <div className="flex items-center justify-center">
      {/* Navigation Sidebar */}
      <div
        className="w-1/4 h-screen flex flex-col items-center justify-evenly p-8"
        style={{
          background: "linear-gradient(to bottom, #2a7a3e, #2bb54e, #0ad13c)"
        }}
      >
        <h2 className="text-5xl font-bold mb-4">Navigation</h2>
        <div className="m-8 p-8 bg-gray-400 rounded-lg w-2/3 h-auto flex justify-center items-center">
          <img src={profileImage} alt="Profile" className="w-20 h-20 " />
        </div>
        <ul className="w-full text-center">
          <div
            className={`w-full h-25 flex items-center justify-center bg-gray-800 text-white rounded-lg my-4 ${
              activeNavItem === "profile" ? "bg-green-600" : ""
            }`}
            onClick={() => handleNavItemClick("profile")}
          >
            <img
              src={home}
              alt="Profile"
              className="w-10 h-10 m-2 hidden sm:block"
            />
            <li className="cursor-pointer text-3xl font-bold m-6">Profile</li>
          </div>

          <div
            className={`w-full h-25 flex items-center justify-center bg-gray-800 text-white rounded-lg my-4 ${
              activeNavItem === "request" ? "bg-green-600" : ""
            }`}
            onClick={() => handleNavItemClick("request")}
          >
            <img
              src={activity}
              alt="Profile"
              className="w-10 h-10 m-2 hidden sm:block"
            />
            <li className="cursor-pointer text-3xl font-bold m-6">
              Ride Requests
            </li>
          </div>

          <div
            className={`w-full h-25 flex items-center justify-center bg-gray-800 text-white rounded-lg my-4 ${
              activeNavItem === "Progress" ? "bg-green-600" : ""
            }`}
            onClick={() => handleNavItemClick("Progress")}
          >
            <img
              src={driver}
              alt="Profile"
              className="w-10 h-10 m-2 hidden sm:block"
            />
            <li className="cursor-pointer text-3xl font-bold m-6">Progress</li>
          </div>
        </ul>
      </div>

      {/* Content Display */}
      <div className="w-3/4 p-4">
        {activeNavItem === "profile" && <h1>View/Edit Your Profile</h1>}
        {activeNavItem === "request" && <h1>Request a Ride</h1>}
        {activeNavItem === "Progress" && <h1>Progress</h1>}
      </div>
    </div>
  );
};

export default DriveDashboard;
