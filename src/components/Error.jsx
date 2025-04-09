import React from 'react'

const Error = ({title,message,onConfirm}) => {
  return (
    <>
      <div className='error'>
        <h2>{title}</h2>
        <p>{message}</p>
        {onConfirm &&(
            <div id="confirmation-action">
                <button onClick={onConfirm} className='button'>Okey</button>
            </div>
        )}
      </div>
    </>
  )
}

export default Error
