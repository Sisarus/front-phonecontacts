const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
      return null
    }

    if(errorMessage !== null){
      return (
        <div style={errorColor}>
          {errorMessage}
        </div>
      )
    }
  
    return (
      <div style={msgColor}>
        {message}
      </div>
    )
  }

export default Notification

const msgColor = {
  color: 'green',
  fontSize: '1.5rem',
  backgroundColor: '#D3D3D3',
  padding: '1rem',
  border: 'solid green 2px'
}

const errorColor = {
  color: 'red',
  fontSize: '1.5rem',
  backgroundColor: '#D3D3D3',
  padding: '1rem',
  border: 'solid red 2px'
}
