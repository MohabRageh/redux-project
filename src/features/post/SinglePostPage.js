import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostById } from "./postsSlice";

import { PostAuthor } from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function SinglePostPage() {
    const {postId}=useParams()
    const dispatch =useDispatch()
    const post =useSelector(
        (state)=>getPostById(state,Number(postId)))

    if(!post){
        return(
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }
  return (
    <article >
        <h1 className="editPost"><Link to={`/post/edit/${post.id}`}>...</Link></h1>
        <h1 className="deletePost"><Link to={`/`}><button onClick={()=>dispatch(deletePost({postId}))}>delete</button></Link></h1>
        <h5><PostAuthor userId={post.userId}/></h5>
            <h3>{post.title}</h3>
            <p className="postContent">{post.body}</p>
            <br/>
            <h6><TimeAgo timeStamp={post.date}/></h6>
            <hr/>
            <ReactionButtons post={post}/>
    </article>
  )
}

export default SinglePostPage