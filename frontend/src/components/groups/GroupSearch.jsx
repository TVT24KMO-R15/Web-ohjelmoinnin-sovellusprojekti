import { useEffect } from 'react'
import { React, useState } from 'react'
import GroupSearchRow from './GroupSearchRow'

export default function GroupSearch() {
    const [searchWord, setSearchWord] = useState(null)
    const [searchToggle, setSearchToggle] = useState(false)
    const [groups, setGroups] = useState([1,2])

    const handleWordChange = (e) => {
        const word = e.target.value
        setSearchWord(word)
        console.log(searchWord)
    }

    useEffect(() => {
        console.log('search ' + searchToggle)
        //setGroups(searchWord)
    }, [searchToggle])

    return (
        <div>
            <div>
                <input
                    type="text"
                    className='inputField'
                    placeholder='Word Search...'
                    maxLength={20}
                    onChange={handleWordChange}
                />
                <button onClick={() => setSearchToggle(!searchToggle)} id='searchBtn'>Search</button>
            </div>
            <div>
                {groups.map(item =>
                    (<GroupSearchRow group={item} key={item}/>)
                )}
                
                
            </div>
        </div>
    )
}
