import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";


export const PostAuthor = ({userId}) => {
    const users =useSelector(selectAllUsers)
    
    const author=users.find(user=>Number(user.id)===Number(userId))
    
  return (
    <span>{author?author.name:"unknown"}</span>
  )
}
