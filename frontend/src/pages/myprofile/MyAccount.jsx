import { React, useState, useEffect } from 'react'
import FavouritesPreview from '../../components/myprofile/FavouritesPreview'
import ReviewsPreview from '../../components/myprofile/ReviewsPreview'
import ProfileInfo from '../../components/myprofile/ProfileInfo'
import './MyAccount.css'

import { useUser } from '../../context/UseUser'


export default function MyAccount() {
  const account = useUser()


  return (
    <>
      <div className='accountcontentdiv'>
        <FavouritesPreview />
        <ReviewsPreview />
      </div>
      <div className='accountinfodiv'>
        <ProfileInfo />
      </div>
    </>
  )
}
