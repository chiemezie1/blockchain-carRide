import React, { useState, useEffect } from "react";
import DriverDashboardPage from "./Dashboard/DriverDashboardPage.js"
import UserDashboardPage from "./Dashboard/UserDashboardPage.js"

const { ethers } = require("ethers");

function Profile() {
  return (
    <div>
      <UserDashboardPage />
      {/* <DriverDashboardPage  /> */}
    </div>
  );
}

export default Profile;
