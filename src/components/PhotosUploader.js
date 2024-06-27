import React from "react";

export const PhotosUploader = ({
  setPhotoLink,
  addedPhotosByLink,
  addedPhotos,
  uploadphotos,
  photolink,
  setAddedPhotos 
}) => {

  function removePhoto(link) {
    setAddedPhotos([...addedPhotos.filter((item) => item !== link)]);
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={photolink}
          onChange={(e) => setPhotoLink(e.target.value)}
          type="text"
          placeholder="Add using a link..."
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addedPhotosByLink}
        >
          Add&nbsp;Photo
        </button>
      </div>

      <div className="mt-3 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative " key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={`http://localhost:5000/uploads/${link}`}
                alt={link}
              />
              <button onClick={()=>removePhoto(link)} className="cursor-pointer absolute bottom-2 right-2 text-white bg-primary p-1 rounded-full bg-opacity-70">
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        <label className="cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadphotos}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};
