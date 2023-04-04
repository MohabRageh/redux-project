import React from 'react'
import { PostAuthor } from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';
const PostsExcerpt = ({post}) => {

  return (
    <article>
            <h5><PostAuthor userId={post.userId}/></h5>
            <h3>{post.title}</h3>
            <p className="postContent">{post.body.substring(0,75)}...</p>
            <Link to={`post/${post.id}`}>View post</Link>
            <br/>
            <h6><TimeAgo timeStamp={post.date}/></h6>
            <hr/>
            <ReactionButtons post={post}/>
    </article>
  )
}

export default PostsExcerpt