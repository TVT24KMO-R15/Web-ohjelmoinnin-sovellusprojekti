import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const parseFinnkinoEvents = async (url) => {
  const res = await fetch(url);
  const xml = await res.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'application/xml');
  const shows = xmlDoc.getElementsByTagName('Show');
  return Array.from(shows).map((show) => ({
    title: show.getElementsByTagName('OriginalTitle')[0]?.textContent || '',
    image: show.getElementsByTagName('EventSmallImagePortrait')[0]?.textContent || '',
    year: show.getElementsByTagName('ProductionYear')[0]?.textContent || '',
    rating: show.getElementsByTagName('Rating')[0]?.textContent || '',
    genres: show.getElementsByTagName('Genres')[0]?.textContent || '',
    showing: show.getElementsByTagName('dttmShowStart')[0]?.textContent || '',
    FK_URL: show.getElementsByTagName('EventURL')[0]?.textContent || '',
  }));
};

export default function useFinnkinoEvents({ theatreId, startDate, endDate }) {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!theatreId || !startDate || !endDate) {
      setDetails([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchAllDates = async () => {
      const results = [];
      let currentDate = dayjs(startDate);
      console.log("Starting fetchAllDates with id:", theatreId, "from", startDate, "to", endDate)

      while (currentDate.isSameOrBefore(endDate, 'day')) {
        const url = `https://www.finnkino.fi/xml/Schedule/?area=${theatreId}&dt=${currentDate.format('DD.MM.YYYY')}`;
        console.log("Fetching URL:", url)
        try {
          const dayResults = await parseFinnkinoEvents(url);
          results.push(...dayResults);
        } catch (err) {
          setError(err);
          break;
        }
        currentDate = currentDate.add(1, 'day');
      }

      setDetails(results);
      setIsLoading(false);
    };

    fetchAllDates();
  }, [theatreId, startDate, endDate]);

  return { details, isLoading, error };
}