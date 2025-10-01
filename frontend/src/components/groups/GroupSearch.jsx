import { useEffect } from 'react'
import { React, useState } from 'react'
import GroupSearchRow from './GroupSearchRow'
import axios from "axios"
import './GroupSearch.css'

export default function GroupSearch() {
    const [searchWord, setSearchWord] = useState('')
    const [searchToggle, setSearchToggle] = useState(false)
    const [groups, setGroups] = useState([1, 2])

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
    console.log('search ' + searchToggle)
    const token = ''
    const address = import.meta.env.VITE_API_URL + `/reviews/all/${searchWord}` //fix
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        url: `${address}`
    }).then(response => {
        console.log(response.data);
        setGroups(response.data)
    });
}, [searchToggle])

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
        <div>
            {groups.map(item =>
                (<GroupSearchRow group={item} key={item.reviewid} />)
            )}


        </div>
    </div>
)
}
