import React from 'react'

import { useUser } from '../../../context/UseUser'



export default function MyFavouritesComponent() {
    const account = useUser()
    var copyText = `http://localhost:5173/favourites/${account.user.id}`
        

    

    return (
        <>
            <div>MyFavouritesComponent</div>

            <button onClick={() => {navigator.clipboard.writeText(copyText)
                alert("Copied link: " + copyText)}
            }>Share Link</button>
        </>
    )
}
