import React, { useState, useEffect } from "react";
import CarRide from "../../contract/CarRide.json";
const { ethers } = require("ethers");

const DashBoardRider = (propos) => {
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
      <div className="flex flex-wrap justify-center">
        <div className="py-12">
          <div className="mr-20 ml-10 p-10 bg-gray-500 rounded-lg text-xl text-gray-900 text-left">
            As a professional BlockRide driver with years of experience
            <br />
            Be dedicated to providing safe and reliable transportation services
            to your passengers.
            <br />
            Take pride in delivering exceptional customer service and ensuring a
            comfortable journey for every ride.
            <br /> <br />
            With BlockRide, we embrace the decentralized ride-sharing platform,
            which prioritizes transparency, security, and efficiency in the
            transportation industry.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardRider;
