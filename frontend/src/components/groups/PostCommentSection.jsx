import {React, useState, useEffect} from 'react'
import PostCommentButton from './PostCommentButton'
import AccountEmailById from '../common/AccountEmailById'
import { useUser } from '../../context/UseUser'
import axios from 'axios'

export default function PostCommentSection({ GroupPost }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAllComments, setShowAllComments] = useState(false)
    const account = useUser()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const address = import.meta.env.VITE_API_URL + `/postcomment/${GroupPost.postid}`
        const headers = { Authorization: `Bearer ${account.user.token}` }
        axios.get(address, {headers})
            .then(response => {
                console.log(response)
                setComments(response.data)
            }).catch(error => {
                
            }).finally(
                setLoading(false)
            )
    }, [reload])

    if (loading) return (<div>Thinking...</div>)

    return (
        <>
            <div className="grouppostcommentborder">
                <div>
                    
                    
                    {(!showAllComments) ?
                    <>
                    {comments.slice(-1).map(item =>(
                        <div className='comment' key={item.comment_id}>
                            <h4><AccountEmailById property={item.fk_accountid} key={item.fk_accountid} /></h4>
                            <p>{item.comment_text}</p>
                            <h5>{item.comment_date.replaceAll(/[a-z]/gi, ' ').substring(0, 16)}</h5>
                        </div>
                    )) }
                    </> 
                    : 
                    <>                    
                    {comments.map(item =>(
                        <div className='comment' key={item.comment_id}>
                            <h4><AccountEmailById property={item.fk_accountid} key={item.fk_accountid}/></h4>
                            <p>{item.comment_text}</p>
                            <h5>{item.comment_date.replaceAll(/[a-z]/gi, ' ').substring(0, 16)}</h5>
                        </div>
                    ))}
                    </>}
                </div>
            </div>
                    {((comments.length > 1 ) && !showAllComments) && <><button className='commentbutton' onClick={() => {setShowAllComments(true)}}>See Full Discussion</button></>}

            <div>
                <PostCommentButton postid={GroupPost.postid} reload={() => {setReload(!reload); setShowAllComments(true)}} />
            </div>
        </>
    )
}
