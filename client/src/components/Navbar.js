import fullLogo from "../full_logo.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function Navbar() {
  const [connected, setConnected] = useState(false);
  const [currAddress, setCurrAddress] = useState("0x");
  const location = useLocation();

  async function getAddress() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      setCurrAddress(addr);
    } catch (error) {
      console.log("Failed to get address:", error);
    }
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    if (ethereumButton) {
      ethereumButton.textContent = "Connected";
      ethereumButton.classList.remove("hover:bg-blue-70");
      ethereumButton.classList.remove("bg-blue-500");
      ethereumButton.classList.add("hover:bg-green-70");
      ethereumButton.classList.add("bg-green-500");
    }
  }

  async function connectWebsite() {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x5') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        });
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      updateButton();
      console.log("here");
      getAddress(); // Call the getAddress function here
    } catch (error) {
      console.log("Failed to connect:", error);
    }
  }

  useEffect(() => {
    function handleAccountsChanged(accounts) {
      window.location.replace(location.pathname);
    }

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [location]);

  return (
    <div className="">
      <nav className="w-screen mx-2 mb-2 bg-gray-900 sticky top-0 rounded-b-5">
        <ul className="flex items-end justify-between py-3 bg-transparent text-white pr-5">
          <li className="flex items-end ml-5 pb-2">
            <Link to="/">
              <img
                src={fullLogo}
                alt=""
                width={120}
                height={120}
                className="inline-block -mt-2"
              />
            </Link>
          </li>
          <li className="w-2/6">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
              <li className={`hover:border-b-2 hover:pb-0 p-2 ${location.pathname === "/" && "border-b-2"}`}>
                <Link to="/">Home</Link>
              </li>
              <li className={`hover:border-b-2 hover:pb-0 p-2 ${location.pathname === "/sellNFT" && "border-b-2"}`}>
                <Link to="/About">About</Link>
              </li>
              <li className={`hover:border-b-2 hover:pb-0 p-2 ${location.pathname === "/profile" && "border-b-2"}`}>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button
                  className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWebsite}
                >
                  {connected ? "Connected" : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="text-green-700 text-bold text-right mr-10 text-sm">
        {currAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
}

export default Navbar;
