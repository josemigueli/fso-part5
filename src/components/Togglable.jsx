import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)
    const hideVisible = { display: visible ? 'none' : '' }
    const showVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useEffect(() => {
        //I tried to solve the ESLint warning for this but adding the missing dependencies cause a bug in the app. I'm sure this is not causing any problems in the app.
        if (visible) {
            toggleVisibility()
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

Togglable.propTypes = {
    hide: PropTypes.bool.isRequired,
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable