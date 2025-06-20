import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function Places({ trip }) {
  // Prevent errors if data is missing
  if (!trip || !trip.tripData || !Array.isArray(trip.tripData.itinerary)) {
    return <div className="text-gray-500 italic">Loading trip details...</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg mt-10 mb-4">Places To Visit</h2>
      <div className="flex flex-col gap-6">
        {trip.tripData.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg text-zinc-800 mb-2">Day {item.Day}</h2>
            {item.Activities?.map((Places, idx) => (
              <div className="flex gap-4 items-start mb-4" key={idx}>
                <PlaceCardItem
                  imageUrl={Places.PlaceImageUrl}
                  altText={Places.PlaceName}
                />
                <div>
                  <h2 className="font-semibold text-md">{Places.PlaceName}</h2>
                  <p className="text-sm text-gray-600">{Places.PlaceDetails}</p>
                  <p className="text-sm text-orange-600 mt-1 italic">
                    🕒 {Places.TimeToTravel}
                  </p>
                  <p className="text-sm text-gray-500">🎟 {Places.TicketPricing}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;
