import { useState, useEffect } from "react";
import dayjs from "dayjs";

function FKTheatreDetails({ theatreId, startDate, endDate, onSortedChange }) {
  const [details, setDetails] = useState([]);
  const [sortedDetails, setSortedDetails] = useState([]);

  // Fetch data when theatreId changes
  useEffect(() => {
    if (!theatreId) return;

    fetch(`https://www.finnkino.fi/xml/Events/?area=${theatreId}`)
      .then((response) => response.text())
      .then((xml) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "application/xml");
        const shows = xmlDoc.getElementsByTagName("Event");

        const tempDetails = Array.from(shows).map((show) => ({
          image: show.getElementsByTagName("EventSmallImagePortrait")[0]?.textContent || "",
          title: show.getElementsByTagName("OriginalTitle")[0]?.textContent || "",
          year: show.getElementsByTagName("ProductionYear")[0]?.textContent || "",
          rating: show.getElementsByTagName("Rating")[0]?.textContent || "",
          genres: show.getElementsByTagName("Genres")[0]?.textContent || "",
          showing: show.getElementsByTagName("dtLocalRelease")[0]?.textContent || "",
        }));

        setDetails(tempDetails);
        console.log("Fetched details before filtering:", tempDetails);
      })
      .catch((error) => {
        console.error("FKTheatreDetails fetch failed:", error);
      });
  }, [theatreId]);

  // Filter + sort when details or dates change
  useEffect(() => {
    if (!details.length) return;
    console.log("ekan leffan ensi-ilta: ", details[0].showing)

    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const filtered = details.filter((detail) => {
      const showingDate = dayjs(detail.showing);
      const start = dayjs(startDate);
      const end = dayjs(endDate);
    
      
      if (showingDate.isBefore(start, "day")) {
        console.log(`Skipping ${detail.title} because ${showingDate.format("YYYY-MM-DD")} is before start ${start.format("YYYY-MM-DD")}`);
      }
      if (showingDate.isAfter(end, "day")) {
        console.log(`Skipping ${detail.title} because ${showingDate.format("YYYY-MM-DD")} is after end ${end.format("YYYY-MM-DD")}`);
      }
    
      // Filter logic
      return (
        (!startDate || showingDate.isSameOrAfter(start, "day")) &&
        (!endDate || showingDate.isSameOrBefore(end, "day"))
      );
    });
    
    console.log("Filtered results:", filtered);






    //const filtered = details.filter((detail) => {
    //  const showingDate = dayjs(detail.showing);
    //  
    //  return (
    //    (!startDate || showingDate.isSameOrAfter(dayjs(startDate), "day")) &&
    //    (!endDate || showingDate.isSameOrBefore(dayjs(endDate), "day"))
    //  );
    //});


    
    //const filtered = details.filter((detail) => {
    //  const showISO = detail.showing;
    //  console.log("showing date ISOString: ", showISO)
    //  console.log("showing date start: ", start.toISOString())
    //  // Keep only if within start and end
    //  return showISO >= start.toISOString() && showISO <= end.toISOString();
    //});



    //const filtered = details.filter((detail) => {
    //  const showing = detail.showing; // ISO string
    //  console.log("showing date ISOString: ", showing)
    //  console.log("showing date start: ", start.toISOString())
    //  return (
    //    (!start || showing >= start.toISOString()) &&
    //    (!end || showing <= end.toISOString())
    //  );
    //});
    
    
    console.log("päiväformaatti ISOString :", start.toISOString())
    console.log("päiväformaatti ilmankäsittelyä: ", start)
    console.log("proppina saatu startDate: ", startDate)

    const sorted = [...filtered].sort((a, b) =>
      dayjs(a.showing).diff(dayjs(b.showing))
    );
    console.log("Filtered and sorted details:", sorted);

    setSortedDetails(sorted); // <-- update local state for rendering
    if (onSortedChange) {
      onSortedChange(sorted);
    }
  }, [details, startDate, endDate, onSortedChange]);

  return (
    <div>
      {Array.isArray(sortedDetails) && sortedDetails.length > 0 ? (
        sortedDetails.map((detail, index) => (
          <div key={index}>
            <h3>{detail.title}</h3>
            {detail.image && <img src={detail.image} alt={detail.title} />}
            <p>Year: {detail.year}</p>
            <p>Genres: {detail.genres}</p>
            <p>Rating: {detail.rating}</p>
            <p>Release Date: {dayjs(detail.showing).format('DD.MM.YYYY')}</p>
          </div>
        ))
      ) : null}
    </div>
  );
}

export default FKTheatreDetails;