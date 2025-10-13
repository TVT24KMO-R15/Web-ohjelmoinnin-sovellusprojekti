import { React, useState, useEffect } from 'react'
import FavouritesPreview from '../../components/myprofile/FavouritesPreview'
import ReviewsPreview from '../../components/myprofile/ReviewsPreview'
import ProfileInfo from '../../components/myprofile/ProfileInfo'
import MyGroupsPreview from '../../components/myprofile/MyGroupsPreview'
import ProtectedRoute from '../../components/common/ProtectedRoute'
import './MyAccount.css'

import { useUser } from '../../context/UseUser'


export default function MyAccount() {
  const account = useUser()

  return (
    <>
    <ProtectedRoute />
      <div className='myaccountpage'>
        <div className='accountcontentdiv'>
          <div className='accountcontent'>
            <FavouritesPreview />
          </div>
          <div className='accountcontent'>
            <ReviewsPreview />
          </div>


          <div className='accountcontent'>
            <MyGroupsPreview />
          </div>


        </div>
        <div className='accountinfodiv'>
          <div className='accountcontent'>
            <ProfileInfo />
          </div>
        </div>
      </div>
    </>
  )
}
