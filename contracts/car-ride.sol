// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CarRide {
    // Map from rider ID to ride information
    mapping(uint => Ride) public rides;
    // Map from user address to user information
    mapping(address => User) public users;

    // Struct for ride information
    struct Ride {
        address payable driver;
        address payable rider;
        string pickup;
        string dropoff;
        uint distance;
        uint amount;
        bool requestAccepted;
        bool paid;
        bool completed;
        uint driverRating;
        uint riderRating;
    }

    // List to store all ride requests
    Ride[] public rideRequests;
    // List to store all ride requests
    User[] public registeredUser;

    // Event for ride request
    event RideRequested(uint riderId);
    event RideAccepted(uint riderId);
    event RideCancelled(uint riderId);
    event PaymentMade(uint riderId);



    // Struct for user information
    struct User {
        // Boolean to store whether the user is a driver or a rider
        bool isDriver;
        // Boolean to store whether the user has been verified
        bool verified;
        // String to store the user's name
        string name;
        // String to store the user's driver's license or other identification
        uint identification;
    }

    // Function to register a user
    function registerUser(bool isDriver, string memory name, uint identification) public {
        // Check that the user has not already been registered
        require(!users[msg.sender].verified, "User has already been registered");

        // Store the user's information in the mapping
        users[msg.sender] = User(isDriver, true, name, identification);
        
        User memory user = users[msg.sender];
        registeredUser.push(user);
    }

    // Function to request a ride
    function requestRide(string memory pickup, string memory dropoff, uint distance) public {
        // Check that the requester is a rider
        require(users[msg.sender].isDriver == false, "Only riders can request rides");

        // Check that the requester is verified
        require(users[msg.sender].verified == true, "User must be verified to request a ride");
        // Create a new ride and add it to the mapping
        uint riderId = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender)));

        rides[riderId] = Ride( payable(address(0)), payable(msg.sender), pickup, dropoff, distance, 0, false, false, false, 0, 0);

        // Add the ride to the list of ride requests
        rideRequests.push(rides[riderId]);

        // Emit event
        emit RideRequested(riderId);
    }

    // Function to accept a ride request
    function acceptRideRequest(uint riderId) public {
        // Check that the acceptor is a driver
        require(users[msg.sender].isDriver == true, "Only drivers can accept ride requests");

        // Check that the acceptor is verified
        require(users[msg.sender].verified == true, "User must be verified to accept a ride request");
        // Check that the ride has not already been accepted or cancelled
        require(!rides[riderId].requestAccepted && !rides[riderId].completed, "Ride has already been accepted or cancelled");
        
        rides[riderId].driver =  payable(msg.sender);
        rides[riderId].requestAccepted = true;
        emit RideAccepted(riderId);
    }

    // Function to cancel a ride request
    function cancelRide(uint riderId) public {
        // Check that the requester is the rider who requested the ride
        require(rides[riderId].rider == msg.sender, "Only the rider who requested the ride can cancel it");

        // Check that the ride has not already been accepted or cancelled
        require(!rides[riderId].requestAccepted && !rides[riderId].completed, "Ride has already been accepted or cancelled");

    
        rides[riderId].completed = true;
        emit RideCancelled(riderId);
    }

    function payForRide(uint riderId) public payable {
        // Check that the ride has been accepted
        require(rides[riderId].requestAccepted, "Ride has not been accepted");

        // Check that the correct amount is being paid
        require(msg.value > rides[riderId].amount, "Incorrect amount being paid");

        // Transfer payment to the driver
        require(rides[riderId].driver.send(msg.value), "Payment failed");

 
        rides[riderId].paid = true;
        emit PaymentMade(riderId);

    }


    // Function for a rider to rate a driver after a ride is completed
    function rateDriver(uint riderId, uint rating) public {
        // Check that the requester is the rider who requested the ride
        require(rides[riderId].rider == msg.sender, "Only the rider who requested the ride can rate the driver");

        // Check that the ride has been completed
        require(rides[riderId].completed == true, "Ride must be completed before it can be rated");

        // Check that the rider has not already rated the driver
        require(rides[riderId].driverRating == 0, "Driver has already been rated for this ride");
        // Store the rating in the ride information
        rides[riderId].driverRating = rating;
    }

    // Function for a driver to rate a rider after a ride is completed
    function rateRider(uint riderId, uint rating) public {
        // Check that the requester is the driver who accepted the ride request
        require(rides[riderId].driver == msg.sender, "Only the driver who accepted the ride request can rate the rider");

        // Check that the ride has been completed
        require(rides[riderId].completed == true, "Ride must be completed before it can be rated");

        // Check that the driver has not already rated the rider
        require(rides[riderId].riderRating == 0, "Rider has already been rated for this ride");

        // Store the rating in the ride information
        rides[riderId].riderRating = rating;
    }

    // Function to retrieve all ride requests
    function getAllRequests() public view returns (Ride[] memory) {
        return rideRequests;
    }

    function getAllUsers() public view returns (User[] memory) {
    return registeredUser;
    }


}

