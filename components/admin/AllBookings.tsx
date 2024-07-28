"use client";
import { useDeleteBookingMutation } from "@/redux/api/bookingApi";
import { IBooking } from "@/server/models/booking.model";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
interface Props {
  data: {
    bookings: IBooking[];
  };
}

interface CustomError extends Error {
  errMessage: string;
}

const AllBookings = ({ data }: Props) => {
  const bookings = data?.bookings;
  const router = useRouter();
  const [deleteBooking, { error,isLoading, isSuccess }] = useDeleteBookingMutation();
  const deleteBookingHandler = (id: string) => {
    deleteBooking(id);
  };
  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }
    if (isSuccess) {
      toast.success("Booking deleted successfully");
      router.refresh();
    }
  }, [error, isSuccess]);
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
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Link
              style={{ width: "100%" }}
              href={`/bookings/${booking._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              style={{ width: "100%" }}
              href={`/bookings/invoice/${booking?._id}`}
              className="btn btn-outline-success"
            >
              <i className="fa fa-receipt"></i>
            </Link>
            <button
              style={{ width: "100%" }}
              disabled={isLoading}
              onClick={() => deleteBookingHandler(booking?._id as string)}
              className="btn btn-outline-danger"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div>
      <h2
        style={{ fontWeight: "-moz-initial" }}
        className="text-center my-2"
      >{`${bookings?.length} Bookings`}</h2>

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

export default AllBookings;
