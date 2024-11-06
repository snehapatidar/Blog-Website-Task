import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost, fetchPosts } from '../redux/BlogSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector((state) => state.blog.posts);
    const post = posts.find((p) => p.id === parseInt(id));

    const [title, setTitle] = useState(post ? post.title : '');
    const [body, setBody] = useState(post ? post.body : '');
      const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!post) {
          dispatch(fetchPosts());
        }
        setLoading(false);
      }, [dispatch, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = { id: parseInt(id), title, body };
        
        const result = await dispatch(updatePost(updatedPost));
        
        if (updatePost.fulfilled.match(result)) {
            navigate('/'); 
        } else {
            console.error("Failed to update post:", result.error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return post ? (
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            <h2 className='text-center text-blue-900 font-bold text-2xl p-4'>Edit Post</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className='border rounded-lg p-2 mb-4 w-full'
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                className='border rounded-lg p-2 mb-4 w-full h-[200px]'
            />
            <button type="submit" className='text-white bg-blue-900 rounded-lg px-4 py-2'>Update Post</button>
        </form>
    ) : <div>Post not found.</div>;
};

export default EditPost;

