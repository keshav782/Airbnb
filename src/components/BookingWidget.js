import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BookingWidget = ({ singlepost }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guest, setGuest] = useState(1);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const nav = useNavigate();

  let numberofnights = 0;
  if (checkin && checkout) {
    numberofnights = differenceInCalendarDays(
      new Date(checkout),
      new Date(checkin)
    );
  }
  console.log("676", singlepost);
  async function handleclick(e) {
    e.preventDefault();
    const data = {
      checkin,
      checkout,
      name,
      number,
      place: singlepost._id,
      price: numberofnights * singlepost.price,
    };
    try{
        const response =  await axios.post("/booking", data);
        console.log("34",response);
        if (response.data.message) {
            alert("Booking successful!");
            nav("/account/booking/" + response.data.doc._id);
          } else {
            alert("Booking failed: " + response?.data?.error);
          }
    }
    catch(err){
        console.error("Error booking:", err);
      alert("An error occurred during booking: " + err.message);
    }
    
  }

  console.log(checkin, checkout, guest, name, number);
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price : ${singlepost.price} / Per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="   py-3 px-4">
            <label>Checkin:</label>
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>
          <div className=" py-3 px-4 border-l">
            <label>Checkout:</label>
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>
        </div>
        <div className=" py-3 px-4 border-t">
          <label>Number of guest:</label>
          <input
            type="number"
            min={1}
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
          />
        </div>
        {numberofnights > 0 && (
          <div className=" py-3 px-4 border-t">
            <label>Your Full Name:</label>
            <input
              type="text"
              min={1}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone Number:</label>
            <input
              type="tel"
              min={1}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={handleclick} className="primary mt-4">
        Book Now
        {numberofnights > 0 && (
          <span> ${numberofnights * singlepost.price}</span>
        )}
      </button>
    </div>
  );
};
