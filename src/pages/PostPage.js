import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingWidget } from "../components/BookingWidget";

export const PostPage = () => {
  const { id } = useParams();
  const [singlepost, setSinglepost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showphotos, setShowphotos] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then(({ data }) => {
      setSinglepost(data);
      setLoading(false);
    });
  }, [id]);

  const getMapsUrl = (address) => {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (showphotos) {
    return (
      <div className="absolute insert-0 bg-white  min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-2xl mr-36">photo of {singlepost?.title}</h2>
            <button
              onClick={() => setShowphotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-black text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close photo
            </button>
          </div>
          {singlepost.photos?.length > 0 &&
            singlepost.photos.map((photo) => (
              <div>
                <img
                  className="w-full "
                  src={"http://localhost:5000/uploads/" + photo}
                  alt={"imgae.png"}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-2xl">{singlepost?.title}</h1>
      <a
        href={getMapsUrl(singlepost?.address)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-1 my-3 block font-semibold underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {singlepost?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden ">
          <div>
            {singlepost.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowphotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={
                    "http://localhost:5000/uploads/" + singlepost.photos?.[0]
                  }
                  alt="imag1.png"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {singlepost.photos?.[1] && (
              <img
                onClick={() => setShowphotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={"http://localhost:5000/uploads/" + singlepost.photos?.[1]}
                alt="imag1.png"
              />
            )}
            <div className=" overflow-hidden">
              {singlepost.photos?.[2] && (
                <img
                onClick={() => setShowphotos(true)}
                  className="aspect-square object-cover relative top-2 cursor-pointer"
                  src={
                    "http://localhost:5000/uploads/" + singlepost.photos?.[2]
                  }
                  alt="imag1.png"
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowphotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {singlepost.description}
          </div>
          Check-In : {singlepost.checkin} <br />
          Check-Out : {singlepost.checkout} <br />
          Max number of Guests : {singlepost.maxGuests}
        </div>
        <div>
          <BookingWidget singlepost={singlepost} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="text-sm text-gray-650 leading-6 mb-4 mt-2">
          {singlepost.extraInfo}
        </div>
      </div>
    </div>
  );
};
