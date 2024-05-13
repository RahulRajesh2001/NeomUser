import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'

const OfferListingPage = () => {
  //fetching offers
  const token = localStorage.getItem('userToken')
  const [offers, setOffers] = useState([])
  useEffect(() => {
    try {
      axios
      .get(`${baseUrl}/api/v1/getOffers`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (res?.status === 200) {
            setOffers(res?.data?.offers)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  console.log("this is offers",offers)
  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-screen  flex justify-center items-center gap-10'>
        <div className='h-[90%] w-[80%] overflow-auto border rounded-lg'>
          <div className='font-Playfair font-bold text-[25px] bg-slate-300 border pl-10'>
            Offers
          </div>
          <div className='flex justify-evenly items-center w-[100%] h-[40px] border-b'>
            <div className='font-Playfair '>OFFER NAME</div>
            <div className='font-Playfair '>DESCRIPTION</div>
            <div className='font-Playfair '>OFFER AMOUNT</div>
            <div className='font-Playfair '>VALID FROM</div>
            <div className='font-Playfair '>VALID UNTIL</div>
          </div>

          {offers?.map((offer) => (
            <div
              key={offer._id}
              className='flex justify-evenly items-center w-[100%] h-[40px]  mt-3 border-b'
            >
              <div className='font-Josefin '>{offer?.offerName}</div>
              <div className='font-Josefin '>{offer?.description}</div>
              <div className='font-Josefin '>
                {offer?.discountType == 'Percentage' ? (
                  <div className='font-Josefin'>{offer?.discountValue} %</div>
                ) : (
                  <div className='font-Josefin'>₹ {offer?.discountValue}</div>
                )}
              </div>
              <div className='font-Josefin '>
                {new Date(offer?.validFrom).toLocaleDateString()}
              </div>
              <div className='font-Josefin '>
                {new Date(offer?.validUntil).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OfferListingPage
