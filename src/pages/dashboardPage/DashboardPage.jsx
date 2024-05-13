import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import flight from '../../assets/flight.png'
import message from '../../assets/message.png'
import box from '../../assets/box.png'
import { baseUrl } from '../../../baseUrl.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('userToken')
  // Fetching current user data
  const [currentUser, SetCurrentUser] = useState({})
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/getCurrentUser`, {
          params: { token },
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          SetCurrentUser(response?.data)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (err) {
      console.error(err)
    }
  }, [])

  //fetching shipping address
  const [shippingAddress, setShippingAddress] = useState({})
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/getShippingAddress`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setShippingAddress(res?.data?.shippingAddresses)
      })
      .catch((err) => {
        console.log(err?.response)
      })
  }, [])

  //fetching all orders
  const [orders, setOrders] = useState([])
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/orders`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOrders(res?.data?.orders)
      })
      .catch((err) => {
        console.log(err?.response)
      })
  }, [])

  let orderPending = 0
  let orderCompleted = 0
  orders.map((item) => {
    item.orderedItems.map((product) => {
      if (product?.orderStatus == 'Pending') {
        orderPending = orderPending + 1
      }

      if (product?.orderStatus == 'Completed') {
        orderCompleted = orderCompleted + 1
      }
    })
  })

  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='flex justify-center items-center h-screen'>
        {/*Body */}
        <div className='h-[90%] w-[90%] flex flex-col gap-5 justify-center items-center'>
          {/*First section */}
          <div className='w-[90%] '>
            <div className='text-[#191C1F] text-[18px] font-Playfair'>
              {currentUser?.user?.name}
            </div>
            <div className='w-[400px] mt-3'>
              <div className='font-Josefin'>
                From your account dashboard. you can easily check & view your
                Recent Orders, manage your Shipping and Billing Addresses and
                edit your Password and Account Details.
              </div>
            </div>
          </div>
          {/*Second section */}
          <div className='w-[100%] flex justify-evenly'>
            {/*left section*/}
            <div className=' w-[30%] h-[300px] flex flex-col justify-center items-center gap-3 border'>
              <div className='h-[25%]  w-[100%] flex justify-center items-center border-b'>
                <div className='font-Playfair'>ACCOUNT INFO</div>
              </div>
              <div className='h-[50%] flex justify-center items-center flex-col'>
                <div className='text-[#191C1F] font-Playfair'>
                  {currentUser?.user?.name}
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <div className='text-[#191C1F] font-Playfair'>Email :</div>
                  <div className='text-[#5F6C72] font-Josefin'>
                    {currentUser?.user?.email}
                  </div>
                </div>
              </div>
              <div className='h-[25%] flex justify-center items-center '>
                <button
                  onClick={() => navigate('/profile')}
                  className='w-[150px] h-[50px]  font-Playfair border border-[#D5EDFD] text-[#2DA5F3]'
                >
                  Edit Address
                </button>
              </div>
            </div>
            {/*middle section*/}
            <div className=' w-[30%] h-[300px] flex flex-col justify-center items-center gap-3 border'>
              <div className='h-[25%]  w-[100%] flex justify-center items-center border-b'>
                <div className='font-Playfair'>SHIPPING ADDRESS</div>
              </div>
              <div className='h-[50%] flex justify-center items-center flex-col'>
                <div className='text-[#191C1F] font-Playfair'>
                  {shippingAddress[0]?.name}
                </div>
                <div className='text-[#5F6C72] font-Josefin'>
                  {shippingAddress[0]?.address}
                </div>
                <div className='text-[#5F6C72] font-Josefin'>
                  {shippingAddress[0]?.pincode}
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <div className='text-[#191C1F] font-Playfair'>Phone :</div>
                  <div className='text-[#5F6C72] font-Josefin'>
                    {shippingAddress[0]?.phone1}
                  </div>
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <div className='text-[#191C1F] font-Playfair'>Email :</div>
                  <div className='text-[#5F6C72] font-Josefin'>
                    {shippingAddress[0]?.email}
                  </div>
                </div>
              </div>
              <div className='h-[25%] flex justify-center items-center '>
                <button
                  onClick={() => navigate('/profile')}
                  className='w-[150px] h-[50px]  font-Playfair border border-[#D5EDFD] text-[#2DA5F3]'
                >
                  Edit Address
                </button>
              </div>
            </div>
            {/*right section*/}
            <div className=' w-[30%] h-[300px] flex justify-evenly items-center flex-col'>
              <div className='w-[100%] h-[30%] bg-[#EAF6FE] flex justify-around items-center'>
                {/*Image */}
                <div className='w-[30%]'>
                  <img src={flight} alt='' />
                </div>
                {/*Text*/}
                <div className='w-[50%]'>
                  <div className='font-Josefin font-semibold'>
                    {orders.length}
                  </div>
                  <div className='font-Josefin'>Total Orders</div>
                </div>
              </div>
              <div className='w-[100%] h-[30%] bg-[#FFF3EB] flex justify-around items-center'>
                {/*Image */}
                <div className='w-[30%]'>
                  <img src={message} alt='' />
                </div>
                {/*Text*/}
                <div className='w-[50%]'>
                  <div className='font-Josefin font-semibold'>
                    {orderPending}
                  </div>
                  <div className='font-Josefin'>Pending Products</div>
                </div>
              </div>
              <div className='w-[100%] h-[30%] bg-[#EAF7E9] flex justify-around items-center'>
                {/*Image */}
                <div className='w-[30%]'>
                  <img src={box} alt='' />
                </div>
                {/*Text*/}
                <div className='w-[50%]'>
                  <div className='font-Josefin font-semibold'>
                    {orderCompleted}
                  </div>
                  <div className='font-Josefin'>Completed Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardPage
