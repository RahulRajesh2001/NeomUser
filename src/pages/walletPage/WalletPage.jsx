import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import Footer from '../../components/footer/Footer.jsx'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import BottomBar from '../../components/bottombar/BottomBar.jsx'
import Swal from 'sweetalert2'

const WalletPage = () => {
  const token = localStorage.getItem('userToken')
  const [wallet, setWallet] = useState({})

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/getWalletHistory`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setWallet(res.data.wallet)
        })
        .catch((err) => {
          Swal.fire({
            text: err?.response?.data?.error,
            icon: 'error',
          })
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className='h-screen  flex flex-col gap-10'>
        <div className='w-[100%]'>
          <BottomBar />
        </div>
        <div className='w-[100%] flex justify-center items-center'>
          <div className='w-[80%]  gap-5 border rounded-lg'>
            <div className='w-[100%]   h-[600px] '>
              <div className='font-Playfair text-[25px] font-semibold ml-10 pt-5'>
                Wallet
              </div>

              <div className='flex flex-col gap-4 mt-5'>
                <div className='flex justify-around'>
                  <div className='font-Josefin font-semibold text-[20px] text-green-600'>
                    Current Balance
                  </div>
                  <div className='font-Josefin font-semibold text-[20px] text-green-600'>
                    ₹ {wallet?.balance}
                  </div>
                </div>
                <div className='flex justify-around items-center'>
                  <div className='font-Playfair font-semibold '>
                    Transactions
                  </div>
                  <div className='font-Playfair font-semibold'>Amount</div>
                  <div className='font-Playfair font-semibold'>Date</div>
                </div>

                {wallet?.orders?.map((item) => (
                  <div key={item._id} className='flex justify-around '>
                    <div className='font-Playfair'>{item?.transaction}</div>
                    <div className='font-Playfair'>{item?.amount}</div>
                    <div className='font-Playfair'>
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default WalletPage
