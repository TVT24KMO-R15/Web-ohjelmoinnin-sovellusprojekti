import React from 'react'
import FavouritesPreview from '../../components/myprofile/FavouritesPreview'
import ReviewsPreview from '../../components/myprofile/ReviewsPreview'
import ProfileInfo from '../../components/myprofile/ProfileInfo'


export default function MyAccount() {
  return (
    <>
      <div className='contentdiv'>
        <FavouritesPreview />
        <ReviewsPreview />
      </div>
      <div className='infodiv'>
        <ProfileInfo />
      </div>
    </>
  )
}
