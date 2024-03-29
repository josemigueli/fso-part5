import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user)) 
      // console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      // console.log(exception)
      setAlertMessage('Invalid username or password')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>Username</label>
        <input 
          type='text'
          value={username}
          name='Username'
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input 
          type='password' 
          value={password}
          name='Password'
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <h1>Blog List App</h1>
      <Notification message={alertMessage}/>

      {user === null ?
        <>
          <h2>Login to the application</h2>
          {loginForm()}
        </>
      :
      <>
        <h2>Blogs</h2>
        <p>{user.username} logged in <button onClick={handleLogout}>Logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
      }
    </div>
  )
}

export default App