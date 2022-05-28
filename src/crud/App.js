import logo from '../logo.svg'
import './App.css'
import { useMatch, useState, useEffect } from 'react'
import { useFetch } from './AppFunc'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import ViewPost from './components/ViewPost'
import { Routes, Route, Link } from 'react-router-dom'

export default function App() {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(0);
  useFetch('/posts', null, json => setPosts(json), [update])
  return (
    <div className="content">
      <div className="page">
        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />
          <Route path="/posts/new" element={<AddPost setUpdate={setUpdate} />} />
          <Route path="/posts/:id" element={<ViewPost setUpdate={setUpdate} posts={posts} />} />
        </Routes>
      </div>
    </div>
  );
}
