import React from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import ErrorImage from '../../assets/ErrorImage.png'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { AiOutlineHome } from 'react-icons/ai'

const ErrorPage = () => {
  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <div className='flex justify-center items-center flex-col gap-4 mb-8'>
        <img src={ErrorImage} alt='' />
        <div className='text-[25px] font-semibold'>404, Page not founds</div>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-[#475156] text-[14px]'>
            Something went wrong. It’s look that your requested could not be
            found.{' '}
          </div>
          <div className='text-[#475156] text-[14px]'>
            It’s look like the link is broken or the page is removed.
          </div>
        </div>
        <div className='flex gap-3'>
          <div className='w-[100px] h-[40px] bg-[#FA8232] flex justify-center items-center gap-2 rounded-sm'>
            <FaArrowLeftLong className='text-[#ffff] text-[12px]' />
            <div className='text-[#ffff] text-[12px] font-semibold'>
              GO BACK
            </div>
          </div>

          <div className='w-[100px] h-[40px] bg-[#fffff] flex justify-center items-center gap-2 rounded-sm border border-[#FA8232]'>
            <AiOutlineHome className='text-[#FA8232] text-[12px]' />
            <div className='text-[#FA8232] text-[12px] font-semibold'>
              GO TO BACK
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ErrorPage
