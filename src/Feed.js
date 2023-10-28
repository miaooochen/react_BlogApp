import React from 'react'
import { Link } from 'react-router-dom'

const Feed = ({posts}) => {
  return (
    <>
        {posts.map( post => 
            (<article className='post'>
                <Link to={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p className='postDate'>{post.dateTime}</p>
                    <p className='postBody'>
                        {post.body.length <= 25 ? post.body : `${post.body.slice(0,25)}...`}
                    </p>
                </Link>
        </article>)
        )}
    </>
  )
}

export default Feed