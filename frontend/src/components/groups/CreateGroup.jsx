import { React, useState } from 'react'
import { useUser } from '../../context/UseUser';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateGroup({ onClose }) {
    const account = useUser()
    const [newGroup, setNewGroup] = useState({ "groupname": '', "groupdescription": '' })
    const [errorMessage, setErrorMessage] = useState('');
    const [countName, setCountName] = useState(0)
    const [countDescription, setCountDescription] = useState(0)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
        if (e.target.name == 'groupname') {
            setCountName(e.target.value.length)
        }
        if (e.target.name == 'groupdescription') {
            setCountDescription(e.target.value.length)
        }
        //console.log(newGroup)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('')

        if (!newGroup.groupname) {
            setErrorMessage('Group name is required.')
            return;
        }

        try {
            const headers = {
                    Authorization: `Bearer ${account.user.token}`
                }
            const payload = {groups: {'groupname': newGroup.groupname, 'groupdescription': newGroup.groupdescription}}
            const url = import.meta.env.VITE_API_URL + `/groups/post`
            //console.log(url)
            //console.log(payload)
            axios.post(url, payload, {headers, withCredentials: true})
                .then(response => {
                    console.log(response.data)

                    if (response.status==201) {
                        alert('Group Created Successfully.')
                        navigate(`/groups/${response.data.groupid}`)
                    }
                }).catch(error => {
                    setErrorMessage('Something went wrong');
                })
        } catch (error) {
            setErrorMessage('Something went wrong');
        }
    }

    return (
        <div className="signin open">
            <form className="auth-modal" onSubmit={handleSubmit}>
                <div className="auth-fields">
                    {errorMessage && (
                        <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
                            {errorMessage}
                        </div>)}

                    <div className="field">
                        <p>Group Name:</p>
                        <input
                            maxLength={32}
                            type="text"
                            name="groupname"
                            value={newGroup.groupname}
                            onChange={handleChange}
                            placeholder="Group Name..."
                        />
                        <p className='charactercount'>{countName} / 32</p>
                    </div>

                    <div className='field'>
                        <p>Description:</p>
                        <textarea
                            maxLength={1000}
                            className='review-input'
                            id='groupdescription'
                            type="text"
                            name='groupdescription'
                            value={newGroup.groupdescription}
                            onChange={handleChange}
                            placeholder='Write a Short Description...'
                        />
                        <p className='charactercount'>{countDescription} / 1000</p>
                    </div>

                </div>
                <button className="auth-submit" type="submit">
                    Create Group
                </button>
                <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </button>
            </form>
        </div>
    )
}
