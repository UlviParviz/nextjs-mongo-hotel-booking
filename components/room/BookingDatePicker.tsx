"use client";

import { calculateDaysOfStay } from "@/helpers/helpers";
import { useNewBookingMutation } from "@/redux/api/bookingApi";
import { IRoom } from "@/server/models/room.model";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  room: IRoom;
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const [newBooking, { isLoading, error, isSuccess }] = useNewBookingMutation();

  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);

      setDaysOfStay(days);
    }
  };

  const bookRoom = () => {
    const bookingData = {
      room: room?._id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: room.pricePerNight * daysOfStay,
      paymentInfo: {
        id: "STRIPE_ID",
        status: "PAID",
      },
    };
    newBooking(bookingData);
  };

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>${room?.pricePerNight}</b> / Night
      </p>
      <hr />
      <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
      <DatePicker
        className="w-100"
        selected={checkInDate}
        onChange={onChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        selectsRange
        inline
      />
      <button onClick={bookRoom} className="btn btn-danger py-3 form-btn w-100">
        Pay
      </button>
    </div>
  );
};

export default BookingDatePicker;
