const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        <h2>
            {message}
        </h2>
      </div>
    )
  }
  
  export default Notification