import React from 'react';
import placeholder from "@/assets/placeholder.jpg";

function PlaceCardItem({ imageUrl, altText = "Place" }) {
  return (
    <div>
      <img
        src={placeholder}
        alt={altText}
        className="rounded-xl w-[130px] h-[130px] object-cover"
      />
    </div>
  );
}

export default PlaceCardItem;
