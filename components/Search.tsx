"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryString = [
      location && `location=${encodeURIComponent(location)}`,
      guests && `guestCapacity=${encodeURIComponent(guests)}`,
      category && `category=${encodeURIComponent(category)}`,
    ]
      .filter(Boolean)
      .join("&");

    router.push(`/?${queryString}`);
  };
  return (
    <div className="row wrapper py-5">
      <div className="col-11 col-lg-5 ">
        <form className="shadow rounded" onSubmit={submitHandler}>
          <h2 className="mb-3 stays-heading text-center ">Search Rooms</h2>
          <div className="form-group mt-3">
            <label htmlFor="location_field" className="mb-1">
              {" "}
              Location{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="location_field"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="guest_field" className="mb-1">
              {" "}
              No. of Guests{" "}
            </label>
            <select
              className="form-select"
              id="guest_field"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="" disabled>
                Choose Number Of Guests
              </option>
              {[1, 2, 3, 4, 5, 6].map((num) => {
                return (
                  <option key={num} value={num}>
                    {num}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="room_type_field" className="mb-1">
              {" "}
              Room Type{" "}
            </label>
            <select
              className="form-select"
              id="room_type_field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Choose Category
              </option>
              {["King", "Single", "Twins"].map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit" className="btn form-btn btn-danger w-100 py-2 d-flex justify-content-center align-items-center gap-2">
            <span className="">Search</span>
            <i aria-hidden className="fa-solid fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
