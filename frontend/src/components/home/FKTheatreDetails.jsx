import { useState, useEffect } from 'react'

function FKTheatreDetails({ theatreId }) {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (!theatreId) return;
        console.log('YYY FK fetching details for theatreId:', theatreId);

        fetch('https://www.finnkino.fi/xml/Events/?area=' + theatreId)
        .then((response) => response.text())
        .then((xml) => {
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(xml, 'application/xml')
            const shows = xmlDoc.getElementsByTagName('Event')
            const tempDetails = Array.from(shows).map((show) => ({
                image: show.getElementsByTagName('EventSmallImagePortrait')[0]?.textContent || '',
                title: show.getElementsByTagName('Title')[0]?.textContent || '',
                year: show.getElementsByTagName('ProductionYear')[0]?.textContent || '',
                rating: show.getElementsByTagName('Rating')[0]?.textContent || '',
                genres: show.getElementsByTagName('Genres')[0]?.textContent || '',
                showing: show.getElementsByTagName('dtLocalRelease')[0]?.textContent || ''
                
            }));
            console.log('YYY FK tempdetails', tempDetails)
            setDetails(tempDetails)
        })
        .catch((error) => {
            console.error('YYY FK fetch FAILS:', error)    
        })
    }, [theatreId]);

    const sortedDetails = details ? [...details].sort((a, b) => a.showing.localeCompare(b.showing)) : [];
    
    return (
        <div>
            {details ? (
                sortedDetails.map((detail, index) => (
                    <div key={index}>
                        <h3>{detail.title}</h3>
                        <img src={detail.image} alt={detail.title} />
                        <p>Vuosi: {detail.year}</p>                        
                        <p>Genres: {detail.genres}</p>
                        <p>Ikäraja: {detail.rating}</p>
                        <p>Ensi-ilta: {new Date(detail.showing).toLocaleDateString('fi-FI')}</p>
                        
                    </div>
                ))
            ) : null
                
            }
        </div>
    );
    

}
export default FKTheatreDetails