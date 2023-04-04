import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getPostById,updatePost } from "./postsSlice";
import { useParams,useNavigate } from "react-router-dom";

import React from 'react'

export default function EditPost() {
    const {postId}=useParams()
    console.log(postId)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const post=useSelector((state)=>getPostById(state,Number(postId)))

    const [title,setTitle]=useState(post.title)
    const [body,setBody]=useState(post.body)
    const [userId,setUserId]=useState(post.userId)
    const [requestState,setRequestState]=useState("idle")

    const onTitleChanged=e=>setTitle(e.target.value)
    const onBodyChanged=e=>setBody(e.target.value)

  return (
    <section>
            <h2>EditPost</h2>
            <form onSubmit={(e)=>{
                e.preventDefault()
                console.log(title,body,userId)
                try{
                    setRequestState("pending")
                    dispatch(updatePost({id:post.id,title,body,userId,reactions:post.reactions}))
                    setTitle("")
                    setBody("")
                    setUserId("")
                    navigate(`/post/${postId}`)
                }catch(err){
                }finally{
                    setRequestState("idle")
                }
                }}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <br/>
                <label htmlFor="postBody">Post Body:</label>
                <textarea
                    id="postContent"
                    name="postBody"
                    value={body}
                    onChange={onBodyChanged}
                />
                <br/>
                <button type="submit" disabled={(requestState==="idle"&&title&&body&&userId)?false:true}>Save Post</button>
            </form>
    </section>
  )
}
