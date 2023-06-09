import React from "react";

const DashBoardBG = (propos) => {
  return (
    <div
      className="h-screen w-screen"
      style={{ background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)" }}
    >
      <div className="mx-auto py-12 flex justify-center">
        <div
          className="w-3/5 bg-white rounded-lg shadow-lg p-8 text-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Driver Profile
          </h2>
          <div className="mb-8">
            <h3 className="p-4 text-3xl font-bold text-gray-800">Welcome </h3>
            <p className="text-xl font-semibold text-gray-600">
              Car Ride Driver
            </p>
            <div className="flex justify-center">
              <p className="p-2 text-xl text font-semibold text-gray-600">
                Phone:
              </p>
              <p className="p-2 text-xl font-semibold text-gray-600">Email: </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-end">
        <div className="py-12 mr-20 ml-0 flex">
          <div className="p-10 bg-blue-400 rounded-lg ">
            <div className="text-xl p-4 font-bold text-xl text-gray-900 ">
              Track Your ride
            </div>
          </div>
        </div>
        <div className="py-12">
          <div className="mr-20 ml-10 p-10 bg-gray-500 rounded-lg text-xl text-gray-900 text-left">
            As a professional car ride driver with years of experience
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

export default DashBoardBG;
