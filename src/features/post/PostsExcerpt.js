import React from 'react'
import { PostAuthor } from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
const PostsExcerpt = ({post}) => {

  return (
    <article>
            <h5><PostAuthor userId={post.userId}/></h5>
            <h3>{post.title}</h3>
            <p className="postContent">{post.body.substring(0,100)}</p>
            <br/>
            <h6><TimeAgo timeStamp={post.date}/></h6>
            <hr/>
            <ReactionButtons post={post}/>
    </article>
  )
}

export default PostsExcerpt