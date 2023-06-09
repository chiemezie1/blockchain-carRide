import React, { useState, useEffect } from "react";
import CarRide from "../contract/CarRide.json";
import Navbar from "./Navbar";
import Footer from "./footer";
import RequestRide from "./RequestRide";
import CancelRide from "./CancelRide";
import PayDriver from "./PayDriver";
import RequestTile from "./RequestTile";
import UpdateDriverRating from "./UpdateDriverRating";
import ViewRideStatus from "./ViewRideStatus";
import DriverDashboard from "./Dashboard/DriverDashboard.js"
import UserDashboard from "./Dashboard/UserDashboard.js"

const { ethers } = require("ethers");

function Profile() {
  const [userType, setUserType] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    contact: "",
    email: "",
    carNumber: "",
    seats: "",
    rating: "",
    status: "",
  });
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    async function loadProvider() {
      if (window.ethereum) {
        // load provider (example: using metamask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        const addr = await signer.getAddress();
        setAddress(addr.toString());
      } else {
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    loadProvider();
  }, []);

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  useEffect(() => {
    async function getUserInfo() {
      if (!provider || !signer) {
        alert("Please connect to Ethereum network");
        return;
      }
      const contract = new ethers.Contract(
        CarRide.address,
        CarRide.abi,
        signer
      );
      try {
        if (userType === "rider") {
          const rider = await contract.getRiderInfo(address);
          setUserInfo({
            name: rider[0],
            contact: rider[1],
            email: rider[2],
          });
        } else if (userType === "driver") {
          const driver = await contract.getDriverInfo(address);
          setUserInfo({
            name: driver[0],
            contact: driver[1],
            email: driver[2],
            carNumber: driver[3],
            seats: driver[4].toNumber(),
            rating: driver[5].toNumber(),
            status: driver[6],
          });
        }
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    }
    if (userType !== "" && address) {
      getUserInfo();
    }
  }, [userType, provider, signer, address]);

  return (
    <div>
      <UserDashboard userInfo={userInfo} />
      {/* <DriverDashboard userInfo={userInfo} /> */}
    </div>
  );
}

export default Profile;
