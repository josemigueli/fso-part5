import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import { beforeEach, expect } from 'vitest'

describe('<Blog />', () => {
    vi.mock('../services/blogs')

    let component
    
    const blog = {
        id: 'a1s2d3f4g5g6',
        title: 'My awesome blog',
        author: 'John Doe',
        url: 'https://theuriofmyblog.com/my-awesome-blog',
        likes: 1,
        user: {
            name: 'Juan Dos',
            username: 'juan_dos'
        }
    }

    const user = {
        username: 'Juan Dos'
    }

    const helperFunction = () => {
    }

    beforeEach(() => {
        component = render(
            <Blog 
                blog={blog} 
                user={user}
                updater={helperFunction}
                successMessage={helperFunction}
                errorMessage={helperFunction}
            />
        )
    })

    test('renders title and author', () => {
        const theTitle = screen.getByText('My awesome blog')
        const theAuthor = screen.getByText(/John Doe/)
        const theUrl = screen.queryByText('https://theuriofmyblog.com/my-awesome-blog')
        const theLikes = screen.queryByText('1')
    
        expect(theTitle).toBeDefined()
        expect(theAuthor).toBeDefined()
    
        expect(theUrl).toBeNull()
        expect(theLikes).toBeNull()
    })

    test('click button to show url and likes', async () => {
        const theUser = userEvent.setup()
        const button = screen.getByText('View')
        await theUser.click(button)
    
        const theUrl = screen.getByText(/https:\/\/theuriofmyblog\.com\/my-awesome-blog/)
        const theLikes = screen.getByText(/1/)
        
        expect(theUrl).toBeDefined()
        expect(theLikes).toBeDefined()
    })

    test('like button cliked twice', async () => {
        const theUser = userEvent.setup()
        const showDetails = screen.getByText('View')
        await theUser.click(showDetails)

        const like = screen.getByText('Like')
        await theUser.click(like)
        await theUser.click(like)

        expect(blogService.update).toBeCalledTimes(2)
    })
})