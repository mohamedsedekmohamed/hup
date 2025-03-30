import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const ViewTrips = () => {
  const [tripsData, settrip] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { view } = location.state || {};
    settrip(view);
  }, [location.state]);

  const cancellationPolicy = tripsData?.cancellation_policy || {};

  return (
    <div className="font-sans p-5">
      <button onClick={() => navigate('/Trips')} className="w-full text-left">
        <IoIosArrowBack className="text-4xl" />
      </button>
      <h1 className="text-center text-4xl text-gray-800 mb-5">Trips Information</h1>
      <div className="border border-gray-300 mx-auto p-5 max-w-4xl rounded-lg bg-white">
        <h2 className="text-center text-2xl text-gray-700 font-bold mb-4">
          Trip: {tripsData?.name}
        </h2>
        
        {tripsData?.route && (
          <>
            <div className="flex flex-wrap justify-start gap-12 py-10">
              <p><strong>Country:</strong> {tripsData.route.origin.country_name}</p>
              <p><strong>City:</strong> {tripsData.route.origin.city.name}</p>
              <p><strong>Zone:</strong> {tripsData.route.origin.zone.name}</p>
              <p><strong>Pickup Station:</strong> {tripsData.route.origin.pickup_station.name}</p>
            </div>
            <div className="flex flex-wrap justify-start gap-12 py-10">
              <p><strong>Country:</strong> {tripsData.route.destination.country_name}</p>
              <p><strong>City:</strong> {tripsData.route.destination.city.name}</p>
              <p><strong>Zone:</strong> {tripsData.route.destination.zone.name}</p>
              <p><strong>Dropoff Station:</strong> {tripsData.route.destination.dropoff_station.name}</p>
            </div>
          </>
        )}

<div className="flex flex-wrap justify-start gap-12 py-10">
<p className="text-lg "><strong>Status:</strong> {tripsData?.status}</p>
          <p className="text-lg "><strong>Trip Type:</strong> {tripsData?.trip_type}</p>
          <p className="text-lg"><strong>Departure Time:</strong> {tripsData?.departure_time}</p>
          <p className="text-lg "><strong>Arrival Time:</strong> {tripsData?.arrival_time}</p>
          <p className="text-lg "><strong>Price:</strong> {tripsData?.currency_sympol} {tripsData?.price}</p>
          <p className="text-lg"><strong>Min Cost:</strong> {tripsData?.min_cost}</p>
          <p className="text-lg "><strong>Currency Name:</strong> {tripsData?.currency_name}</p>
          <p className="text-lg"><strong>Available Seats:</strong> {tripsData?.available_seats}</p>
          <p className="text-lg "><strong>Type:</strong> {tripsData?.type}</p>
        </div>

        <h3 className="text-center text-2xl text-gray-800 mb-4">Cancellation Policy</h3>
        <div className="flex flex-wrap justify-start gap-12 py-10">
        <p className="text-lg "><strong>Policy:</strong> {cancellationPolicy?.policy || 'No Policy Available'}</p>
          <p className="text-lg "><strong>Pay Amount:</strong> {cancellationPolicy?.pay_amount}</p>
          <p className="text-lg "><strong>Pay Value:</strong> {cancellationPolicy?.pay_value}</p>
          <p className="text-lg "><strong>Cancellation Date:</strong> {cancellationPolicy?.cancellation_date}</p>
        </div>

        <h3 className="text-center text-2xl text-gray-800 mb-4">Bus Details</h3>
        <div className="flex flex-wrap justify-start gap-12 py-10">
        <p className="text-lg"><strong>Bus Number:</strong> {tripsData?.bus?.number}</p>
          <p className="text-lg "><strong>Bus Capacity:</strong> {tripsData?.bus?.capacity}</p>
          <p className="text-lg "><strong>Bus Status:</strong> {tripsData?.bus?.status}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewTrips;
