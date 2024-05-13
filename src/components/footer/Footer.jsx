import React from 'react'
import NeomIcon from '../neomIcon/NeomIcon'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { FaApple } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='h-[200px] bg-[#191C1F] flex justify-evenly items-center'>
      {/*first part*/}
      <div className='flex flex-col justify-center items-start gap-1'>
        <NeomIcon />
        <div className='text-[#77878F] text-[10px]'>Customer Supports:</div>
        <div className='text-[#ffff]  text-[12px]'>+91 7510329871</div>
        <div className='text-[#77878F]  text-[10px]'>Trivandrum</div>
        <div className='text-[#77878F]  text-[10px]'>Kazhakoottam</div>
        <div className='text-[#ffff]  text-[12px]'>brototype@gmail.com</div>
      </div>
      {/*second part*/}
      <div className='flex flex-col justify-center items-start gap-1'>
        <div className='text-[#ffff]  text-[12px]'>TOP CATEGORY</div>
        <div className='text-[#77878F] text-[10px]'>Computer & Laptop</div>
        <div className='text-[#77878F] text-[10px]'>SmartPhone</div>
        <div className='text-[#ffff]  text-[12px]'>Accessories</div>
        <div className='text-[#77878F]  text-[10px]'>Headphone</div>
        <div className='text-[#77878F]  text-[10px]'>Camera & Photo</div>
        <div className='text-[#77878F]  text-[10px]'>TV & Homes</div>
      </div>
      {/*third part*/}
      <div className='flex flex-col justify-center items-start gap-1'>
        <div className='text-[#ffff]  text-[12px]'>QUICK LINKS</div>
        <div className='text-[#77878F] text-[10px]'>Shop Product</div>
        <div className='text-[#77878F] text-[10px]'>Shoping Cart</div>
        <div className='text-[#77878F]  text-[10px]'>Wishlist</div>
        <div className='text-[#77878F]  text-[10px]'>Compare</div>
        <div className='text-[#77878F] text-[10px]'>Track Order</div>
        <div className='text-[#77878F] text-[10px]'>About Us</div>
      </div>
      {/*Four part*/}
      <div className='flex flex-col justify-center items-center gap-2'>
        <div className='text-[#ffff]  text-[12px]'>DOWNLOAD APP</div>
        <div className='w-[120px] h-[50px] bg-[#303639] flex justify-center items-center gap-2 rounded-sm'>
          {/*left part*/}
          <div>
            <IoLogoGooglePlaystore className='text-[#ffff] text-[30px]' />
          </div>
          {/*right part*/}
          <div className='flex flex-col items-center'>
            <div className='text-[#ffff] text-[10px]'>Get it now</div>
            <div className='text-[#ffff] text-[11px]'>Google Play</div>
          </div>
        </div>

        <div className='w-[120px] h-[50px] bg-[#303639] flex justify-center items-center gap-2 rounded-sm'>
          {/*left part*/}
          <div>
            <FaApple className='text-[#ffff] text-[30px]' />
          </div>
          {/*right part*/}
          <div className='flex flex-col items-center'>
            <div className='text-[#ffff] text-[10px]'>Get it now</div>
            <div className='text-[#ffff] text-[11px]'>Apple Store</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
