// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4 relative">
      <div className="mb-8">
        {/* SVG Illustration */}
        <svg
          className="w-64 h-64 mx-auto"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="250" cy="250" r="250" fill="#1f1f1f" />
          <path
            d="M163 220h-26v-26h26v26zm100 0h-26v-26h26v26zm-57 75h54a8 8 0 010 16h-54a8 8 0 010-16z"
            fill="#fff"
          />
          <text
            x="50%"
            y="70%"
            textAnchor="middle"
            fill="#e50914"
            fontSize="60"
            fontWeight="bold"
          >
            404
          </text>
        </svg>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-red-600">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-300 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-lg font-semibold transition"
      >
        Back to Home
      </Link>
    </div>
  );
};
