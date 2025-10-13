import { React, useState, useEffect } from 'react'
import PostCommentButton from './PostCommentButton'
import AccountEmailById from '../common/AccountEmailById'
import { useUser } from '../../context/UseUser'
import axios from 'axios'

export default function PostCommentSection({ GroupPost, isOwner }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAllComments, setShowAllComments] = useState(false)

    const account = useUser()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const address = import.meta.env.VITE_API_URL + `/postcomment/${GroupPost.postid}`
        const headers = { Authorization: `Bearer ${account.user.token}` }
        axios.get(address, { headers })
            .then(response => {
                console.log(response)
                setComments(response.data)
            }).catch(error => {

            }).finally(
                setLoading(false)
            )
    }, [reload])

    const handleDelete = (commentid) => {
        // console.log('delete comment' + commentid)
        if (confirm("Are you sure you want to remove this comment?") == true) {



            const address = import.meta.env.VITE_API_URL + `/postcomment/${commentid}`
            const headers = { Authorization: `Bearer ${account.user.token}` }
            axios.delete(address, { headers })
                .then(response => {
                    //console.log(response)

                    setComments(comments.filter(item => item.comment_id !== commentid))
                }).catch(error => {
                    alert(error)
                })
        }
    }

    if (loading) return (<div>Thinking...</div>)

    return (
        <>
            <div className="grouppostcommentborder">
                <div>


                    {(!showAllComments) ?
                        <>
                            {comments.slice(-1).map(item => (
                                <div className='comment' key={item.comment_id}>
                                    <h4><AccountEmailById property={item.fk_accountid} key={item.fk_accountid} /></h4>
                                    {(account.user.id == item.fk_accountid || isOwner) &&
                                        <button className='deletecommentbutton' onClick={() => { handleDelete(item.comment_id); }}>
                                            Delete Comment</button>}
                                    <p>{item.comment_text}</p>
                                    <h5>{item.comment_date.replaceAll(/[a-z]/gi, ' ').substring(0, 16)}</h5>


                                </div>
                            ))}
                        </>
                        :
                        <>
                            {comments.map(item => (
                                <div className='comment' key={item.comment_id}>
                                    <h4><AccountEmailById property={item.fk_accountid} key={item.fk_accountid} /></h4>
                                    {(account.user.id == item.fk_accountid || isOwner) &&
                                        <button className='deletecommentbutton' onClick={() => { handleDelete(item.comment_id); }}>
                                            Delete Comment</button>}
                                    <p>{item.comment_text}</p>
                                    <h5>{item.comment_date.replaceAll(/[a-z]/gi, ' ').substring(0, 16)}</h5>

                                </div>
                            ))}
                        </>}
                </div>
            </div>
            {((comments.length > 1) && !showAllComments) && <><button className='commentbutton' onClick={() => { setShowAllComments(true) }}>See Full Discussion</button></>}

            <div>
                <PostCommentButton postid={GroupPost.postid} reload={() => { setReload(!reload); setShowAllComments(true) }} />
            </div>
        </>
    )
}
