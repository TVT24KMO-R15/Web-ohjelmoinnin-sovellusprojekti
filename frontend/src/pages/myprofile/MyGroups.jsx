import { React, useState, useEffect } from 'react'
import GoToGroupPageButton from '../../components/groups/GoToGroupPageButton'
import { Link } from 'react-router-dom'
import MyOwnGroups from '../../components/myprofile/MyOwnGroups'
import CreateGroup from '../../components/groups/CreateGroup'

import ProtectedRoute from '../../components/common/ProtectedRoute'

import { useUser } from '../../context/UseUser'
import axios from 'axios'


export default function MyGroups() {
    const [loading, setLoading] = useState(true)
    const [groups, setGroups] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const account = useUser()
    const [createGroupOpen, setCreateGroupOpen] = useState(false)
    const headers = { Authorization: `Bearer ${account.user.token}` };


    useEffect(() => {
        console.log('get pending requests')
        const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/sent/${account.user.id}`
        axios.get(address, { headers })
            .then(result => {
                //console.log(result.data)

                if (result.data.result.includes('No pending requests found')) {
                    return
                }
                setGroups(result.data.result.filter((item) => item.status == 'accepted'))
                setPendingRequests(result.data.result.filter((item) => item.status == 'pending'))
            }).catch(error => {
                setGroups([])
                setPendingRequests([])
            })
            .finally(() =>
                setLoading(false))
    }, [])

    if (loading) { return (<div><ProtectedRoute />Loading...</div>) }

    

    return (

        <div className='mygroupsdiv'><ProtectedRoute />
            <div className='creategroupdiv'><button id='searchBtn' onClick={() => { setCreateGroupOpen(true) }}>Create a New Group</button></div>
            {(createGroupOpen) && <><CreateGroup onClose={() => setCreateGroupOpen(false)} /></>}
            <div>
                <h2>My Own Groups</h2>
                <MyOwnGroups />
            </div>
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
                            <GoToGroupPageButton group={item} />
                        </div>
                    ))}
                </div> :
                <>
                    <h2>Join Requests</h2>
                    <h3>Go to <Link to={'/groups'} className='gotogroupslink'>Groups</Link> to send requests!</h3>
                </>
            }


        </div>
    )
}
