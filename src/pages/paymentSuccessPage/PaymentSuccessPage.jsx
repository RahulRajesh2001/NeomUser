import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CheckCircle from '../../assets/CheckCircle.svg'

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams()
  const reference =
    searchParams.length > 0 ? searchParams[0].get('reference') : null

  return (
    <div className='flex justify-center items-center h-screen flex-col gap-5'>
      <div>
        <img
          src={CheckCircle}
          alt=''
          className='md:w-[80px] md:h-[80px] vvsm:w-[60px] vvsm:h-[60px]'
        />
      </div>
      <div className='md:text-[25px] font-Playfair vvsm:text-[18px] ssm:text-[20px] '>
        Your order is successfully placed
      </div>
      <div className='flex gap-5'>
        <div className='font-Josefin font-semibold'>Payment Reference :</div>
        <div className='font-Playfair font-semibold'>{reference}</div>
      </div>

      <div className='flex md:flex-row vvsm:flex-col gap-5 justify-center items-center'>
        <Link to='/dashboard'>
          <div className='md:w-[200px] sm:w-[150px] sm:h-[40px] vvsm:w-[130px] vvsm:h-[40px]   md:h-[50px] border-2 border-[#FA8232] flex justify-center items-center '>
            <div className='font-Playfair font-semibold text-[#FA8232] md:text-[16px] sm:text-[14px] vvsm:text-[12px]'>
              GO TO DASHBOARD
            </div>
          </div>
        </Link>
        <Link to={'/orderHistory'}>
          <div className='md:w-[200px] sm:w-[150px] sm:h-[40px] vvsm:w-[130px] vvsm:h-[40px]   md:h-[50px] bg-[#FA8232] flex justify-center items-center '>
            <div className='font-Playfair font-semibold text-[#ffff] md:text-[16px] sm:text-[14px] vvsm:text-[12px]'>
              VIEW ORDERS
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
