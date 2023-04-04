import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";


export const AddPostForm = () => {
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [userId,setUserId]=useState("")
    const [addRequestStatus,setAddRequestStatus]=useState("idle")
    const users=useSelector(selectAllUsers)
    
    const onTitleChanged=e=>setTitle(e.target.value)
    const onBodyChanged=e=>setBody(e.target.value)
    const onAuthorChange=e=>setUserId(e.target.value)
    
    const dispatch=useDispatch()
    
    const usersOptions=users.map(user=>(
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
  return (
    <section>
            <h2>Add a New Post</h2>
            <form onSubmit={(e)=>{
                e.preventDefault()
                
                try{
                    setAddRequestStatus("pending")
                    dispatch(addNewPost({title,body,userId}))
                    setTitle("")
                    setBody("")
                }catch(err){

                }finally{
                    setAddRequestStatus("idle")
                }
                }}>
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {usersOptions}
                </select>
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
                <button type="submit" disabled={(addRequestStatus==="idle"&&title&&body&&userId)?false:true}>Save Post</button>
            </form>
    </section>
  )
}

export default AddPostForm