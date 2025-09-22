import React from 'react'
import ReactPaginate from 'react-paginate'
import './Pagination.css'


// currentpage: which page is currently selected,
// totalpages: total pages of results from TMDB
// onPageChange: function to call when page changes
// pageRangeDisplayed: number of pages to display, default 2
export default function Pagination({ currentPage, totalPages, onPageChange, pageRangeDisplayed = 2 }) {
  // dont render pagination if no pages or just one page
  if (totalPages <= 1) {
    return null
  }

  const handlePageClick = (e) => {
    // increase page by 1
    const selectedPage = e.selected + 1
    // call onPageChange function with the selected page
    if (onPageChange) {
      onPageChange(selectedPage)
    }
  }

  return (
    <ReactPaginate
      // ui parameters
      breakLabel="..." // shown on pagination gap (1...4 for example)
      nextLabel="Next ->"
      onPageChange={handlePageClick}
      pageRangeDisplayed={pageRangeDisplayed} // display 2 pages
      // show 2 pages forward, 1 page backward
      marginPagesDisplayed={1} // display 1 page before and after the current page
      pageCount={totalPages} // total pages of results from TMDB
      previousLabel="<- Previous"
      renderOnZeroPageCount={null} // when no pages to show, dont render
      forcePage={currentPage - 1} // indexs start from 0 so remove 1 to get correct page

      // css class names
      className="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
    />
  )
}
