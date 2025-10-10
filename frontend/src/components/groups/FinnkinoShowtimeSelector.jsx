import React, { useState, useEffect } from 'react'
import './FinnkinoShowtimeSelector.css'

export default function FinnkinoShowtimeSelector({ onShowtimeSelect, isVisible }) {
  const [theatreAreas, setTheatreAreas] = useState([]) // theatre area select options
  const [selectedTheatreArea, setSelectedTheatreArea] = useState('') // selected theatre area id
  const [scheduleDates, setScheduleDates] = useState([]) // available schedule dates for selected theatre area
  const [selectedDate, setSelectedDate] = useState('') // selected schedule date
  const [events, setEvents] = useState([]) // available events for selected area and date
  const [selectedEventId, setSelectedEventId] = useState(null) // selected event id
  const [showtimes, setShowtimes] = useState([]) // available showtimes for selected area, date, and event

  // get all areas when component loads, this is "Theatre area:" dropdown
  useEffect(() => {
    const fetchTheatreAreas = async () => {
      try {
        const res = await fetch('https://www.finnkino.fi/xml/TheatreAreas/')
        const xml = await res.text()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml, 'application/xml')
        const root = xmlDoc.children
        const theatres = root[0].children
        const tempAreas = []
        for (let i = 0; i < theatres.length; i++) {
          tempAreas.push({ 
            id: theatres[i].children[0].innerHTML, 
            name: theatres[i].children[1].innerHTML 
          })
        }
        setTheatreAreas(tempAreas)
      } catch (error) {
        console.error('Failed to fetch theatre areas:', error)
      }
    }
    fetchTheatreAreas()
  }, [])

  // when theatre area changes, fetch available schedule dates for area, this is the "Date:" dropdown
  useEffect(() => {
    console.log("this effect was called")
    if (!selectedTheatreArea) {
      setScheduleDates([])
      setSelectedDate('')
      return
    }

    // get days of movies showing on theatre with selected id
    const fetchScheduleDates = async () => {
      try {
        console.log("fetching schedule dates for area:", selectedTheatreArea)
        const res = await fetch(`https://www.finnkino.fi/xml/ScheduleDates/?area=${selectedTheatreArea}`)
        const xml = await res.text()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml, 'application/xml')
        const root = xmlDoc.children
        const dates = root[0].children
        const tempDates = []
        for (let i = 0; i < dates.length; i++) {
          tempDates.push(dates[i].innerHTML)
        }
        setScheduleDates(tempDates)
      } catch (error) {
        console.error('Failed to fetch schedule dates:', error)
      }
    }
    fetchScheduleDates()
  }, [selectedTheatreArea])

  // when selected theatre and date, get all events, this is "Movie: dropdown"
  useEffect(() => {
    if (!selectedTheatreArea || !selectedDate) {
      setEvents([])
      setSelectedEventId(null)
      return
    }

    const fetchEvents = async () => {
      try {
        const dateObj = new Date(selectedDate)
        const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`
        // console.log("formatted date:", formattedDate)
        // console.log(`getting finnkino schedule for area ${selectedTheatreArea} on date ${formattedDate}`)
        const res = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedTheatreArea}&dt=${formattedDate}`)
        const xml = await res.text()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml, 'application/xml')
        const root = xmlDoc.children
        const shows = root[0].querySelector('Shows')?.children || []
        
        const eventMap = new Map()
        for (let i = 0; i < shows.length; i++) {
          const show = shows[i]
          const eventId = show.querySelector('EventID')?.innerHTML
          const title = show.querySelector('OriginalTitle')?.innerHTML
          const posterUrl = show.querySelector('EventLargeImagePortrait')?.innerHTML
          
          if (eventId && title && !eventMap.has(eventId)) {
            eventMap.set(eventId, { id: eventId, title, posterUrl })
          }
        }
        
        const tempEvents = Array.from(eventMap.values())
        setEvents(tempEvents)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
    }
    fetchEvents()
  }, [selectedTheatreArea, selectedDate])

  // get all showtimes when other dropdowns are selected
  useEffect(() => {
    if (!selectedTheatreArea || !selectedDate || !selectedEventId) {
      setShowtimes([])
      return
    }

    const fetchShowtimes = async () => {
      try {
        const dateObj = new Date(selectedDate)
        const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`
        console.log(`getting showtimes for url https://www.finnkino.fi/xml/Schedule/?area=${selectedTheatreArea}&dt=${formattedDate}&eventID=${selectedEventId}`)
        const res = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedTheatreArea}&dt=${formattedDate}&eventID=${selectedEventId}`)
        const xml = await res.text()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml, 'application/xml')
        const root = xmlDoc.children
        const shows = root[0].querySelector('Shows')?.children || []
        
        const tempShowtimes = []
        for (let i = 0; i < shows.length; i++) {
          const show = shows[i]
          const showId = show.querySelector('ID')?.innerHTML
          const dttmShowStart = show.querySelector('dttmShowStart')?.innerHTML
          const theatre = show.querySelector('Theatre')?.innerHTML
          const originalTitle = show.querySelector('OriginalTitle')?.innerHTML
          const posterUrl = show.querySelector('EventLargeImagePortrait')?.innerHTML
          
          if (showId && dttmShowStart) {
            tempShowtimes.push({
              showId,
              dttmShowStart,
              theatre,
              originalTitle,
              posterUrl,
              displayTime: new Date(dttmShowStart).toLocaleTimeString('en-GB', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            })
          }
        }
        setShowtimes(tempShowtimes)
      } catch (error) {
        console.error('Failed to fetch showtimes:', error)
      }
    }
    fetchShowtimes()
  }, [selectedTheatreArea, selectedDate, selectedEventId])


  // theatre area selector
  const handleTheatreAreaChange = (e) => {
    setSelectedTheatreArea(e.target.value)
    setSelectedDate('')
    setSelectedEventId(null)
  }

  // date dropdown selector
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  // event (movie) dropdown selector
  const handleEventChange = (e) => {
    setSelectedEventId(e.target.value)
  }

  // when pressing "Select Showtime" button
  const handleSelectShowtime = (showtime) => {
    const showtimeDetails = {
      originalTitle: showtime.originalTitle,
      showtime: showtime.dttmShowStart,
      theatreId: parseInt(selectedTheatreArea),
      posterUrl: showtime.posterUrl,
      theatre: showtime.theatre,
      displayTime: showtime.displayTime,
      displayDate: new Date(selectedDate).toLocaleDateString()
    }
    
    onShowtimeSelect(showtimeDetails) // pass details to parent component
    
    // reset the form
    setSelectedTheatreArea('')
    setSelectedDate('')
    setSelectedEventId(null)
    setShowtimes([])
  }

  if (!isVisible) return null

  return (
    <div className="finnkino-section">
      <h3>Select Finnkino Showtime</h3>
      
      <div className="finnkino-dropdowns">

        {/* these are the theatre areas */}
        <div className="dropdown-container">
          <label htmlFor="theatreArea">Theatre Area:</label>
          <select 
            id="theatreArea" 
            value={selectedTheatreArea} 
            onChange={handleTheatreAreaChange}
          >
            <option value="">Choose a theatre...</option>
            {theatreAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* these are the days that movies are showing on theatre x */}
        {selectedTheatreArea && (
          <div className="dropdown-container">
            <label htmlFor="scheduleDate">Date:</label>
            <select 
              id="scheduleDate" 
              value={selectedDate} 
              onChange={handleDateChange}
            >
              <option value="">Choose a date...</option>
              {scheduleDates.map((date, index) => (
                <option key={index} value={date}>
                  {new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* these are the movies from finnkino xml */}
        {selectedTheatreArea && (
          <div className="dropdown-container">
            <label htmlFor="event">Movie:</label>
            <select 
              id="event" 
              value={selectedEventId || ''} 
              onChange={handleEventChange}
            >
              <option value="">Choose a movie...</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* these are the cards that show movie times */}
      {showtimes.length > 0 && (
        <div className="showtimes-list">
          <h4>Available Showtimes:</h4>
          <div className="showtimes-grid">
            {showtimes.map((showtime) => (
              <div key={showtime.showId} className="showtime-item">
                <div className="showtime-time">{showtime.displayTime}</div>
                <button
                  type="button"
                  onClick={() => handleSelectShowtime(showtime)}
                  className="select-showtime-btn"
                >
                  Select Showtime
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedEventId && showtimes.length === 0 && selectedDate && (
        <div className="no-showtimes">
          <p>no showtimes available for this selection</p>
        </div>
      )}

      {selectedEventId && !selectedDate && (
        <div className="selected-event-info">
          <p>please select a date to see available showtimes</p>
        </div>
      )}
    </div>
  )
}
