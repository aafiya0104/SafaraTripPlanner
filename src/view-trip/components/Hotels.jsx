import React from "react";
import placeholder from "@/assets/placeholder.jpg";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel.HotelName +
              "," +
              hotel?.HotelAddress
            }
            target="_blank"
            className="no-underline"
            key={index}
          >
            <div className="hover:scale-110 transition-all cursor-pointer duration-300 ease-in-out">
              <img src={placeholder} alt="Trip Banner" className="rounded-xl" />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.HotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍{hotel?.HotelAddress}
                </h2>
                <h2 className="text-sm text-gray-600 italic">
                  {hotel?.PriceRange && hotel.PriceRange.trim() !== ""
                    ? hotel.PriceRange
                    : "Hotel price not available"}
                </h2>
                <h2 className="text-sm">⭐️{hotel?.Rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
