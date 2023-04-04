import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdd } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";


export const AddPostForm = () => {
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [userId,setUserId]=useState("")

    const users=useSelector(selectAllUsers)
    
    const onTitleChanged=e=>setTitle(e.target.value)
    const onContentChanged=e=>setContent(e.target.value)
    const onAuthorChange=e=>setUserId(e.target.value)

    const dispatch=useDispatch()
    console.log(users.length)
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
                if(title&&content&&userId){
                    dispatch(postAdd(title,content,userId))
                    setTitle("")
                    setContent("")
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
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <br/>
                <button type="submit">Save Post</button>
            </form>
    </section>
  )
}

export default AddPostForm