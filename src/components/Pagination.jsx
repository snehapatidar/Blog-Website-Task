import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxPageNumbersToShow = 6;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1);
  const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  const displayedPages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav>
      <ul className="pagination flex justify-center gap-2">
    
        {currentPage > 1 && (
          <li className="page-item">
            <button onClick={() => paginate(currentPage - 1)} className=" text-white">
              <IoIosArrowBack className="icon-white" />
            </button>
          </li>
        )}

        {displayedPages.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="page-item">
            <button onClick={() => paginate(currentPage + 1)} className="text-white">
              <IoIosArrowForward className="icon-white" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
