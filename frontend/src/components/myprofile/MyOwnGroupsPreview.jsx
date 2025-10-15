import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../../context/UseUser'
import { Link } from 'react-router-dom'

export default function MyOwnGroupsPreview() {
    const [loading, setLoading] = useState(true)
    const account = useUser()
    const [groups, setGroups] = useState([])

    useEffect(() => {
        console.log('getting own groups')
        const address = import.meta.env.VITE_API_URL + `/groups/owner/${account.user.id}`
        axios.get(address, {
            withCredentials: true
        })
            .then(result => {
                console.log(result.data)

                if (result.data.includes('No groups found')) {
                    return
                }
                setGroups(result.data)
            }).catch(error => {
                setGroups([])
            })
            .finally(() =>
                setLoading(false))

    }, [])

    if (loading) { return (<div>Loading...</div>) }
    return (
        <div>
            <h4>Your Own Groups</h4>
            {(groups.length == 0) ? (
                <p>No Groups You Own</p>
            ) :
                <>

                    <div className='mygroupspreviewdiv'>


                        {(groups.slice(0, 5).map(item => (
                            <div key={item.groupid}>
                                <Link key={item.groupid} className='popularmovielink' to={`/groups/${item.groupid}`}><h3 key={item.groupname}>{item.groupname}</h3></Link>
                            </div>

                        )))}
                    </div>
                </>}
        </div>
    )
}
