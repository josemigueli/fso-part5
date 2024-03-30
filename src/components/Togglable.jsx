import { useState, useEffect } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    const hideVisible = { display: visible ? 'none' : ''}
    const showVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                toggleVisibility()
            }, 3000)
        }
    }, [props.hide])

    return (
        <div>
            <div style={hideVisible}>
                <button onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showVisible}>
                {props.children}
                <button onClick={toggleVisibility}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Togglable