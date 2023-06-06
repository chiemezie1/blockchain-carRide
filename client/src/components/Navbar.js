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
<<<<<<< HEAD
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
=======
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function(accounts) {
      window.location.replace(location.pathname);
    });
  }, []); // add empty dependency array
>>>>>>> b78d12c7ae6b93e0c5152b6b8696d26161c2ffad

  return (
    <div className="">
      <nav className="w-screen mx-2 mb-2 bg-gray-900 sticky top-0 rounded-b-5">
        <div className="flex items-center justify-between py-3 bg-transparent text-white pr-5">
          <div className="ml-5">
            <Link to="/">
              <img
                src={fullLogo}
                alt=""
                width={120}
                height={120}
                className="inline-block -mt-2"
              />
            </Link>
          </div>
          <div className="w-2/6 hidden lg:block">
            <ul className="flex justify-between font-bold mr-10 text-lg">
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
          </div>
          <div className="lg:hidden">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="lg:hidden bg-gray-900">
          <ul className="px-4 py-2">
            <li className={`text-white py-2 ${location.pathname === "/" && "border-b-2"}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`text-white py-2 ${location.pathname === "/sellNFT" && "border-b-2"}`}>
              <Link to="/About">About</Link>
            </li>
            <li className={`text-white py-2 ${location.pathname === "/profile" && "border-b-2"}`}>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button
                className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm w-full"
                onClick={connectWebsite}
              >
                {connected ? "Connected" : "Connect Wallet"}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="text-green-700 font-bold text-right mr-10 text-sm">
        {currAddress !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
  }  

export default Navbar;
