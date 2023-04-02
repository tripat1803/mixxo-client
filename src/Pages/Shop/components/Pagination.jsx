/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const Pagination = ({ postPerPage, totalPost, currCat, currPg }) => {
  let navigate = useNavigate();
  const [page, setPage] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [length, setLength] = useState();

  useEffect(() => {
    setPage([]);
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
      setPage((prevData) => [...prevData, i]);
    }
  }, [postPerPage, totalPost]);

  useEffect(() => {
    setLength(totalPost / postPerPage);
  }, [totalPost, postPerPage]);

  useEffect(() => {
    setCategory(currCat);
  }, [currCat]);

  useEffect(() => {
    setCurrentPage(currPg);
  }, [currPg]);

  return (
    <nav className="mt-20 mb-20">
      <ul className="h-5 flex justify-center gap-3 items-center">
        <button
          onClick={() => {
            if (currPg > 1) {
              navigate(`/shop?category=${category[0]}&page=${currPg - 1}`);
            }
          }}
        >
          <KeyboardBackspaceIcon />
        </button>
        {page.map((num) => (
          <li className="text" key={num}>
            <button
              className="font-bold text-xl"
              onClick={() => {
                navigate(`/shop?category=${category[0]}&page=${num}`);
              }}
            >
              {num}
            </button>
          </li>
        ))}
        <button
          onClick={() => {
            if (currPg < length) {
              navigate(`/shop?category=${category[0]}&page=${currPg + 1}`);
            }
          }}
          className=" rotate-180"
        >
          <KeyboardBackspaceIcon />
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
