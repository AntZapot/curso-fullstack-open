import React from 'react'

const Notification = ({ classes, message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={classes}>
            {message}
        </div>
    )
}

export default Notification
