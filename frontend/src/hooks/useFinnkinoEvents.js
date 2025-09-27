import useSWR from 'swr'
import { useMemo } from 'react'
import dayjs from 'dayjs'

const parseFinnkinoEvents = async (url) => {
  const res = await fetch(url)
  const xml = await res.text()
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'application/xml')
  const shows = xmlDoc.getElementsByTagName('Event')
  return Array.from(shows).map((show) => ({
    image: show.getElementsByTagName('EventSmallImagePortrait')[0]?.textContent || '',
    title: show.getElementsByTagName('OriginalTitle')[0]?.textContent || '',
    year: show.getElementsByTagName('ProductionYear')[0]?.textContent || '',
    rating: show.getElementsByTagName('Rating')[0]?.textContent || '',
    genres: show.getElementsByTagName('Genres')[0]?.textContent || '',
    showing: show.getElementsByTagName('dtLocalRelease')[0]?.textContent || '',
  }))
}

export default function useFinnkinoEvents({ theatreId, startDate, endDate }) {
  const { data: rawDetails = [], error, isLoading } = useSWR(
    theatreId ? `https://www.finnkino.fi/xml/Events/?area=${theatreId}` : null,
    parseFinnkinoEvents
  )

  const details = useMemo(() => {
    if (!Array.isArray(rawDetails) || rawDetails.length === 0) return []

    return rawDetails
      .filter((detail) => {
        const showingDate = dayjs(detail.showing)
        const afterStart = !startDate || !showingDate.isBefore(startDate, 'day')
        const beforeEnd = !endDate || !showingDate.isAfter(endDate, 'day')
        return afterStart && beforeEnd
      })
      .sort((a, b) => dayjs(a.showing).diff(dayjs(b.showing)))
  }, [rawDetails, startDate, endDate])

  return { details, isLoading, error }
}
