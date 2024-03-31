import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateNewBlog from './components/CreateNewBlog'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [alerErrortMessage, setAlerErrortMessage] = useState(null)
    const [alertSuccessMessage, setAlertSuccessMessage] = useState(null)
    const [updateList, setUpdateList] = useState(true)
    const [hideBlogForm, setHideBlogForm] = useState(false)

    const successMessage = (message) => {
        setAlertSuccessMessage(message)
        setTimeout(() => {
            setAlertSuccessMessage(null)
        }, 3000)
    }

    const errorMessage = (message) => {
        setAlerErrortMessage(message)
        setTimeout(() => {
            setAlerErrortMessage(null)
        }, 3000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            errorMessage('Invalid username or password')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const updateAndHide = () => {
        setUpdateList(!updateList)
        setHideBlogForm(!hideBlogForm)
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
        (async () => {
            const getBlogs = await blogService.getAll()
            getBlogs.sort((a,b) => b.likes - a.likes)
            setBlogs(getBlogs)
        })()
    }, [updateList])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <h1>Blog List App</h1>
            <Notification
                message={alerErrortMessage}
                type={'error'}
            />

            <Notification
                message={alertSuccessMessage}
                type={'success'}
            />

            {user === null ?
                <>
                    <h2>Login to the application</h2>
                    {loginForm()}
                </>
                :
                <>
                    <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

                    <Togglable buttonLabel='Create blog' hide={hideBlogForm}>
                        <h2>Create new blog</h2>
                        <CreateNewBlog
                            updater={updateAndHide}
                            successMessage={(message) => successMessage(message)}
                            errorMessage={() => errorMessage('Something went wrong')}
                        />
                    </Togglable>

                    <h2>Blogs</h2>
                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            updater={() => setUpdateList(!updateList)}
                            successMessage={(message) => successMessage(message)}
                            errorMessage={() => errorMessage('Something went wrong')}
                        />
                    )}
                </>
            }
        </div>
    )
}

export default App