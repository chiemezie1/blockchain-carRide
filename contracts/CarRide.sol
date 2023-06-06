// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract CarRide {
    // Enums and structs
    enum DriverStatus { FREE, BUSY }
    struct Rider {
        string name;
        string contact;
        string email;
    }

    struct Driver {
        string name;
        string contact;
        string email;
        string  carNumber;
        uint seats;
        uint rating;
        uint numberOfRides;
        DriverStatus status;
    }

    struct Ride {
    uint id;
    address payable riderAddr;
    address payable driverAddr;
    string pickup;
    string dropoff;
    uint amount;
    bool complete;
    bool confirmedByDriver;
}


    // Mappings
    mapping(address => Rider) public riders;
    mapping(address => Driver) public drivers;
    Ride[] public rides;

    // Events
    event RiderRegister(address indexed _riderAddr);
    event DriverRegister(address indexed _driverAddr);
    event RequestDriverEvent(uint newRideId);

    // Counter for ride id
    uint public rideIdCounter;

    // Function to register a rider
    function registerRider(string memory _name, string memory _contact, string memory _email) public {
        require(bytes(riders[msg.sender].name).length == 0, "Rider already registered");
        riders[msg.sender] = Rider(_name, _contact, _email);
        emit RiderRegister(msg.sender);
    }

    // Function to register a driver
    function registerDriver(string memory _name, string memory _contact, string memory _email, string memory _carNumber, uint _seats) public {
        require(bytes(drivers[msg.sender].name).length == 0, "Driver already registered");
        uint numberOfRides = 0;
        drivers[msg.sender] = Driver(_name, _contact, _email, _carNumber, _seats, 0, numberOfRides, DriverStatus.FREE);
        emit DriverRegister(msg.sender);
    }

    // Function to request a ride
    function requestRide(string memory _pickup, string memory _dropoff, uint _amount) public returns (uint)  {
       require(bytes(riders[msg.sender].name).length != 0, "Rider not registered. Please register as a rider first.");
        address payable riderAddr = payable(msg.sender);
        uint newRideId = rideIdCounter++;
        rides.push(Ride(newRideId, riderAddr, payable(address(0)), _pickup, _dropoff, _amount, false,false));
        emit RequestDriverEvent(newRideId);
        return newRideId;
    }

    // Function to accept a ride
    function acceptRide(uint _rideId) public {
        address payable driverAddr = payable(msg.sender);
        require(bytes(drivers[driverAddr].name).length != 0, "Driver not registered. Please register as a driver first.");
        require(rides[_rideId].driverAddr == address(0), "This ride is already accepted by another driver");
        require(drivers[driverAddr].status == DriverStatus.FREE, "Driver is not available");
        rides[_rideId].driverAddr = payable(msg.sender);
        drivers[driverAddr].status = DriverStatus.BUSY;
        rides[_rideId].confirmedByDriver = true;
    }
    
 

    function getRideInfo(uint _rideId) public view returns (address, string memory, string memory, uint,  bool, bool) {
        require(_rideId < rideIdCounter && _rideId > 0, "Ride not found");
        return (rides[_rideId].riderAddr, rides[_rideId].pickup, rides[_rideId].dropoff, rides[_rideId].amount, rides[_rideId].complete, rides[_rideId].confirmedByDriver);
    }

    // Function to get information about a rider
    function getRiderInfo(address _riderAddr) public view returns (string memory, string memory, string memory) {
        return (riders[_riderAddr].name, riders[_riderAddr].contact, riders[_riderAddr].email);
    }

    // Function to get information about a driver
    function getDriverInfo(address _driverAddr) public view returns (string memory, string memory, string memory, string memory, uint, uint, DriverStatus) {
        return (drivers[_driverAddr].name, drivers[_driverAddr].contact, drivers[_driverAddr].email, drivers[_driverAddr].carNumber, drivers[_driverAddr].seats, drivers[_driverAddr].rating, drivers[_driverAddr].status);
    }

    // Function to cancel a ride
    function cancelRide(uint _rideId) public {
        address payable riderAddr = payable(msg.sender);
        require(rides[_rideId].riderAddr == riderAddr, "Not authorized to cancel ride");
        require(!rides[_rideId].complete, "Ride is already completed, can't be cancelled");
        if (rides[_rideId].confirmedByDriver) {
            drivers[rides[_rideId].driverAddr].status = DriverStatus.FREE;
        }
        delete rides[_rideId];
    }

    function getAllRides() public view returns(Ride[] memory){
        return rides;
    }
    
    function viewRideStatus(uint _rideId) public view returns (string memory, string memory, uint, bool, bool, address) {
    require(_rideId < rides.length, "Invalid ride ID provided.");

    Ride memory ride = rides[_rideId];
    return (ride.pickup, ride.dropoff, ride.amount, ride.complete, ride.confirmedByDriver, ride.driverAddr);
}


    function updateDriverRating(uint _rideId, uint _rating) public {
        require(rides[_rideId].complete == true, "Ride is not completed, rating can't be updated");
        address payable driverAddr = rides[_rideId].driverAddr;
        require(bytes(drivers[driverAddr].name).length != 0, "Driver not registered");
        require(_rating >= 1 && _rating <= 5, "Invalid rating, rating should be between 1 and 5");
        drivers[driverAddr].rating = (drivers[driverAddr].rating * drivers[driverAddr].numberOfRides + _rating) / (drivers[driverAddr].numberOfRides + 1);
        drivers[driverAddr].numberOfRides += 1;
    }

    function payDriver(uint _rideId) public payable {
        require(rides[_rideId].complete != true, "Ride is already completed, payment can't be done");
        address payable driverAddr = rides[_rideId].driverAddr;
        require(bytes(drivers[driverAddr].name).length != 0, "Driver not registered");
        require(msg.value == rides[_rideId].amount, "Payment amount is incorrect");
        rides[_rideId].complete = true;
        drivers[driverAddr].status = DriverStatus.FREE;
        driverAddr.transfer(rides[_rideId].amount);
    }

}
