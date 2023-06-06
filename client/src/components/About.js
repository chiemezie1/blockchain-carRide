import React from "react";
import Navbar from "./Navbar";
import CarImage from "../carImage.jpg";
import Footer from "./footer";

function About() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="py-16">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="rounded-lg md:w-1/2 lg:w-5/12">
              <img
                src={CarImage}
                alt="carImage"
                className="w-full"
              />
            </div>
            <div className="md:w-1/2 ">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                Welcome To Block<span className="text-red-900">Ride</span>
              </h2>
              <div className="p-4 flex flex-wrap">
                <p className="text-lg md:text-2xl font-extrabold leading-normal text-gray-900 my-8">
                  We have a team of transportation experts and blockchain
                  enthusiasts who came together to revolutionize the way people
                  move. Our service utilizes smart contracts on the blockchain
                  to provide a secure, transparent, and decentralized platform
                  for ride-sharing. By using cryptocurrency, we offer a seamless
                  and fast payment process without the need for intermediaries.
                </p>
                <p className="text-lg md:text-2xl font-extrabold leading-normal text-gray-900 my-8">
                  We believe in the power of the blockchain to bring trust and
                  efficiency to the transportation industry. Our platform is
                  designed to empower drivers and riders with more control over
                  their ride-sharing experience.
                </p>
                <p className="text-lg md:text-2xl font-extrabold leading-normal text-yellow-500 bg-gray-900 border-red-600 rounded-lg my-8 p-8">
                  Our mission is to provide a safe, reliable, and affordable
                  transportation option for everyone. We are constantly working
                  to improve our service and integrate new technologies to
                  enhance your experience.
                </p>
                <p className="text-lg md:text-2xl font-extrabold leading-normal text-white my-8">
                  Thank you for choosing BlockRide. We look forward to serving
                  you and being a part of your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
