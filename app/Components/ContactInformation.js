"use client";

import { useEffect, useState } from "react";

export default function ContactInformation({ setCurrentPage }) {
  const currentDate = new Date();
  const currentLocalDate = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  );
  currentLocalDate.setMinutes(currentLocalDate.getMinutes() + 15);

  const [bookingDate, setBookingDate] = useState(
    currentLocalDate.toISOString().slice(0, 10)
  );

  const [bookingTime, setBookingTime] = useState(
    currentLocalDate.toISOString().slice(11, 16)
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    numberOfSeats: "",
    bookingDate: bookingDate,
    bookingTime: bookingTime,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    numberOfSeats: false,
    bookingDate: false,
    bookingTime: false,
  });

  const isFormValid = () => {
    const today = new Date().toISOString().slice(0, 10);
    const currentTime = currentLocalDate.toISOString().slice(11, 16);
    const isValidDate = formData.bookingDate >= today;
    const isValidTime = formData.bookingTime >= currentTime;
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber &&
      formData.numberOfSeats &&
      isValidDate &&
      isValidTime
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Handle form submission
      fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        console.log("Response received");
        if (res.status === 200) {
          console.log("Response succeeded!");
          // setSubmitted(true);
        }
      });
    } else {
      // Set error state for invalid fields
      const errors = { ...formErrors };
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          errors[key] = true;
        } else {
          errors[key] = false;
        }
      });
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-full flex-col gap-4 border border-dashed border-neutral-400 rounded-3xl px-4 py-6 bg-white/60">
      <h1 className="text-3xl self-center border-b p-4">Booking Information</h1>
      <form
        // onSubmit={handleSubmit}
        // action="#"
        // method="POST"
        className="mx-auto max-w-xl"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {formErrors.firstName && "First name is required"}
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {formErrors.lastName && "Last name is required"}
              </p>
            </div>
          </div>
          {/* Email */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {formErrors.email && "Please enter a valid email address"}
              </p>
            </div>
          </div>
          {/* Phone Number */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {formErrors.phoneNumber && "Phone number is required"}
              </p>
            </div>
          </div>
          {/* Number of Seats */}
          <div className="sm:col-span-2">
            <label
              htmlFor="numberOfSeats"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Number of seats
            </label>
            <div className="relative mt-2.5">
              <input
                type="number"
                name="numberOfSeats"
                id="numberOfSeats"
                value={formData.numberOfSeats}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {formErrors.numberOfSeats && "Number of seats is required"}
              </p>
            </div>
          </div>
          {/* Booking Date and Time */}
          {/* Booking Date */}
          <div>
            <label
              htmlFor="bookingDate"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Booking Date
            </label>
            <div className="relative mt-2.5">
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={formData.bookingDate}
                min={formData.bookingDate}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {formErrors.bookingDate &&
                  "Please select a date today or onwards"}
              </p>
            </div>
          </div>

          {/* Booking Time */}
          <div>
            <label
              htmlFor="bookingTime"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Booking Time
            </label>
            <div className="relative mt-2.5">
              <input
                type="time"
                id="bookingTime"
                name="bookingTime"
                min={formData.bookingTime}
                value={formData.bookingTime}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {formErrors.bookingTime &&
                  "Please select a time at least 15 minutes ahead"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            // disabled={!isFormValid()}
            className="block w-full rounded-md bg-pink-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
