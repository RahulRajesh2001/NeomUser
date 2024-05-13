import React, { useEffect, useState } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'

const CuponPage = () => {
  const token = localStorage.getItem('userToken')
  const [cupons, setCupons] = useState([])
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/getCupons`, { headers: { Authorization: token } })
      .then((res) => {
        if(res.status==200){
          setCupons(res?.data?.cupons)
        }
      }).catch((err)=>{
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-screen w-[100%] flex justify-evenly items-center '>
        <div className='h-[90%] w-[80%] overflow-auto border rounded-lg '>
          <div className='font-Playfair font-bold text-[25px] bg-slate-300 border pl-10'>
            Cupons
          </div>
          <div className=' w-[100%] h-[60px] mt-1 flex justify-evenly items-center border-b'>
            <div className='font-Playfair'>Cupon Name</div>
            <div className='font-Playfair'>Cupon Code</div>
            <div className='font-Playfair'>Discount Amount</div>
            <div className='font-Playfair'>Valid From</div>
            <div className='font-Playfair'>Valid Until</div>
          </div>
          {cupons?.map((item) => (
            <div
              key={item?._id}
              className=' w-[100%] h-[60px] mt-1 flex justify-evenly items-center border-b'
            >
              <div className='font-Josefin'>{item?.cuponName}</div>
              <div className='font-Josefin'>{item?.code}</div>
              {item?.discountType == 'Percentage' ? (
                <div className='font-Josefin'>{item?.discountValue} %</div>
              ) : (
                <div className='font-Josefin'>₹ {item?.discountValue}</div>
              )}
              <div className='font-Josefin'>
                {new Date(item?.validFrom).toLocaleDateString()}
              </div>
              <div className='font-Josefin'>
                {new Date(item?.validUntil).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CuponPage
