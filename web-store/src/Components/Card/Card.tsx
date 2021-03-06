import React from "react";
import { Link } from "react-router-dom";
import { PharmacyData } from "../../Types/types";

type CardProps = {
  data: PharmacyData;
};

export const Card = ({ data }: CardProps) => {
  return (
    <div className="max-w-xl my-1 col-span-1">
      <div className="bg-white shadow-md rounded-lg mb-2 tracking-wide hover:shadow-lg">
        <Link to={`order?id=${data.id}`}>
          <div className="md:flex-shrink-0">
            {data.bannerId ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/api/public/banner/download/${data?.bannerId}`}
                alt="thumbnail"
                className="w-full h-40 rounded-lg rounded-b-none"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
                alt="thumbnail"
                className="w-full h-40 rounded-lg rounded-b-none"
              />
            )}
          </div>
          <div className="px-4 py-2 mt-1">
            <div className="mb-2">
              <h2 className="font-semibold text-base text-gray-800 tracking-normal line-clamp-3">
                {data.title}
              </h2>
            </div>
            <div className="author flex items-center my-2">
              <h2 className="text-sm tracking-tighter truncate text-gray-900">
                {data.description}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
