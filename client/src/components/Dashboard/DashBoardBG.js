import React from "react";

const DashBoardBG = () => {
  return (
    <div
      className="h-screen w-screen"
      style={{ background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)" }}
    >
      <div className="container mx-auto py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Driver Profile
          </h2>
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800">John Doe</h3>
            <p className="text-xl font-semibold text-gray-600">
              Car Ride Driver
            </p>
            <p className="text-xl font-semibold text-gray-600">
              BlockRide Service
            </p>
          </div>
          <p className="text-gray-700">
            As a professional car ride driver with years of experience, I am
            dedicated to providing safe and reliable transportation services to
            my passengers. I take pride in delivering exceptional customer
            service and ensuring a comfortable journey for every ride. With
            BlockRide, I embrace the decentralized ride-sharing platform, which
            prioritizes transparency, security, and efficiency in the
            transportation industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardBG;
