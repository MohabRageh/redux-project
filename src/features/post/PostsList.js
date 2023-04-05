import { useSelector } from "react-redux";
import { selectAllPosts,getPostsError,getPostsStatus} from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";

import PostsExcerpt from "./PostsExcerpt";


const PostsList = () => {
    const posts=useSelector(selectAllPosts)  
    const postsStatus=useSelector(getPostsStatus)
    const postsError=useSelector(getPostsError)
    let content
    if(postsStatus==="loading"){
      
      content=<p>Loading</p>
    }else if(postsStatus==="succeeded"){
      content=posts.map(post=><PostsExcerpt key={nanoid()} post={post}/>)
    }else if(postsStatus==="failed"){
      content=<p>{postsError}</p>
    }
    
    /*posts need to be viewed as the newer is up so i did a column reverse in css and it works fine 
    but the next is another way to sort the posts
    
    //we use silce to make a new copy of the array
    orderedposts=posts.slice().sort(
      (a,b)=>b.date.localCompare(a.date)
    )
    */
    
      
  return (
    <>
      <section className="posts">
          {content}
      </section>
    </>
  )
}

export default PostsList