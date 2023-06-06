import React from "react";
import fullLogo from "../full_logo.png";

const Footer = () => {
  return (
    <div className="bg-gray-800 h-48 text-white font-bold" > 
    <div className=" flex justify-between items-center">
    <img src={fullLogo} alt="" width={120} height={120} className="m-2" />


      <footer className="text-center">
          <ul className="font-sans mx-auto flex flex-wrap justify-center">
            <li className="m-4">
              <a href="/" className="text-white">
                Home
              </a>
            </li>
            <li className="m-4">
              <a href="/request" className="text-white">
                Request
              </a>
            </li>
            <li className="m-4">
              <a href="/about" className="text-white">
                About Us
              </a>
            </li>
            <li className="m-4">
              <a href="/drivers" className="text-white">
                Drivers
              </a>
            </li>
            <li className="m-4">
              <a href="/riders" className="text-white">
                Riders
              </a>
            </li>
            <li className="m-4">
              <a href="/contact" className="text-white">
                Contact
              </a>
            </li>
          </ul>
      </footer>

      </div>
      <div className="font-sans mx-auto py-4 text-center">
        &copy; Block-Ride by CHIEMEZIE AGBO
      </div>
 
    </div>
  );
};

export default Footer;
