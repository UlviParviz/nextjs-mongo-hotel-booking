"use client";
import { IBooking } from "@/server/models/booking.model";
import React from "react";
import "./Invoice.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  data: {
    booking: IBooking;
  };
}

const Invoice = ({ data }: Props) => {
  const booking = data?.booking;

  const handleDownload = () => {
    const input = document.getElementById("booking_invoice");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 0, 0, pdfWidth, 0);
        pdf.save(`invoice-${booking?._id}.pdf`);
      });
    }
  };
  return (
    <div className="order-invoice my-5">
      <div className=" d-flex justify-content-center mb-5 ">
        <button className="btn btn-success col-sm-5" onClick={handleDownload}>
          <i className="fa fa-print" aria-hidden></i> Download Invoice
        </button>
      </div>
      <div className="px-2">
        <div id="booking_invoice" className="px-4 border border-secondary">
          <header className="clearfix">
            <div id="logo" className="my-4">
              <img
                src="/images/logo_size.jpg" // Use an absolute path
                alt="Bookly"
                className="responsive-img"
              />
            </div>
            <h1>INVOICE #{`${booking?._id.substring(0, 10)}`}</h1>
            <div id="company" className="clearfix">
              <div>Bookly</div>
              <div>
                <a href="mailto:info@bookit.com">info@bookly.com</a>
              </div>
            </div>
            <div id="project">
              <div>
                <span>NAME</span> {booking?.user?.name}
              </div>
              <div>
                <span>EMAIL</span> {booking?.user?.email}
              </div>
              <div>
                <span>DATE</span>{" "}
                {new Date(booking?.createdAt).toLocaleString("en-US")}
              </div>
              <div>
                <span>STATUS</span>{" "}
                {booking?.paymentInfo?.status?.toUpperCase()}
              </div>
            </div>
          </header>
          <main>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="service">Room</div>
              <div className="service">{`${booking?.room?.name.substring(
                0,
                15
              )}...`}</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="desc">Price Per Night</div>
              <div className="desc">${booking?.room?.pricePerNight}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="desc">Check In Date</div>
              <div className="unit">
                {new Date(booking?.checkInDate).toLocaleString("en-US")}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="desc">Check Out Date</div>
              <div className="qty">
                {new Date(booking?.checkOutDate).toLocaleString("en-US")}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Days of Stay</div>
              <div className="qty">{booking?.daysOfStay}</div>
            </div>

            <div style={{ margin: "10px 0" }}>
              <b>GRAND TOTAL</b>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                className="grand total"
              >
                ${booking?.amountPaid}
              </div>
            </div>

            <div id="notices">
              <div>NOTICE:</div>
              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer className="pb-5">
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
