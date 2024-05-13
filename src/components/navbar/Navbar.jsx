import React, { useState } from 'react'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { FaYoutube } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import NeomIcon from '../neomIcon/NeomIcon'
import { IoIosSearch } from 'react-icons/io'
import { FiShoppingCart } from 'react-icons/fi'
import { CiHeart } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false)

  const token = localStorage.getItem('userToken')

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <div>
        {/*top*/}
        <div className=''>
          <div className='bg-[#1B6392] w-[100%] h-[30px] border-b-[1px] border-[#77878F] flex vvsm:justify-end md:justify-evenly items-center '>
            {/*left*/}
            <div className='text-[#ffff] text-[12px] vvsm:hidden md:block '>
              welcome to NEOM online eCommerce store
            </div>
            {/*right*/}
            <div className='flex gap-5'>
              {/*icons part*/}
              <div className='flex gap-3 justify-center items-center'>
                <div className='text-[#ffff] text-[12px] vvsm:hidden md:block'>Follow us : </div>
                <RiFacebookCircleFill className='text-[#ffff]' />
                <FaYoutube className='text-[#ffff]' />
                <AiFillInstagram className='text-[#ffff]' />
                <FaLinkedin className='text-[#ffff]' />
              </div>
              <div className='bg-[#77878F] h-[20px] w-[1px]'></div>
            </div>
          </div>
        </div>

        {/*bottom*/}
        <div className='bg-[#1B6392] w-[100%] h-[60px] flex justify-between  items-center'>
          {/*bottom_left*/}
          <div className='flex items-center gap-2 vvsm:ml-10 md:ml-32'>
            <Link to='/shop'>
              <div>
                <NeomIcon />
              </div>
            </Link>
          </div>
          {/*bottom_center*/}

          {/*bottom_right*/}
          <div className='flex vvsm:gap-2 sm:gap-5 justify-items-center items-center vvsm:mr-10 md:mr-32'>
            <Link to='/cart'>
              <FiShoppingCart className='text-[#ffff] text-[15px] hover:cursor-pointer' />
            </Link>
            <Link to={"/wishlist"}>
            <CiHeart className='text-[#ffff] text-[20px] hover:cursor-pointer' />
            </Link>
            <Link to={token ? '/profile' : '/loginSignup'}>
              <IoPersonOutline
                className='text-[#ffff] text-[16px] hover:cursor-pointer'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
