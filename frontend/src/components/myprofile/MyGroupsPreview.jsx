import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../../context/UseUser'
import { Link } from 'react-router-dom'
import MyOwnGroupsPreview from './MyOwnGroupsPreview'


export default function MyGroupsPreview() {
    const [loading, setLoading] = useState(true)
    const account = useUser()
    const [groups, setGroups] = useState([])


    useEffect(() => {
        console.log('getting groups')
        const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/sent/${account.user.id}`
        axios.get(address)
            .then(result => {
                //console.log(result.data)

                if (result.data.result.includes('No pending requests found')) {
                    return
                }
                setGroups(result.data.result.filter((item) => item.status == 'accepted'))
            }) .catch(error =>{
                setGroups([])
            })
            .finally(() =>
            setLoading(false))

    }, [])
    
    if (loading) { return (<div>Loading...</div>) }

    return (

        <div>
            <Link className='popularmovielink' to={'/myaccount/mygroups'}><h2>My Groups</h2></Link>
            <MyOwnGroupsPreview />
            <h4>Other Groups</h4>
            {(groups.length == 0) ? (
                <div>You Don't Have Access To Any Groups</div>
            ):
            <>
            
            {(groups.slice(0,5).map(item => (
                <div className='mygroupspreviewdiv' key={item.groupid}>
                    <Link key={item.groupid} className='popularmovielink' to={`/groups/${item.groupid}`}><h3 key={item.groupname}>{item.groupname}</h3></Link>
                </div>
            )))}
                
            </>}
            <Link to='./mygroups' className='linkseeall'>See all</Link>
        </div>
    )
}
