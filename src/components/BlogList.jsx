import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/BlogSlice';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import Blog from '../assets/blog.png'
import { motion } from "framer-motion";


const BlogList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPosts());
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    if (posts.length === 0) {
      fetchData();

    }
  }, [dispatch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const textVariant = (delay) => {
    return {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay: delay,
        },
      },
    };
  };


  return (
    <div>
      <motion.h2 initial="hidden"
        animate="show"
        exit="hidden"
        variants={textVariant()} className='text-center text-blue-900 font-bold text-2xl p-4'>Blog Posts</motion.h2>

      <Link to="/create" className='  hover:bg-blue-400 hover:text-white hover:border-2 hover:border-white text-center text-blue-900 font-semibold text-xl p-4 cursor-pointer border-2 border-blue-900 rounded-xl mt-14 m-10'>
        Create New Blog
      </Link>

      <motion.div className='mt-6'>

        <ul className='  p-4 grid grid-cols-3 gap-4 w-[100%]  '>

          {currentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className='p-4 background h-[250px] rounded-lg hover:-translate-y-1 hover:scale-105  duration-300 transition ease-in-out'

            >
              <img src={Blog} className='w-14 h-14 mx-auto' />

              <li className='h-[100px] text-white'>
                <Link to={`/post/${post.id}`}>
                  {`${indexOfFirstPost + index + 1}. ${post.title}`}
                </Link>
              </li>
              <div className='flex justify-center gap-4'>
                <Link
                  to={`/edit/${post.id}`}

                  className='hover:bg-green-400 text-white border-2 boredr-white rounded-2xl px-4 p-0 sm:px-3 sm:py-1 sm:text-sm md:px-5 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg transition-all duration-300 ease-in-out'>
                  Edit
                </Link>

                <button
                  onClick={() => dispatch(deletePost(post.id))}
                  className='hover:bg-red-400 text-white border-2 boredr-white rounded-2xl px-4 p-0 sm:px-3 sm:py-1 sm:text-sm md:px-5 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg transition-all duration-300 ease-in-out'>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </ul>

        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />
      </motion.div>
    </div>
  );
};

export default BlogList;


