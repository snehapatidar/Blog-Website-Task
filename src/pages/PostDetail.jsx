import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/BlogSlice';
import { useParams } from 'react-router-dom';
import Blog from '../assets/blog.png' 

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts);
  const post = posts.find((p) => p.id === Number(id));

  

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    }
  }, [dispatch, post]);

  return post ? (
    <div className=' w-[50%] p-2 background  rounded-xl mt-14 m-10 mx-auto'  >
      <img src ={Blog} className='w-20 h-20 mx-auto'/>
      <h2 className='p-2  text-white'><span className=' text-xl font-semibold  text-white' >Title:</span> {post.title}</h2>
      <p className='p-2  text-white'>{post.body}</p>
    </div>
  ) : <div>Loading...</div>;
};

export default PostDetail;