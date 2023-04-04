import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    {id:"1",title:"TestTitle1",content:"TestContent1"},
    {id:"2",title:"TestTitle2",content:"TestContent2"}
]

const postsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        postAdd:{
            reducer(state,action){
                //change the state like this works only o createSlice other wise you need to [...state,newItem]
                state.push({id:(state.length+1).toString(),...action.payload})
            },
            prepare(title,content,userId){
                
                return{
                    payload:{
                        userId,
                        title,
                        content
                    }
                }
            }
        }
    }
})

export const {postAdd} = postsSlice.actions
export const selectAllPosts=(state)=>state.posts
export default postsSlice.reducer