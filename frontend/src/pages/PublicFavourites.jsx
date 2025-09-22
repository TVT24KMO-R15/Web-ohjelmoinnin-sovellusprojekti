import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PublicFavourites() {
    const { accountId} = useParams()
  return (
    <div>Public Favourites for user {accountId}</div>
  )
}
