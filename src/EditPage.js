import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from './api/posts';
import {format} from 'date-fns';
import { useContext } from 'react';
import  DataContext from './context/DataContext';

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    console.log(id, post);
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async(id) => {
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp')
        const updatePost = {id, title: editTitle, dateTime, body: editBody}
        try {
          api.put(`/posts/${id}`, updatePost);
          setPosts(posts.map(post => post.id === id ?  updatePost  : post))
          setEditBody('')
          setEditTitle('')
          navigate('/')
        }catch (err) {
          console.log(`Error:${err.message}`);
        }
      }
    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost