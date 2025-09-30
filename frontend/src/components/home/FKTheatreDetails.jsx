import React, { useState } from 'react'
import dayjs from "dayjs";
import './FKTheatreDetails.css'

function FKTheatreDetails({ details = [] }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(details.length / itemsPerPage);

  const paginatedDetails = details.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <div className='theatreResultsDiv'>
        {details.length === 0 ? (
          <p>No shows in current theatre</p>
        ) : (
          paginatedDetails.map((detail, index) => (
            <a
              key={index}
              className="grid-item"
              href={detail.FK_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <p className="title">{detail.title}</p>
              {detail.image && <img src={detail.image} alt={detail.title} />}
              <p>Next show: {dayjs(detail.showing).format('DD.MM.YYYY H:mm')}</p>
            </a>
          ))
        )}
      </div>
      {details.length > itemsPerPage && (
        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <button
            className="pagination-btn"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span style={{ margin: '0 1em' }}>Page {page} / {totalPages}</span>
          <button
            className="pagination-btn"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(FKTheatreDetails)