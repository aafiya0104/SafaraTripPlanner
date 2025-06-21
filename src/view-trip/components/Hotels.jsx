import React, { useState, useEffect } from "react";
import placeholder from "@/assets/placeholder.jpg";
import { Link } from "react-router-dom";
import { GetImageFromPexels } from "@/service/GlobalApi";

function Hotels({ trip }) {
  const [photoMap, setPhotoMap] = useState({});

  useEffect(() => {
    if (trip?.tripData?.hotels) {
      trip.tripData.hotels.forEach((hotel) => fetchHotelPhoto(hotel));
    }
  }, [trip]);

  const fetchHotelPhoto = async (hotel) => {
    try {
      const resp = await GetImageFromPexels(hotel.HotelName + " hotel");
      const image = resp?.data?.photos?.[0];

      if (image) {
        setPhotoMap((prev) => ({
          ...prev,
          [hotel.HotelName]: {
            url: image.src.medium,
            photographer: image.photographer,
            photographerUrl: image.photographer_url,
          },
        }));
      }
    } catch (error) {
      console.error(`Failed to fetch photo for ${hotel.HotelName}:`, error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
        {trip?.tripData?.hotels?.map((hotel, index) => {
          const photoData = photoMap[hotel.HotelName];

          return (
            <div key={index}>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${hotel.HotelName},${hotel?.HotelAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <div className="hover:scale-110 transition-all cursor-pointer duration-300 ease-in-out">
                  <img
                    src={photoData?.url || placeholder}
                    alt={hotel.HotelName}
                    className="rounded-xl h-[200px] w-full object-cover"
                  />
                  <div className="my-2 flex flex-col gap-1">
                    <h2 className="font-medium">{hotel?.HotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍{hotel?.HotelAddress}</h2>
                    <h2 className="text-sm text-gray-600 italic">
                      {hotel?.PriceRange?.trim() !== ""
                        ? hotel.PriceRange
                        : "Hotel price not available"}
                    </h2>
                    <h2 className="text-sm">⭐️{hotel?.Rating}</h2>
                  </div>
                </div>
              </Link>

              {photoData?.photographer && (
                <p className="text-xs text-gray-400 italic mt-1">
                  Photo by{" "}
                  <a
                    href={photoData.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {photoData.photographer}
                  </a>{" "}
                  on{" "}
                  <a
                    href="https://pexels.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Pexels
                  </a>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
