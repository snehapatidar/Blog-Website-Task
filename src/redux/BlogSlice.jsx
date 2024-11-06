import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('blog/fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createPost = createAsyncThunk('blog/createPost', async (newPost) => {
  const response = await axios.post(API_URL, newPost);
  return response.data;
});

export const updatePost = createAsyncThunk('blog/updatePost', async (post) => {
  const response = await axios.put(`${API_URL}/${post.id}`, post);
  console.log("Updated Post Response:", response.data,post);
  console.log("post is ",post) 
  return post;
});


export const deletePost = createAsyncThunk('blog/deletePost', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchPosts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            console.log('payload',state,action);

             const index = state.posts.findIndex((post) => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        })
      
      
},

});

export default blogSlice.reducer;


