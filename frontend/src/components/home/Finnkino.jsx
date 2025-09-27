import React, { useState } from 'react'
import useSWR from 'swr'
import './Finnkino.css'
import FKTheatreDetails from './FKTheatreDetails'

const fetcherText = async (url) => {
  const res = await fetch(url)
  const xml = await res.text()
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'application/xml')
  const root = xmlDoc.children
  const theatres = root[0].children
  const tempAreas = []
  for (let i = 0; i < theatres.length; i++) {
    tempAreas.push({ id: theatres[i].children[0].innerHTML, name: theatres[i].children[1].innerHTML })
  }
  return tempAreas
}

function Finnkinohaku({ onTheatreSelect }) {
  const { data: areas = [], isLoading, error } = useSWR('https://www.finnkino.fi/xml/TheatreAreas/', fetcherText)

  if (error) {
    console.error('XXX finnkino fetch fails:', error)
  }

  return (
    <select onChange={(e) => onTheatreSelect(e.target.value)}>
      {areas.map((area) => (
        <option key={area.id} value={area.id}>
          {area.name}
        </option>
      ))}
    </select>
  )
}

export default function Finnkino({ setSelectedTheatreId }) {
  return (
    <div>
      <p>Finnkinon lista </p>
      <Finnkinohaku onTheatreSelect={setSelectedTheatreId} />
    </div>
  )
}
