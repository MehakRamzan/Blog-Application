

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
