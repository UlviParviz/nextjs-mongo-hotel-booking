"use client";

import { calculateDaysOfStay } from "@/helpers/helpers";
import {
  useGetBookedDatesQuery,
  useLazyCheckBookingAvailabilityQuery,
  useLazyStripeCheckoutQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { IRoom } from "@/server/models/room.model";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

interface Props {
  room: IRoom;
}

interface CustomError extends Error {
  errMessage: string;
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [daysOfStay, setDaysOfStay] = useState(0);

  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [newBooking] = useNewBookingMutation();
  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();
  const [stripeCheckout, { error, isLoading, data: checkoutData }] =
    useLazyStripeCheckoutQuery();

  const isAvailable = data?.isAvailable;

  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(room._id);
  const excludeDates = dates?.map((date: string) => new Date(date)) || [];

  const onChange = (dates: [Date, Date] | null) => {
    if (dates) {
      const [checkIn, checkOut] = dates;
      setCheckInDate(checkIn);
      setCheckOutDate(checkOut);

      if (checkIn && checkOut) {
        const days = calculateDaysOfStay(checkIn, checkOut);
        setDaysOfStay(days);

        // Check booking availability
        checkBookingAvailability({
          id: room._id,
          checkInDate: checkIn.toISOString(),
          checkOutDate: checkOut.toISOString(),
        });
      }
    }
  };

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }

    if (checkoutData) {
      router.replace(checkoutData?.url);
    }
  }, [error, checkoutData]);

  const bookRoom = () => {
    const amount = room.pricePerNight * daysOfStay;
    const checkoutData = {
      checkInDate: checkInDate?.toISOString(),
      checkOutDate: checkOutDate?.toISOString(),
      daysOfStay,
      amount,
    };

    stripeCheckout({ id: room._id, checkoutData });
  };

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>${room.pricePerNight}</b> / night
      </p>

      <hr />

      <p className="mt5 mb-3">Pick Check In & Check Out Date</p>

      <DatePicker
        className="w-100"
        selected={checkInDate}
        onChange={onChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        excludeDates={excludeDates}
        selectsRange
        inline
      />

      {isAvailable === true && (
        <div className="alert alert-success my-3">
          Room is available. Book now.
        </div>
      )}
      {isAvailable === false && (
        <div className="alert alert-danger my-3">
          Room not available. Try different dates.
        </div>
      )}

      {isAvailable && !isAuthenticated && (
        <div className="alert alert-danger my-3">Login to book room.</div>
      )}

      {isAvailable && isAuthenticated && (
        <button
          className="btn py-3 form-btn w-100 btn-danger"
          onClick={bookRoom}
          disabled={isLoading}
        >
          Pay - ${daysOfStay * room.pricePerNight}
        </button>
      )}
    </div>
  );
};

export default BookingDatePicker;
