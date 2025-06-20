import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";
import placeholder from "@/assets/placeholder.jpg"; 

function InfoSection({ trip }) {
  if (!trip || !trip.userSelection) return null;

  return (
    <div>
      <img
        src={placeholder}
        alt="Trip Banner"
        className="w-full h-[340px] object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip.userSelection.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓️ {trip.userSelection.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip.userSelection?.budget?.title || trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              ✈️ No. of Traveler: {trip.userSelection?.traveler?.title || trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
