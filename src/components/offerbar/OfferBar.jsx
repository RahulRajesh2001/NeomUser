import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OfferBar = () => {
  return (
    <div className='w-[100%] h-[60px] bg-[#191C1F] flex justify-around items-center'>
      {/*leftside*/}
      <div className='flex gap-5'>
        <div className='w-[50px] h-[30px] bg-[#F3DE6D] flex justify-center items-center '>
          <div>Black</div>
        </div>
        <div className='text-[#FFFFFF]'>Friday</div>
      </div>
      {/*center*/}
      <div className='flex gap-2 justify-center items-center'>
        <div className='text-[#FFFFFF]'>upto</div>
        <div className='text-[25px] text-[#EBC80C]'>59%</div>
        <div className='text-[#FFFFFF]'>OFF</div>
      </div>
      {/*leftside*/}
      <div>
        <Link to={"/shop"}>
        <div className='w-[100px] h-[30px] bg-[#F3DE6D] flex justify-center items-center gap-2'>
          <div className='text-[12px] font-bold'>SHOP NOW</div>
          <div>
            <FaArrowRight className='text-[10px]' />
          </div>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default OfferBar
