import React, { useEffect, useState } from "react";
import { GetImageFromPexels } from "@/service/GlobalApi";
import placeholder from "@/assets/placeholder.jpg";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  const [imageUrl, setImageUrl] = useState(null);
  const locationName =
    trip?.userSelection?.location?.display_name ||
    trip?.userSelection?.location?.name ||
    "Travel";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const resp = await GetImageFromPexels(locationName + " landscape");
        const photo = resp?.data?.photos?.[0];
        setImageUrl(photo?.src?.medium || placeholder);
      } catch (err) {
        console.error("Error fetching image from Pexels:", err);
        setImageUrl(placeholder);
      }
    };

    fetchImage();
  }, [locationName]);

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className="rounded-xl border shadow-sm overflow-hidden hover:shadow-md scale-105 transition-all cursor-pointer">
      <img
        src={imageUrl || placeholder}
        alt={locationName}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {locationName || "Unknown Location"}
        </h3>
        <p className="text-gray-500 text-sm">
          {trip?.userSelection?.noOfDays || "?"} days ·{" "}
          {trip?.userSelection?.traveler?.title || "?"}
        </p>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCard;
