"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const { isLoaded, user } = useUser();

  return (
    <nav className="bg-sky-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white font-bold text-lg">ChildSupport</span>
          </div>
          <div className="flex">
            <a
              style={{ textDecoration: "none" }}
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="/resources"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Resources
            </a>

            {isLoaded && user ? (
              <a
                style={{ textDecoration: "none" }}
                href="/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {user.username}
              </a>
            ) : (
              <a
                style={{ textDecoration: "none" }}
                href="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
