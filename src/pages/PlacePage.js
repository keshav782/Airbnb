import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Perks } from "../components/Perks";
import axios from "axios";
import { PhotosUploader } from "../components/PhotosUploader";
import { HouseData } from "./HouseData";

export const PlacePage = () => {
  const { id } = useParams();
  const { placeId } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photolink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [place, setplace] = useState(null);
  const [price, setPrice] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      console.log("--", data);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkin);
      setCheckOut(data.checkout);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setplace(data);
    });
  }, []);
  console.log("28", place);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescrption(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescrption(description)}
      </>
    );
  }

  async function addedPhotosByLink(e) {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photolink,
      });
      setAddedPhotos((prev) => [...prev, filename]);
    } catch (err) {
      console.log(err);
    }
    setPhotoLink("");
  }

  function uploadphotos(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data: filenames } = res;

        // console.log("71",filenames);
        setAddedPhotos((prev) => [...prev, ...filenames]);
      });
  }

  async function addNewPlace(e) {
    e.preventDefault();
    console.log("id", id);
    if (id) {
      await axios
        .put("/places", {
          id,
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        })
        .then(() => {
          alert("Successfully , Update your place");
          nav("/account/places");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (
        !title ||
        !address ||
        !description ||
        !checkIn ||
        !checkOut ||
        !maxGuests ||
        !price
      ) {
        alert("Please provide details");
        return;
      }
      await axios
        .post("/places", {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        })
        .then(() => {
          alert("Successfully , added new place");
          nav("/account/places");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // console.log("placeId", placeId);
  return (
    <div>
      {id === undefined && placeId !== "new" && (
        <div className="text-center ">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      {(id || placeId === "new") && (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "Title for your place, should be short and catchy as in advertisements"
            )}
            <input
              type="text"
              placeholder="title i.e My House"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {preInput("Address", "Address to this place")}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {preInput("Photos", "")}

            <PhotosUploader
              setPhotoLink={setPhotoLink}
              addedPhotosByLink={addedPhotosByLink}
              addedPhotos={addedPhotos}
              uploadphotos={uploadphotos}
              photolink={photolink}
              setAddedPhotos={setAddedPhotos}
            />

            {preInput("Description", "Description of the place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput("Perks", "Select all the perks of your place")}
            <Perks selected={perks} onChange={setPerks} />

            {preInput("Extra Info", "More Info i.e House Rules")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            {preInput(
              "Check in&out times",
              "add check in and check out times, remember to have some time to cleaning the room."
            )}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="11:30"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
      <div className="mt-4">
        {id !== undefined ||
          (place &&
            placeId !== "new" &&
            place.map((p) => {
              return <HouseData key={p._id} place={p} />;
            }))}
      </div>
    </div>
  );
};
