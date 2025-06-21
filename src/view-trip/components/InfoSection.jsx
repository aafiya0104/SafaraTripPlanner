import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import placeholder from "@/assets/placeholder.jpg";
import { GetImageFromPexels } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(placeholder);
  const [photographer, setPhotographer] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const getLocationLabel = () => {
    if (trip?.userSelection?.location?.label) return trip.userSelection.location.label;
    if (trip?.location?.label) return trip.location.label;
    if (trip?.destination) return trip.destination;
    return null;
  };

  const getDays = () => trip?.userSelection?.noOfDays || trip?.noOfDays || trip?.days;
  const getBudget = () => trip?.userSelection?.budget?.title || trip?.budget?.title || trip?.budget;
  const getTraveler = () => trip?.userSelection?.traveler?.title || trip?.traveler?.title || trip?.traveler;

  const locationLabel = getLocationLabel();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (locationLabel && isClient) {
      fetchPexelsPhoto(locationLabel);
    } else if (isClient && trip) {
      fetchPexelsPhoto("travel destination");
    }
  }, [locationLabel, isClient, trip]);

  const fetchPexelsPhoto = async (location) => {
    try {
      const resp = await GetImageFromPexels(location + " travel");
      const photo = resp?.data?.photos?.[0];

      if (photo) {
        setPhotoUrl(photo.src.landscape || photo.src.medium);
        setPhotographer({
          name: photo.photographer,
          url: photo.photographer_url,
        });
      }
    } catch (error) {
      console.error("Failed to fetch Pexels photo:", error);
    }
  };

  if (!trip) {
    return (
      <div className="h-[340px] w-full bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Loading trip information...</p>
      </div>
    );
  }

  return (
    <div>
      <img 
        src={photoUrl} 
        className="h-[340px] w-full object-cover rounded-xl"
        alt={locationLabel || "Travel destination"}
      />
      {photographer && (
        <div className="text-xs text-gray-500 mt-2">
          Photo by{" "}
          <a href={photographer.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
            {photographer.name}
          </a>{" "}
          on{" "}
          <a href="https://pexels.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
            Pexels
          </a>
        </div>
      )}

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">{locationLabel || "Your Trip"}</h2>
        <div className="flex gap-5 flex-wrap">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">🗓️ {getDays() || "N/A"} Day</h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💰 {getBudget() || "N/A"} Budget</h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">✈️ No. of Traveler: {getTraveler() || "N/A"}</h2>
        </div>
      </div>

      <Button><IoIosSend /></Button>
    </div>
  );
}

export default InfoSection;
