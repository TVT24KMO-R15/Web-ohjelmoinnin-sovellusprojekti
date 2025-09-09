import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Group() {
    // const [ group, setGroup ] = useState([])
    const { groupId } = useParams()

    return (
        <div>Ryhmän { groupId } sivu</div>
  )
}
