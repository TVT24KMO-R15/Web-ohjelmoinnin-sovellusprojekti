import React from 'react'
import AccountEmailById from '../common/AccountEmailById'

export default function GroupPost({ GroupPost }) {
    return (
        <div className='grouppostborder'>
            <h4><AccountEmailById property={GroupPost.fk_accountid} /></h4>
            <p>{GroupPost.posttext}</p>
            <div>
                {GroupPost.movieid && <>Add details for movie {GroupPost.movieid}</>}

                {GroupPost.finnkino_original_title && <>Add details for finnkino showtime here for {GroupPost.finnkino_original_title}</>}
            </div>
            <div>
                <p>{GroupPost.postdate.substring(0, 10)}</p>
            </div>
            <div>
                <button>button for commenting</button>
            </div>
            <div className='grouppostcommentborder'>
                <h4>Get comments here!</h4>
            </div>
        </div>
    )
}
