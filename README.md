# CarRide Contract
This is a smart contract for a car ride platform, using the Solidity programming language and built for the Goerli test network using Hardhat.
 
  Deploy
    deployed on goerli
    contract address = 0xcba43B2959d41Aaa0f62675789437b3C12de57Fb
    
# Functions
  registerRider
    The registerRider function allows a user to register as a rider by providing their name, contact, and email.

    registerDriver
    The registerDriver function allows a user to register as a driver by providing their name, contact, email, car     number and number of seats.

  requestRide
    The requestRide function allows a registered rider to request a ride by providing the pickup and dropoff location, and the amount they are willing to pay.
    
  acceptRide
    The acceptRide function allows a registered driver to accept a ride request.

  confirmRide
    The confirmRide function allows a rider or a driver to confirm a ride.

  getRideInfo
    The getRideInfo function allows a user to view the details of a specific ride.
  
# Events
  RiderRegister
    This event is emitted when a user successfully registers as a rider.
  
  DriverRegister
    This event is emitted when a user successfully registers as a driver.

  RequestDriverEvent
    This event is emitted when a rider requests a ride.

# Requirements
    Node.js v16 or higher
    Hardhat v2.0 or higher
    Goerli test network

# Installation
  Clone this repository to your local machine.
  Open a terminal and navigate to the project's root directory.
  Install the project's dependencies by running npm install.
 
  
# Usage
 Compile the contract by running npx hardhat compile.
 Deploy to the Goerli test network by running npx hardhat run scripts/deploy.js
 
  Once the contract is deployed, you can interact with it using the following functions:
  registerRider(string memory _name, string memory _contact, string memory _email) : Registers a new rider with the provided name, contact, and email.
  registerDriver(string memory _name, string memory _contact, string memory _email, string memory _carNumber, uint _seats) : Registers a new driver with the provided name, contact, email, car number and number of seats
  requestRide(string memory _pickup, string memory _dropoff, uint _amount): Requests a new ride with the provided pickup and dropoff location and amount. Returns the ride ID.
  acceptRide(uint _rideId): Accepts a ride with the provided ride ID.
  confirmRide(uint _rideId) : Confirm a ride with the provided ride ID
  getRideInfo(uint _rideId) : Returns the information of a ride with the provided ride ID, including rider address, pickup and dropoff location, amount, and whether it is complete and confirmed by rider and driver
  Events
  RiderRegister(address indexed _riderAddr): Triggered when a new rider is registered.
  DriverRegister(address indexed _driverAddr): Triggered when a new driver is registered.
  RequestDriverEvent(address indexed _riderAddr,string pickup, string dropoff): Triggered when a new ride is requested.

# Contact
If you have any questions or issues regarding this contract, please don't hesitate to contact me.

# Disclaimer
This contract is for educational and demonstration purposes only. It has not been audited and should not be used in a production environment. Always thoroughly review and test any smart contract before deploying it.



```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node

```
