import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

export default function SingleMovie() {
    const { movieId } = useParams()
  return (
    <div>Elokuvan { movieId } sivu</div>
  )
}
