import { useDispatch } from "react-redux";
import { reactionAdd } from "./postsSlice";

const reactionEmo={
    thumbsUp:"👍",
    wow:"😮",
    heart:"❤️",
    rocket:"🚀",
    coffee:"☕",
}


const ReactionButtons = ({post}) => {
    const dispatch=useDispatch()
    /*
        name is the key of reactionEmo
        emoji is the value of the key
    */
    const reactionButtons=Object.entries(reactionEmo).map(([name,emoji])=>{
        return (
            <button
                key={name}
                className="reactionButton"
                onClick={
                    ()=>{
                        dispatch(reactionAdd({postId:post.id,reaction:name}))
                        console.log(post)
                    } 
                }
                >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
  return (
    <div className="reactions">{reactionButtons}</div>
  )
}

export default ReactionButtons

