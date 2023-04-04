import { createSlice } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
const initialState=[
    {   
        id:"1",
        title:"TestTitle1",
        content:"TestContent1",
        date:sub(new Date(),{minutes:10}).toISOString(),
        reactions:{
            thumbsUp:0,
            wow:0,
            heart:0,
            rocket:0,
            coffee:0,
        }
    },
    {   
        id:"2",
        title:"TestTitle2",
        content:"TestContent2",
        date:sub(new Date(),{minutes:5}).toISOString(),
        reactions:{
            thumbsUp:0,
            wow:0,
            heart:0,
            rocket:0,
            coffee:0,
        }
    },
    
]

const postsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        reactionAdd(state,action){
            console.log("action.payload")
            const {postId,reaction}=action.payload
            const post =state.find(post=>post.id===postId)
            //first time to know that you can reach the object keys like that
            post.reactions[reaction]++
        },
        postAdd:{
            reducer(state,action){
                //change the state like this works only o createSlice other wise you need to [...state,newItem]
                state.push({id:(state.length+1).toString(),...action.payload})
            },
            prepare(title,content,userId){
                const date=new Date().toISOString()
                return{
                    payload:{
                        reactions:{
                            thumbsUp:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                            coffee:0,
                        },
                        userId,
                        title,
                        date,
                        content
                    }
                }
            }
        }
    }
})

export const {postAdd,reactionAdd} = postsSlice.actions
export const selectAllPosts=(state)=>state.posts
export default postsSlice.reducer