import React, { useEffect, useState } from 'react'
import './Finnkino.css'
import FKTheatreDetails from './FKTheatreDetails'

function Finnkinohaku( {onTheatreSelect}) {
  const [areas, setAreas] = useState([])
  const getFinnkinoTheaters = (xml) => {
    
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'application/xml')
    //console.log('XXX finnino xmlDoc', xmlDoc)
    const root = xmlDoc.children
    //console.log('XXX finnino root', root)
    const theatres = root[0].children
    //console.log('XXX finnino theatres', theatres)
    const tempAreas = []
    for (let i=0; i<theatres.length; i++) {
        tempAreas.push({id: theatres[i].children[0].innerHTML,
                        name: theatres[i].children[1].innerHTML})
    }
    console.log('XXX finnino tempAreas', tempAreas)
    setAreas(tempAreas)
    //console.log('XXX finnino areas', areas)
  }


  useEffect(() => {
      fetch('https://www.finnkino.fi/xml/TheatreAreas/')
      .then(response => response.text())
      .then(xml => {
        //console.log(xml);
        getFinnkinoTheaters(xml)
      })
      .catch(error => {
        console.error('XXX finnkino fetch fails:', error)
      })

    },[])
  


    //<option value="">Select a theatre</option> Jos tarvii kieliä
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
  
  
  export default function Finnkino() {
    const [selectedTheatre, setSelectedTheatre] = useState(null)
    return (
    <div>
      <p>Finnkinon lista </p>
      
      <Finnkinohaku onTheatreSelect={setSelectedTheatre} />
      <FKTheatreDetails theatreId={selectedTheatre} />
      

    </div>
  )
}

