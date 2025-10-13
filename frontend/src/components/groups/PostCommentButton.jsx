import { React, useState } from "react"
import './PostComment.css'
import { useUser } from "../../context/UseUser"
import axios from "axios"


export default function PostCommentButton({ postid, reload }) {
    const [commentingOpen, setCommentingOpen] = useState(false)

    const [commentText, setCommentText] = useState('')
    const [postCommentButtonState, setPostCommentButtonState] = useState(true)

    const account = useUser()

    const handleChange = (e) => {
        setCommentText(e.target.value)
        //console.log(commentText)
        if (e.target.value.length > 0) {
            setPostCommentButtonState(false)
        }
        if (e.target.value.length == 0) {
            setPostCommentButtonState(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const address = import.meta.env.VITE_API_URL + `/postcomment/`
            const payload = { postid: postid, text: commentText }
            const headers = { Authorization: `Bearer ${account.user.token}` }

            axios.post(address, payload, { headers })
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    alert(error)
                }).finally(() => {
                    reload()
                    handleCancel()
                })

        } catch (error) {
            alert(error)
        }
    }

    const handleCancel = () => {
        setCommentText('')
        setPostCommentButtonState(true)
        setCommentingOpen(false)
    }



    if (!commentingOpen) {
        return (
            <>
                <button className="commentbutton" onClick={() => { setCommentingOpen(!commentingOpen) }}>Comment</button>
            </>
        )
    }

    if (commentingOpen) {
        return (
            <>
                <form action="submit" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="commentinput"
                        name="commenttext"
                        autoComplete="off"
                        maxLength={255}
                        onChange={handleChange}
                    />

                    <button type="submit" className="commentbutton" disabled={postCommentButtonState}>Post Comment</button>
                    <button className="commentbutton" onClick={() => handleCancel() } >Cancel</button>
                </form>
            </>
        )
    }
}
