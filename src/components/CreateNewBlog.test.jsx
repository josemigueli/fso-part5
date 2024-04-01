import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, describe } from 'vitest'
import CreateNewBlog from './CreateNewBlog'
import blogService from '../services/blogs'

describe('<CreateNewBlog />', () => {
    vi.mock('../services/blogs')

    let component

    const helperFunction = () => {
    }

    beforeEach(() => {
        component = render(
            <CreateNewBlog
                updater={helperFunction}
                successMessage={helperFunction}
                errorMessage={helperFunction}    
            />
        )
    })

    test('testing the new blog form', async () => {
        const user = userEvent.setup()
        const theTitle = screen.getByPlaceholderText('Title')
        const theAuthor = screen.getByPlaceholderText('Author')
        const theUrl = screen.getByPlaceholderText('URL')
        const createButton = screen.getByText('Create')

        await user.type(theTitle, 'My awesome blog')
        await user.type(theAuthor, 'John Doe')
        await user.type(theUrl, 'https://theuriofmyblog.com/my-awesome-blog')

        await user.click(createButton)

        // expect(blogService.create).toBeCalledTimes(1)
        expect(blogService.create.mock.calls).toHaveLength(1)
        expect(blogService.create.mock.calls[0][0].title).toBe('My awesome blog')
    })
})