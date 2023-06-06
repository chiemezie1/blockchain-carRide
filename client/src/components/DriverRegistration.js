import React, { useState } from "react";

const DriverRegistration = ({ onSubmit }) => {
  const [inputs, setInputs] = useState({
    name: "",
    contact: "",
    email: "",
    carNumber: "",
    seats: ""
  });

  const [currentInput, setCurrentInput] = useState("name");
  const [prevInput, setPrevInput] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleNext = () => {
    if (currentInput === "name" && inputs.name !== "") {
      setPrevInput("name");
      setCurrentInput("contact");
    } else if (currentInput === "contact" && inputs.contact !== "") {
      setPrevInput("contact");
      setCurrentInput("email");
    } else if (currentInput === "email" && inputs.email !== "") {
      setPrevInput("email");
      setCurrentInput("carNumber");
    } else if (currentInput === "carNumber" && inputs.carNumber !== "") {
      setCurrentInput("seats");
      setPrevInput("carNumber");
    } else if (currentInput === "seats" && inputs.seats !== "") {
      onSubmit(inputs);
    } else {
      console.log("Please fill all required fields");
    }
  };

  const handlePrevious = () => {
    if (currentInput === "contact") {
      setCurrentInput("name");
      setPrevInput(null);
    } else if (currentInput === "email") {
      setCurrentInput("contact");
      setPrevInput("name");
    } else if (currentInput === "carNumber") {
      setCurrentInput("email");
      setPrevInput("contact");
    } else if (currentInput === "seats") {
      setCurrentInput("carNumber");
      setPrevInput("email");
    }
  };

  return (
    <div className="max-w-xl w-full mt-10 p-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Driver Registration
      </h2>

      {currentInput === "name" && (
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-100 text-2xl font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {currentInput === "contact" && (
        <div className="mb-6">
          <label
            htmlFor="contact"
            className="block text-gray-100 text-2xl font-bold mb-2"
          >
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={inputs.contact}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {currentInput === "email" && (
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-100 text-2xl font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {currentInput === "carNumber" && (
        <div className="mb-6">
          <label
            htmlFor="carNumber"
            className="block text-gray-100 text-2xl font-bold mb-2"
          >
            Car Number
          </label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            value={inputs.carNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {currentInput === "seats" && (
        <div className="mb-6">
          <label
            htmlFor="seats"
            className="block text-gray-100 text-2xl font-bold mb-2"
          >
            Number of Seats
          </label>
          <input
            type="text"
            id="seats"
            name="seats"
            value={inputs.seats}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      <div className="flex justify-between">
        <div>
          {prevInput !== null && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-8 rounded-lg"
            >
              Previous
            </button>
          )}
        </div>
        <div className="">
          {currentInput !== "seats" ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-lg"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DriverRegistration;
