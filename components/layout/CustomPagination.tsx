"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";
interface Props {
  resPerPage: number;
  filteredRoomsCount: number;
}
const CustomPagination = ({ resPerPage, filteredRoomsCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;

  const handlePageChange = (currentPage: string) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }
      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);
    }
  };
  return (
    <div>
      {resPerPage < filteredRoomsCount && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsCount}
            onChange={handlePageChange}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
