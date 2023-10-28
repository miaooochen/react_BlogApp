import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import { useContext } from 'react';
import  DataContext from './context/DataContext';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const params = useParams() //const {id} = useParams()
  const post = posts.find(post => post.id.toString() === params.id)
  const navigate = useNavigate();
  
  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id)
      setPosts(postList)
      navigate('/')
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  return (
    <main className='PostPage'>
       <article className='post'>
          {post && 
          <> 
            <h2>{post.title}</h2>
            <p className='postDate'>{post.dateTime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className='editButton'>Edit Post</button>
            </Link>
            <button className='deleteButton' onClick={()=>handleDelete(post.id)}>
              Delete Post
            </button>
          </>}
          {!post && 
          <>
            <h2>Page Not Found</h2>
            <Link to='/'>Vist Home Page</Link>
          </>}
       </article>

    </main>
  )
}

export default PostPage