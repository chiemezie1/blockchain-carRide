import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CarRide from "../contract/CarRide.json";

function ViewRideStatus() {
  const [rideId, setRideId] = useState("");
  const [rideInfo, setRideInfo] = useState(null);
  const [driverInfo, setDriverInfo] = useState(null);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadProvider() {
      if (window.ethereum) {
        // load provider (example: using metamask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        const contract = new ethers.Contract(
          CarRide.address,
          CarRide.abi,
          signer
        );
        setContract(contract);
      } else {
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    loadProvider();
  }, []);

  const handleRideIdChange = (e) => {
    setRideId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ride = await contract.viewRideStatus(rideId);
      setRideInfo({
        pickup: ride[0],
        dropoff: ride[1],
        amount: ride[2].toString(),
        complete: ride[3],
        confirmedByDriver: ride[4],
        driverAddr: ride[5],
      });

      const driver = await contract.getDriverInfo(ride[5]);
      setDriverInfo({
        name: driver[0],
        contact: driver[1],
        email: driver[2],
        carNumber: driver[3],
        seats: driver[4].toNumber(),
        rating: driver[5].toNumber(),
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col m-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="rideId">
          <p>Check Ride progress</p>
        </label>
        <input
          className="p-2 border-2 border-black rounded-lg"
          type="number"
          id="rideId"
          value={rideId}
          onChange={handleRideIdChange}
          required
        />
        <button
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      {success && rideInfo && driverInfo && (
        <div className="flex text-2xl text-green-900 m-4">
          <div className=" m-4">
            <h2>Ride Information</h2>
            <p>
              {rideInfo.pickup} To {rideInfo.dropoff}
            </p>
            <p>
              Amount:{" "}
              {ethers.utils.formatUnits(rideInfo.amount.toString(), "ether")}{" "}
              ETH
            </p>
            <p>
              Ride Confirmed By Driver: {rideInfo.confirmedByDriver.toString()}
            </p>
            <p>Complete: {rideInfo.complete.toString()}</p>
          </div>

          {rideInfo.confirmedByDriver.toString() == "true" ? (
            <div className=" m-4">
              <h2 className="text-4xl">Driver Information</h2>
              <p>Name: {driverInfo.name}</p>
              <p>Driver Address: {rideInfo.driverAddr}</p>
              <p>Driver Car Number: {driverInfo.carNumber}</p>
              <p>Driver Seats: {driverInfo.seats}</p>
              <p>Driver Rating: {driverInfo.rating}</p>
              <p className="flex text-2xl text-red-900 ">
                You can cancel ride if you aren't confortable with the driver
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
export default ViewRideStatus;
