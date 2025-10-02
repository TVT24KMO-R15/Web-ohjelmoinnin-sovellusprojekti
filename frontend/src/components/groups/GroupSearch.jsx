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

    const handleWordChange = (e) => {
        const word = e.target.value
        setSearchWord(word)
        console.log(searchWord)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchToggle(!searchToggle)
    }


useEffect(() => {
    //console.log('search ' + searchToggle)
    const address = (searchWord === '') ? `${import.meta.env.VITE_API_URL}/groups/` : import.meta.env.VITE_API_URL + `/groups/searchword/${searchWord}`
    //console.log(address)
    
    axios.get(address)
        .then(response => {
        console.log(response.data);
        if (response.status == 404) {
            setGroups([])
        } else {
            setGroups(response.data)
        }
        //setGroups(response.data)
    }).catch(error => {
        setGroups([])
    })
    .finally(() => {
        setLoading(false)
    })
    

}, [searchToggle])

if (loading) {return(<div>Loading...</div>)}

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
        {groups.length == 0 ? (<div>No Groups Found</div>): (
        <div>
            {groups.map(item =>
                (<GroupSearchRow group={item} key={item.groupid} />)
            )}


        </div>
        )}
    </div>
)
}
