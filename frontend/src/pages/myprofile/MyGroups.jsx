import { React, useState, useEffect } from 'react'
import GoToGroupPageButton from '../../components/groups/GoToGroupPageButton'
import { Link } from 'react-router-dom'

import { useUser } from '../../context/UseUser'
import axios from 'axios'


export default function MyGroups() {
    const [loading, setLoading] = useState(true)
    const [groups, setGroups] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const account = useUser()


    useEffect(() => {
        console.log('get pending requests')
        const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/sent/${account.user.id}`
        axios.get(address)
            .then(result => {
                //console.log(result.data)

                if (result.data.result.includes('No pending requests found')) {
                    return
                }
                setGroups(result.data.result.filter((item) => item.status == 'accepted'))
                setPendingRequests(result.data.result.filter((item) => item.status == 'pending'))
            }) .catch(error =>{
                setGroups([])
                setPendingRequests([])
            })
            .finally(() =>
            setLoading(false))
    }, [])

    if (loading) { return (<div>Loading...</div>) }

    if (groups.length == 0 && pendingRequests.length == 0) {
        return (<div>
            <h2>Why is it so empty here?</h2>
            <h3>Go to <Link to={'/groups'}>Groups</Link> to get started!</h3>
        </div>)
    }

    return (
        <div>
            {(groups.length != 0) ?
                <div>
                    <h2>My Groups</h2>
                    {groups.map(item => (
                        <div className='reviewborder' key={item.groupid}>
                            <Link className='popularmovielink' to={`/groups/${item.groupid}`}><h3>{item.groupname}</h3></Link>
                            
                        </div>
                    ))}
                </div> :
                <></>
            }

            {(pendingRequests.length != 0) ?
                <div>
                    <h2>Join Requests</h2>
                    {pendingRequests.map(item => (
                        <div className='reviewborder' key={item.groupid}>
                            <h3>{item.groupname}</h3>
                            <GoToGroupPageButton groupid={item.groupid} />
                        </div>
                    ))}
                </div> :
                <></>
            }


        </div>
    )
}
