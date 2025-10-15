import { useEffect } from 'react'
import { React, useState } from 'react'
import GroupSearchRow from './GroupSearchRow'
import axios from "axios"
import './GroupSearch.css'


export default function GroupSearch() {
    const [searchWord, setSearchWord] = useState('')
    const [searchToggle, setSearchToggle] = useState(false)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const [groupLimit, setGroupLimit] = useState(5)
    const [moreResultsAvailable, setMoreResultsAvailable] = useState(true)

    const handleWordChange = (e) => {
        const word = e.target.value
        setSearchWord(word)
        console.log(searchWord)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setGroupLimit(5)
        setMoreResultsAvailable(true)
        
        setSearchToggle(!searchToggle)
    }

    const moreResults = () => {
        const newLimit = (groupLimit + 5)
        setGroupLimit(newLimit)
        if (groups.length <= newLimit) {
            setMoreResultsAvailable(false)
        }
    }


    useEffect(() => {
        setGroupLimit(5)
        //console.log('search ' + searchToggle)
        const address = (searchWord === '') ? `${import.meta.env.VITE_API_URL}/groups/` : import.meta.env.VITE_API_URL + `/groups/searchword/${searchWord}`
        //console.log(address)

        axios.get(address, {
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                if (response.status == 404) {
                    setGroups([])
                } else {
                    setGroups(response.data)
                    if (response.data.length < groupLimit) {
                        setMoreResultsAvailable(false)
                    } else {
                        setMoreResultsAvailable(true)
                    }
                }
                //setGroups(response.data)
            }).catch(error => {
                setGroups([])
            })
            .finally(() => {
                setLoading(false)
                
            })


    }, [searchToggle])

    if (loading) { return (<div>Loading...</div>) }

    return (
        <div>
            <div>
                <form>
                    <input
                        type="text"
                        className='inputField'
                        placeholder='Word Search...'
                        maxLength={20}
                        onChange={handleWordChange}
                        onSubmit={handleSearch}
                    />

                    <button onClick={handleSearch} id='searchBtn'>Search</button>
                </form>
                
            </div>
            {groups.length == 0 ? (<div>No Groups Found</div>) : (
                <div>

                    {(groups.slice(0, groupLimit).map(item =>
                        (<GroupSearchRow group={item} key={item.groupid} />)
                    ))}

                    <button className='deletebutton' disabled={!moreResultsAvailable} onClick={moreResults}>Load More Results</button>
                </div>
            )}
        </div>
    )
}
