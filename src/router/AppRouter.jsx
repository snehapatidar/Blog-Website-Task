import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoaderSpinner from '../components/LoadingSpinner';
import React, { Suspense, lazy } from 'react';

const BlogList = lazy(() => delayForDemo(import('../components/BlogList')));
const CreatePost = lazy(() => delayForDemo(import('../pages/CreatePost')));
const EditPost = lazy(() => delayForDemo(import('../pages/EditPost')));
const PostDetail = lazy(() => delayForDemo(import('../pages/PostDetail')));

// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

const AppRouter = () => {

  return (
    <Router>
        <Header/>
        <Suspense fallback={<LoaderSpinner/>}> 
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Suspense>
      <Footer/>
   </Router>
  );
};

export default AppRouter;
