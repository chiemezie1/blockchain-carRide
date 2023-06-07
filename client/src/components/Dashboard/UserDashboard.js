import React, { useState } from "react";
import profileImage from "../../assets/profile.svg";
import cancel from "../../assets/_cancel.svg";
import pay from "../../assets/pay.svg";
import home from "../../assets/home.svg";
import activity from "../../assets/activity.svg";
import check from "../../assets/check.svg";

const UserDashboard = () => {
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
              Request Ride
            </li>
          </div>

          <div
            className={`w-full h-25 flex items-center justify-center bg-gray-800 text-white rounded-lg my-4 ${
              activeNavItem === "cancel" ? "bg-green-600" : ""
            }`}
            onClick={() => handleNavItemClick("cancel")}
          >
            <img
              src={cancel}
              alt="Profile"
              className="w-10 h-10 m-2 hidden sm:block"
            />
            <li className="cursor-pointer text-3xl font-bold m-6">
              Cancel Ride
            </li>
          </div>

          <div
            className={`w-full h-25 flex items-center justify-center bg-gray-800 text-white rounded-lg my-4 ${
              activeNavItem === "pay" ? "bg-green-600" : ""
            }`}
            onClick={() => handleNavItemClick("pay")}
          >
            <img
              src={pay}
              alt="Profile"
              className="w-10 h-10 m-2 hidden sm:block"
            />
            <li className="cursor-pointer text-3xl font-bold m-6">
              Pay for Ride
            </li>
          </div>

          <div
            className={`w-full h-25 flex items-center justify-center bg-gray-800 text-white rounded-lg my-4 ${
              activeNavItem === "rate" ? "bg-green-600" : ""
            }`}
            onClick={() => handleNavItemClick("rate")}
          >
            <img
              src={check}
              alt="Profile"
              className="w-10 h-10 m-2 hidden sm:block"
            />
            <li className="cursor-pointer text-3xl font-bold m-6">
              Rate Driver
            </li>
          </div>
        </ul>
      </div>

      {/* Content Display */}
      <div className="w-3/4 p-4">
        {activeNavItem === "profile" && <h1>View/Edit Your Profile</h1>}
        {activeNavItem === "request" && <h1>Request a Ride</h1>}
        {activeNavItem === "cancel" && <h1>Cancel Your Ride</h1>}
        {activeNavItem === "pay" && <h1>Pay for Your Ride</h1>}
        {activeNavItem === "rate" && <h1>Rate Your Driver</h1>}
      </div>
    </div>
  );
};

export default UserDashboard;
