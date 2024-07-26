"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesStats from "./SalesStats";
import { SalesChart } from "../charts/SalesCharts";
import { TopPerformingChart } from "../charts/TopPerformingChart";
import { useLazyGetSalesStatsQuery } from "@/redux/api/bookingApi";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

interface CustomError extends Error {
  errMessage: string;
}

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date("2024/02/08"));
  const [endDate, setEndDate] = useState(new Date("2024/10/10"));

  const [getSalesStats, { error, data, isLoading }] =
    useLazyGetSalesStatsQuery();

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }
    if (startDate && endDate && !data) {
      getSalesStats({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error]);

  const submitHandler = () => {
    getSalesStats({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  if(!data) return <Loading/>
  return (
    <div className="ps-4 my-5 ">
      <div className="d-block d-md-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label htmlFor="" className="form-label d-block">
            Start Date
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label d-block">
            End Date
          </label>
          <DatePicker
            className="form-control"
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <button
          onClick={submitHandler}
          className="btn form-btn ms-md-4 mt-3 px-5 btn-danger"
        >
          Fetch
        </button>
      </div>
      <SalesStats data={data} />
      <div className="row">
        <div className="col-12 col-lg-7">
          <h4 className="my-5 text-center">Sales History</h4>
          <SalesChart salesData={data?.sixMonthSalesData} />
        </div>

        <div className="col-12 col-lg-5 text-center">
          <h4 className="my-5">Top Performing Rooms</h4>
          {data?.topRooms?.length != 0 ? (
            <TopPerformingChart rooms={data?.topRooms} />
          ) : (
            <p className="mt-5">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
