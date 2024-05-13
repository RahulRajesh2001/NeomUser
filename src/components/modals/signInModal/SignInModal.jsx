import React from 'react'
import ReactDOM from 'react-dom';

const SignInModal = ({isHovered}) => {
    console.log("i am form modal",isHovered)
  return ReactDOM.createPortal (
    <>
      {isHovered ? <div className='bg-red-500 w-[200px] h-[300px] '></div>:<h1>no modal</h1>}
    </>
  ,
  document.getElementById('portal')
  )
}

export default SignInModal