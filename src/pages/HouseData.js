import React from "react";
import { Link } from "react-router-dom";

export const HouseData = ({ place }) => {
    // console.log(place)
  return (
    <Link to={`/account/places/new/${place._id}`} className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer">
      <div className="flex w-42 h-32 bg-gray-300 shrink-0 grow">
        {place.photos && place.photos.length > 0 && (
          <img className="object-cover" src={'http://localhost:5000/uploads/'+place.photos[0]} alt="imgae.png" />
        )}
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-xl">{place.title}</h2>
        <p className="text-sm mt-2">{place.description}</p>
      </div>
    </Link>
  );
};
