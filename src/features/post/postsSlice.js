import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import axios from "axios";

const POSTS_URL="https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const updatePost=createAsyncThunk("posts/updatePost",async(initialPost)=>{
    const {id}=initialPost
    try{
        const response=await axios.put(`${POSTS_URL}/${id}`,initialPost)
        return response.data
    }catch (err){
        return err.message
    }
})
export const deletePost=createAsyncThunk("posts/delete",(async({postId})=>{
    
    try{
        const response=await axios.delete(`${POSTS_URL}/${postId}`)
        if(response?.status===200)return postId
        return `${response.status}: ${response.statusText}`
    }catch(err){
        return err.message
    }
}))

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})
export const addNewPost=createAsyncThunk("posts/addNewPost",async(initialPost)=>{
    try{
        
        const response=await axios.post(POSTS_URL,{...initialPost})
        return response.data
    }catch(err){
        return err.message
    }
})
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        reactionAdd(state,action){
            const {postId,reaction}=action.payload
            
            const post =state.posts.find(post=>post.id===postId)
            
            //first time to know that you can reach the object keys like that
            post.reactions[reaction]++
        },
        /* postAdd:{
            reducer(state,action){
                //change the state like this works only o createSlice other wise you need to [...state,newItem]
                state.posts.push({id:(state.posts.length+1).toString(),...action.payload})
            },
            prepare(title,body,userId){
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
                        body
                    }
                }
            }
        } */
    },extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                // Add any fetched posts to the array
                state.posts = loadedPosts
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled,(state,action)=>{
                action.payload.userId=Number(action.payload.userId)
                action.payload.date=new Date().toISOString()
                action.payload.reactions={
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled,(state,action)=>{
                if(!action.payload?.id){
                    return
                }
                const {id}=action.payload
                action.payload.date=new Date().toISOString()
                const posts=state.posts.filter(post=>post.id!==id)
                state.posts=[...posts,action.payload]
            })
            .addCase(deletePost.fulfilled,(state,action)=>{
                
                if(!action.payload){
                    
                    return
                }
                const id=action.payload
                
                const posts=state.posts.filter(post=>post.id!==Number(id))
                state.posts=posts

            })
        }
})

export const {postAdd,reactionAdd} = postsSlice.actions
export const selectAllPosts=(state)=>state.posts.posts
export const getPostsStatus=(state)=>state.posts.status
export const getPostsError=(state)=>state.posts.error
export const getPostById=(state,postId)=>state.posts.posts.find(post=>post.id===postId)
export default postsSlice.reducer