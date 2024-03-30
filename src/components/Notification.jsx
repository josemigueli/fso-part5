const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type === 'error' ? 'notification-error' : 'notification-success'}>
        <h2>
            {message}
        </h2>
      </div>
    )
  }
  
  export default Notification