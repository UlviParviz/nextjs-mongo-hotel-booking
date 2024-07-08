"use client";
import { IBooking } from "@/server/models/booking.model";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const MyBookings = ({ data }: Props) => {
  const bookings = data?.bookings;

  const setBookings = () => {
    const data: { columns: any; rows: any } = {
      columns: [
        { label: "Check In", field: "checkin", sort: "asc" },
        { label: "Check Out", field: "checkout", sort: "asc" },
        { label: "Amount Paid", field: "amountpaid", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    bookings?.forEach((booking) => {
      data.rows.push({
        checkin: new Date(booking.checkInDate).toLocaleString("en-US"),
        checkout: new Date(booking.checkOutDate).toLocaleString("en-US"),
        amountpaid: `$${booking.amountPaid.toFixed(2)}`,
        actions: (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Link
              style={{ width: "100%" }}
              href={`/bookings/${booking._id}`}
              className="btn btn-primary"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              style={{ width: "100%" }}
              href={`/bookings/invoice/${booking._id}`}
              className="btn btn-success"
            >
              <i className="fa fa-receipt"></i>
            </Link>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div className="px-2">
      <h1 style={{ fontWeight: "bold", textAlign: "center" }} className="my-5">
        My Bookings
      </h1>
      <MDBDataTable
        data={setBookings()}
        displayEntries={false}
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBookings;
