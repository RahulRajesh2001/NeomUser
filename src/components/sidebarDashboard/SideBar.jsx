import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LiaFirstOrder } from "react-icons/lia";
import { IoMdHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";


const SideBar = () => {

  return (
    <div className='w-[200px] h-[500px] flex flex-col items-start justify-center gap-5 shadow-md '>
      
          <Link to={"/dashboard"}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
              <MdDashboard className='font-semibold text-[#5F6C72] text-[25px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                  Dashboard
              </div>
            </div>
          </Link>

          <Link to={"/profile"}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
              <CgProfile  className='font-semibold text-[#5F6C72] text-[25px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                  Profile
              </div>
            </div>
          </Link>

          <Link to={"/orderHistory"}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
              <LiaFirstOrder  className='font-semibold text-[#5F6C72] text-[25px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                  Order History
              </div>
            </div>
          </Link>

          <Link to={"/wishlist"}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
              <IoMdHeart  className='font-semibold text-[#5F6C72] text-[25px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                  Wishlist
              </div>
            </div>
          </Link>

          <Link to={"/cart"}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
              <FaShoppingCart  className='font-semibold text-[#5F6C72] text-[25px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                  Cart
              </div>
            </div>
          </Link>

          <Link to={"/wallet"}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
              <IoWallet className='font-semibold text-[#5F6C72] text-[25px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                  Wallet
              </div>
            </div>
          </Link>

          <Link to={"/logout"}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
              <FiLogOut className='font-semibold text-[#5F6C72] text-[25px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                  Logout
              </div>
            </div>
          </Link>
    </div>
  )
}

export default SideBar
