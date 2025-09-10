import React, { useEffect, useState } from 'react'
import './Finnkino.css'

function Finnkinohaku() {
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
  
    return (
      <select>
        {
          areas.map(area => (
            //Warning: Each child in a list should have a unique “key” prop.(( key={area.id}))
            <option key={area.id}>{area.name}</option>
          ))
        }
      </select>
    )
  
}
  
  
  export default function Finnkino() {
    return (
    <div>Finnkinon lista 
      
      <Finnkinohaku />
      

    </div>
  )
}

