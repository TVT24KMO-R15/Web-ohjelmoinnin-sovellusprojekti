import { React, useState, useEffect } from 'react'
import FavouritesPreview from '../../components/myprofile/FavouritesPreview'
import ReviewsPreview from '../../components/myprofile/ReviewsPreview'
import ProfileInfo from '../../components/myprofile/ProfileInfo'
import MyGroupsPreview from '../../components/myprofile/MyGroupsPreview'
import './MyAccount.css'

import { useUser } from '../../context/UseUser'


export default function MyAccount() {
  const account = useUser()


  return (
    <>
      <div className='accountcontentdiv'>
        <div className='accountcontent'>
          <FavouritesPreview />
        </div>
        <div className='accountcontent'>
          <ReviewsPreview />
        </div>
      
      <div className='accountcontent'>
        <ProfileInfo />
      </div>
      <div className='accountcontent'>
        <MyGroupsPreview />
      </div>
      </div>
    </>
  )
}
