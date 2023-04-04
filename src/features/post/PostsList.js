import { useSelector } from "react-redux";
import { selectAllPosts} from "./postsSlice";
import { PostAuthor } from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
const PostsList = () => {
    const posts=useSelector(selectAllPosts)      

    /*posts need to be viewed as the newer is up so i did a column reverse in css and it works fine 
    but the next is another way to sort the posts
    
    //we use silce to make a new copy of the array
    orderedposts=posts.slice().sort(
      (a,b)=>b.date.localCompare(a.date)
    )
    */
    const renderPosts=posts.map(post=>(
        <article key={post.id}>
            <h5><PostAuthor userId={post.userId}/></h5>
            <h3>{post.title}</h3>
            <p className="postContent">{post.content.substring(0,100)}</p>
            <br/>
            <h6><TimeAgo timeStamp={post.date}/></h6>
            <hr/>
            <ReactionButtons post={post}/>
        </article>
    ))

  return (
    <>
      <h2 className="postsHeader">Posts</h2>
      <section className="posts">
          {renderPosts}
      </section>
    </>
  )
}

export default PostsList