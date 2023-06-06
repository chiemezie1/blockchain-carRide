import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-20 mt-20">
      <h1 className="text-9xl font-extrabold tracking-tight text-center font-serif leading-none text-white uppercase">
        Block<span className="text-red-800">Ride</span>
      </h1>
      <div className="bg-gray-100 bg-opacity-40 rounded-md">
        <p className="font-bold font-serif text-2xl text-center p-4 mb-4">
          <i>Less Cost..... More Trust</i>
          <br />
          Transparency of transactions, possible to trace back to the
          information if something goes wrong.
          <br />
          Safety, all the data is cryptographically protected. No fraudulent
          data.
          <br />
          Direct payment to drivers using smart contracts.
        </p>
      </div>
      <div className="flex justify-center mt-10">
        <Link
          to="/profile"
          className="px-8 py-4 ml-4 font-mono text-3xl items-center rounded-full inline text-white bg-green-800 hover:bg-green-600 transition-all duration-300"
        >
          Take a Ride
        </Link>

        <Link
          to="/register"
          className="px-8 py-4 ml-4 font-mono text-3xl items-center rounded-full text-red-800 bg-white hover:bg-gray-300 transition-all duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Banner;
