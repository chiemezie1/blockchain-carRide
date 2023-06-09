import React, { useState, useEffect } from "react";
import DriverDashboard from "./Dashboard/DriverDashboard.js"
import UserDashboard from "./Dashboard/UserDashboard.js"

const { ethers } = require("ethers");

function Profile() {
  return (
    <div>
      <UserDashboard  />
      {/* <DriverDashboard  /> */}
    </div>
  );
}

export default Profile;
