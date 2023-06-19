import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CarRide from "../contract/CarRide.json";
import DriverRegistration from "./DriverRegistration";
import UserRegistration from "./UserRegistration";
import Navbar from "./Navbar";

const Register = () => {
  const [userType, setUserType] = useState("empty");
  const [role, setRole] = useState("");
  const [values, setValues] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    async function loadProvider() {
      // load provider (example: using metamask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
    }
    if (window.ethereum) {
      loadProvider();
    } else {
      console.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }, []);

  const handleInputChange = (e) => {
    setRole(e.target.value);
  };

  const handleGetStarted = () => {
    if (role) {
      setUserType(role);
    }
  };

  const handleSubmit = async (data) => {
    setValues(data);
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(CarRide.address, CarRide.abi, signer);
    try {
      if (userType === "rider") {
        console.log(data);
        const tx = await contract.registerRider(
          data.name,
          data.contact,
          data.email
        );
        await tx.wait();
        setIsRegistered(true);
      } else if (userType === "driver") {
        const tx = await contract.registerDriver(
          data.name,
          data.contact,
          data.email,
          data.carNumber,
          data.seats
        );
        await tx.wait();
        setIsRegistered(true);
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div  style={{
      background: "linear-gradient(to right, #ff4c4c, #7b113a)",
    }}>
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center"
       
      >
        <div className="max-w-xl w-full mt-10 p-6">
          {userType === "empty" ? (
            <div>
              <label
                htmlFor="role"
                className="block text-gray-100 text-2xl font-bold mb-2"
              >
                Select a role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Select a role --</option>
                <option value="rider">Rider</option>
                <option value="driver">Driver</option>
              </select>
              <button
                type="button"
                onClick={handleGetStarted}
                className="my-4 flex justify-end bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-lg"
                disabled={!role}
              >
                Get Started
              </button>
            </div>
          ) : null}

          {userType === "rider" && !isRegistered ? (
            <UserRegistration onSubmit={handleSubmit} />
          ) : userType === "driver" && !isRegistered ? (
            <DriverRegistration onSubmit={handleSubmit} />
          ) : (isRegistered === true ? (
            <div>
            <p>Registration successful!</p>
            <a href="/" className="text-white">Home</a>
            </div>
            ):(null)
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
