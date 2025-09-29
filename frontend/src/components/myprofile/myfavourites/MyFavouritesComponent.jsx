import React from 'react'

import { useUser } from '../../../context/UseUser'



export default function MyFavouritesComponent() {
    const account = useUser()
    var copyText = `${window.location.origin}/favourites/${account.user.id}`
        

    

    return (
        <>
            <div>MyFavouritesComponent</div>

            <button onClick={() => {navigator.clipboard.writeText(copyText)
                alert("Copied link: " + copyText)}
            }>Share Link</button>
        </>
    )
}
