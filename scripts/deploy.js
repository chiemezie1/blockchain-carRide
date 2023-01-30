const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const carRide = await hre.ethers.getContractFactory("CarRide");
  const CarRide = await carRide.deploy();

  await CarRide.deployed();
  console.log("CarRide deployed to:", CarRide.address)

  const data = {
    address: CarRide.address,
    abi: JSON.parse(CarRide.interface.format('json'))
  }

  //This writes the ABI and address to the CarRide.json
  fs.writeFileSync('./client/src/contract/CarRide.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
