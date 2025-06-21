import React, { useEffect, useState } from "react";
import PlaceCardItem from "./PlaceCardItem";
import { Link } from "react-router-dom";
import { GetImageFromPexels } from "@/service/GlobalApi";
import placeholder from "@/assets/placeholder.jpg";

function Places({ trip }) {
  const [photoMap, setPhotoMap] = useState({});

  const getTripData = () => trip?.tripData || trip?.trip_data || trip?.data || null;
  const getItinerary = () => {
    const tripData = getTripData();
    return tripData?.itinerary || tripData?.plan || tripData?.schedule || null;
  };

  const itinerary = getItinerary();

  useEffect(() => {
    if (itinerary) {
      itinerary.forEach((day, dayIdx) => {
        (day.Activities || day.activities || day.places || []).forEach((place, placeIdx) => {
          const placeName = place.PlaceName || place.placeName || place.name || place.title;
          fetchPlacePhoto(placeName);
        });
      });
    }
  }, [itinerary]);

  const fetchPlacePhoto = async (placeName) => {
    if (!placeName || photoMap[placeName]) return;

    try {
      const resp = await GetImageFromPexels(placeName + " tourist spot");
      const image = resp?.data?.photos?.[0];

      if (image) {
        setPhotoMap((prev) => ({
          ...prev,
          [placeName]: {
            url: image.src.medium,
            photographer: image.photographer,
            photographerUrl: image.photographer_url,
          },
        }));
      }
    } catch (error) {
      console.error(`Failed to fetch image for ${placeName}:`, error);
    }
  };

  if (!trip) {
    return (
      <div className="mt-10">
        <h2 className="font-bold text-lg mb-4">Places To Visit</h2>
        <div className="text-gray-500 italic animate-pulse">
          Loading trip details...
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="mt-10">
        <h2 className="font-bold text-lg mb-4">Places To Visit</h2>
        <div className="text-gray-500 italic">
          No places found in trip data.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-lg mt-10 mb-4">Places To Visit</h2>
      <div className="flex flex-col gap-6">
        {itinerary.map((item, dayIdx) => (
          <div key={dayIdx}>
            <h2 className="font-bold text-lg text-zinc-800 mb-2">
              Day {item.Day || item.day || dayIdx + 1}
            </h2>
            {(item.Activities || item.activities || item.places || []).map((place, placeIdx) => {
              const placeName = place.PlaceName || place.placeName || place.name || place.title;
              const placeDetails = place.PlaceDetails || place.placeDetails || place.details || place.description;
              const timeToTravel = place.TimeToTravel || place.timeToTravel || place.time || place.duration;
              const ticketPricing = place.TicketPricing || place.ticketPricing || place.price || place.cost;

              const photoData = photoMap[placeName];

              return (
                <Link
                  to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName || "place")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                  key={placeIdx}
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start mb-4 border rounded-xl p-3 mt-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                    <PlaceCardItem
                      imageUrl={photoData?.url || placeholder}
                      altText={placeName || "Place"}
                    />
                    <div>
                      <h2 className="font-semibold text-md">{placeName || "Unknown Place"}</h2>
                      <p className="text-sm text-gray-600">
                        {placeDetails || "No details available"}
                      </p>
                      {timeToTravel && (
                        <p className="text-sm text-orange-600 mt-1 italic">
                          🕒 {timeToTravel}
                        </p>
                      )}
                      {ticketPricing && (
                        <p className="text-sm text-gray-500">
                          🎟 {ticketPricing}
                        </p>
                      )}
                    </div>
                  </div>
                  {photoData?.photographer && (
                    <p className="text-xs text-gray-400 italic ml-2">
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
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;
