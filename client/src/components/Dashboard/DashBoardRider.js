import React, { useState, useEffect } from "react";
import ViewRideStatus from "../ViewRideStatus";
import CarRide from "../../contract/CarRide.json";
const { ethers } = require("ethers");

const DashBoardRider = (propos) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    contact: "",
    email: "",
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
        const rider = await contract.getRiderInfo(address);
        setUserInfo({
          name: rider[0],
          contact: rider[1],
          email: rider[2],
        });
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    }
    getUserInfo();
  }, [provider, signer, address]);

  return (
    <div>
      <div className="mx-auto py-12 flex justify-center">
        <div
          className="w-3/5 bg-white rounded-lg shadow-lg p-8 text-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Riders Profile
          </h2>
          <div className="mb-8">
            <h3 className="p-4 text-3xl font-bold text-gray-800">
              Welcome {userInfo.name}{" "}
            </h3>
            <p className="text-xl font-semibold text-gray-600">
              BlockRide Rider
            </p>
            <div className="flex flex-wrap justify-center">
              <p className="p-2 text-xl text font-semibold text-gray-600">
                Phone:{userInfo.contact}
              </p>
              <p className="p-2 text-xl font-semibold text-gray-600">
                Email: {userInfo.email}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start">
        <div className="py-12 ml-20 flex">
          <div className="p-10 bg-blue-400 rounded-lg ">
            <div className="text-xl p-4 font-bold text-gray-900 ">
              Track Your ride {<ViewRideStatus />}
            </div>
          </div>
        </div>
        <div className="py-12">
          <div className="mr-20 ml-10 p-10 bg-gray-500 rounded-lg text-xl text-gray-900 text-left">
            As a rider on BlockRide, you can expect the following:
            <br />
            Experience safe and reliable transportation services provided by
            professional car ride drivers with years of expertise.
            <br />
            Enjoy exceptional customer service, ensuring a comfortable journey
            for every ride you take.
            <br />
            BlockRide embraces a decentralized ride-sharing platform that
            prioritizes transparency, security, and efficiency in the
            transportation industry.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardRider;
