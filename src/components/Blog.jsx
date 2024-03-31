import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, updater, successMessage, errorMessage }) => {
  const blogStyle = {
    marginBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWitdth: 1,
    borderColor: '#000',
  }
  const [showDetails, setShowDetails] = useState(false)
  const [liked, setLiked] = useState(undefined)
  const [blogData, setBlogData] = useState({
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  })
  const { title, author, url, likes, id } = blogData

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const updateLikes = async () => {
    try {
      const newLikes = likes + 1
      const response = await blogService.update({ 
        title, author, url, likes: newLikes, id
      })
      if (response) {
        setBlogData({ ...blogData, likes: likes + 1 })
        setLiked('Liked!')
        setTimeout(() => {
          setLiked(undefined)
        }, 3000)
      }
    }
    catch (exception) {
      setLiked('Something went wrong')
      setTimeout(() => {
        setLiked(undefined)
      }, 3000)
    }
  }

  const showLikedMessage = (message) => (
    <span>{message}</span>
  )

  const deleteBlog = async () => {
    if (!window.confirm(`Delete blog ${title} by ${author}`)) {
      return
    }
    try {
      const response = await blogService.deleteOne(id)
      if (response.status === 204) {
        updater()
        successMessage(`Blog ${title} by ${author} deleted`)
      }
    }
    catch {
      errorMessage()
    }
  }

  return (
    <div style={blogStyle}>
      <p>
        <b>{title}</b> by {author} 
        <button onClick={handleShowDetails}>{showDetails ? 'Hide' : 'View'}</button>
      </p>
      {showDetails ?
      <p>
        <b>URL:</b> {url} 
        <br/>
        <b>Likes:</b> {likes} 
        <span><button onClick={updateLikes}>Like</button></span>
        {liked === undefined ? null : showLikedMessage(liked)}
        <br />
        <b>Added by:</b> {blog.user.name}
        <br />
        {user.username === blog.user.username ? 
        <span>
          <button onClick={deleteBlog}>Delete</button>
        </span>
        : 
        null}
      </p>
      :
      null
      }
    </div>
  )
}

export default Blog