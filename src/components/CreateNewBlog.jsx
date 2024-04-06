import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ updater, successMessage, errorMessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (e) => {
        e.preventDefault()

        try {
            await blogService.create({
                title, author, url
            })
            updater()
            setTitle('')
            setAuthor('')
            setUrl('')
            successMessage(`Blog ${title} by ${author} added`)
        }
        catch (exception){
            errorMessage()
        }
    }

    return (
        <div>
            <form onSubmit={handleCreateBlog}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        placeholder='Title'
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
                        placeholder='Author'
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
                        placeholder='URL'
                        name='url'
                        id='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id='save-blog-button' type='submit'>Create</button>
            </form>
        </div>
    )
}

CreateNewBlog.propTypes = {
    updater: PropTypes.func.isRequired,
    successMessage: PropTypes.func.isRequired,
    errorMessage: PropTypes.func.isRequired
}

export default CreateNewBlog