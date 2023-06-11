import React, { useState, useEffect } from "react";
import CarRide from "../contract/CarRide.json";
const { ethers } = require("ethers");

const DriversDetails = () => {
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
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    }
      getUserInfo();

  }, [ provider, signer, address]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center m-20">
      
        <div className=" flex flex-row items-center justify-between bg-gray-200 shadow-lg rounded-lg p-5">
          <div className="bg-blue-500 rounded-lg p-6 m-2">
            <h2 className="text-xl font-bold text-white">Current Rating</h2>
            <p className="text-2xl text-white">{userInfo.rating}</p>
          </div>
          <div className="bg-green-500 rounded-lg p-6 m-2">
            <h2 className="text-xl font-bold text-white">Token Balance</h2>
            <p className="text-2xl text-white">{userInfo.seatNumber}</p>
          </div>
          <div className="bg-purple-500 rounded-lg p-6 m-2">
            <h2 className="text-xl font-bold text-white"> User Address</h2>
            <p className="text-2xl text-white">{address}</p>
          </div>
          <div className="bg-yellow-500 rounded-lg p-6 m-2">
            <h2 className="text-xl font-bold text-white">Seat Number</h2>
            <p className="text-2xl text-white">{userInfo.seats}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center m-10">
        <h1 className="text-4xl font-bold m-8">Your Rating</h1>

        <div className="border-2 border-green-900">
          <div className="flex items-center">
            <ul className="flex flex-row items-baseline">
              <li
                className={`border-2 border-green-900 m-2 h-4 w-5 ${
                  userInfo.rating >= 1 ? "bg-green-900" : ""
                }`}
              ></li>
              <li
                className={`border-2 border-green-900 m-2 h-8 w-5 ${
                  userInfo.rating >= 2 ? "bg-green-900" : ""
                }`}
              ></li>
              <li
                className={`border-2 border-green-900 m-2 h-12 w-5 ${
                  userInfo.rating >= 3 ? "bg-green-900" : ""
                }`}
              ></li>
              <li
                className={`border-2 border-green-900 m-2 h-16 w-5 ${
                  userInfo.rating >= 4 ? "bg-green-900" : ""
                }`}
              ></li>
              <li
                className={`border-2 border-green-900 m-2 h-20 w-5 ${
                  userInfo.rating >= 5 ? "bg-green-900" : ""
                }`}
              ></li>
            </ul>
          </div>
        </div>
        <p className="text-lg mt-4">
          Thank you for providing excellent service!
        </p>
      </div>
    </div>
  );
};

export default DriversDetails;
