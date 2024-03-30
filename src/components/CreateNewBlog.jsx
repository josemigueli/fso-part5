import { useState } from "react";
import blogService from '../services/blogs'
import Notification from "./Notification";

const CreateNewBlog = ({ updater }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [alertMessage, setAlertMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const handleCreateBlog = async (e) => {
        e.preventDefault()
        
        try {
            await blogService.create({
                title, author, url
            })
            setSuccessMessage(`Blog ${title} by ${author} added`)
            updater()
            setTitle('')
            setAuthor('')
            setUrl('')
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        }
        catch (exception){
            setAlertMessage('Something went wrong')
            setTimeout(() => {
                setAlertMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <Notification 
                message={alertMessage}
                type={'error'}
            />
            <Notification
                message={successMessage}
                type={'success'}
            />
            <form onSubmit={handleCreateBlog}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input 
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='author'>Author</label>
                    <input 
                        type='text' 
                        name='author'
                        id='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='url'>Url</label>
                    <input 
                        type='text' 
                        name='url'
                        id='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreateNewBlog