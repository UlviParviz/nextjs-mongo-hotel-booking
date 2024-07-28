"use client";
import { revalidateTag } from "@/helpers/revalidate";
import {
  useDeleteReviewMutation,
  useLazyGetRoomReviewsQuery,
} from "@/redux/api/roomApi";
import { IReview } from "@/server/models/room.model";
import { MDBDataTable } from "mdbreact";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CustomError extends Error {
  errMessage: string;
}

const RoomReviews = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [getRoomReviews, { data, error }] = useLazyGetRoomReviewsQuery();

  const reviews = data?.reviews || [];

  const getRoomReviewsHandler = () => {
    getRoomReviews(roomId);
  };

  const [deleteReview, { isLoading, isSuccess }] = useDeleteReviewMutation();
  const deleteReviewHandler = (id: string) => {
    deleteReview({ id, roomId });
  };

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }
    if (isSuccess) {
      revalidateTag("RoomDetails");
      toast.success("Review deleted successfully");
      router.refresh();
    }
  }, [error, isSuccess]);

  const setReviews = () => {
    const data: { columns: any; rows: any } = {
      columns: [
        { label: "Rating", field: "rating", sort: "asc" },
        { label: "Comment", field: "comment", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    reviews?.forEach((review: IReview) => {
      data.rows.push({
        rating: review?.rating,
        comment: review?.comment,
        actions: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              style={{ width: "100%" }}
              disabled={isLoading}
              onClick={() => deleteReviewHandler(review?._id as string)}
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
      <div className="row mt-5">
        <div className="col-12">
          <div style={{ margin: "0", padding: "0" }} className="form-check">
            <label htmlFor="roomId_field">Enter Room ID</label>
            <input
              type="text"
              id="roomId_field"
              className="form-control"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />

            <button
              className="btn form-btn w-100 py-2 mt-3 btn-danger"
              onClick={getRoomReviewsHandler}
            >
              Fetch Reviews
            </button>
          </div>
        </div>
      </div>
      {reviews.length > 0 ? (
        <MDBDataTable
          data={setReviews()}
          displayEntries={false}
          bordered
          striped
          hover
        />
      ) : (
        roomId != "" && (
          <h5 className="mt-5 text-center alert alert-danger">No Reviews</h5>
        )
      )}
    </div>
  );
};

export default RoomReviews;
