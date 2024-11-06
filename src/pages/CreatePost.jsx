import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/BlogSlice';
import { useNavigate } from 'react-router-dom'; 

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      dispatch(createPost({ title, body }));
      navigate('/'); 
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-center text-blue-900 font-bold text-2xl p-4'>Create New Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Blog Content"
        required
      />
      <button type="submit" className='text-white bg-blue-900 rounded-lg px-4 py-2'>Create Post</button>
    </form>
  );
};

export default CreatePost;
