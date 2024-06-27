import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch();
    {
      setPosts([]);
    }
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {posts.length > 0 &&
        posts.map((post) => (
          <Link to={`/place/${post._id}`}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {post.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:5000/uploads/" + post.photos?.[0]}
                  alt="imag1.png"
                />
              )}
            </div>
            <h2 className="font-bold ">{post.address}</h2>
            <h3 className="text-sm truncate text-gray-500">{post.title}</h3>
            
            <div className="mt-1">
              <span className="font-bold">${post.price}</span>  per night
            </div>
          </Link>
        ))}
    </div>
  );
};
