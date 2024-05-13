import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const FilledButton = ({ value, w,link }) => {
  return (
    <Link to={link}>
    <div
      className={`w-[${w}] h-[40px]  bg-[#FA8232] flex justify-center items-center gap-5 rounded-sm cursor-pointer`}
    >
      <div className='text-[#ffff] font-semibold text-[11px]'>{value}</div>
      {value === 'SIGN IN' && (
        <IoMdArrowForward className='text-[#ffff] text-[15px]' />
      )}
      {value === 'ADD TO CART' && (
        
        <FiShoppingCart className='text-[#ffff] text-[15px]' />
       
      )}
      {value === 'SIGN UP' && (
        <IoMdArrowForward className='text-[#ffff] text-[15px]' />
      )}
      {value === 'VERIFY ME' && (
        <IoMdArrowForward className='text-[#ffff] text-[15px]' />
      )}
      {value === 'RESET PASSWORD' && (
        <IoMdArrowForward className='text-[#ffff] text-[15px]' />
      )}
    </div>
    </Link>
  )
}

export default FilledButton
