import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import SideBar from '../../../components/sidebarDashboard/SideBar.jsx'
import Footer from '../../../components/footer/Footer'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl.js'

const OrderHistoryPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  //fetching orders from backend
  const token = localStorage.getItem('userToken')
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/orders`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOrders(res?.data?.orders)
        console.log(res?.data?.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //for date
  function formatDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Function to calculate total sale price for each item in the order
  const calculateTotalSalePriceForOrder = (order) => {
    let totalSalePrice = 0

    order.orderedItems.forEach((item) => {
      totalSalePrice += item.quantity * item.price
    })

    return totalSalePrice
  }

  //handle orderid
  const handleOrderId = (id) => {
    navigate(`/orderDetails/${id}`)
  }

  //repayment
  const handleRepayment=(amount,id)=>{
      try{
        let totalAmount=amount;
        axios
        .post(
          `${baseUrl}/api/v1/checkout`,
          { amount: totalAmount },
          { headers: { Authorization: token } }
        )
        .then((paymentRes) => {
          // Handle the response from the checkout API
          if (paymentRes.status === 200) {
            // If payment initiation is successful, get the payment key
            axios
              .get(`${baseUrl}/api/getkey`)
              .then((keyRes) => {
                let orderId = paymentRes.data.order.id
                const options = {
                  key: keyRes.data.key,
                  amount: paymentRes.data.order.amount,
                  currency: 'INR',
                  name: 'NEOM',
                  description: 'Ecommerce web application',
                  image:
                    'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
                  order_id: paymentRes.data.order.id,
                  callback_url: `${baseUrl}/api/v1/paymentverification`,
                  prefill: {
                    name: '',
                    email: '',
                    contact: '7510329871',
                  },
                  notes: {
                    address: 'Razorpay Corporate Office',
                  },
                  theme: {
                    color: '#121212',
                  },
                }

                // Open Razorpay payment dialog
                const razor = new Razorpay(options)
                razor.open()

                console.log("this is orde id",orderId)

              
                axios.post(`${baseUrl}/api/v1/repayment`,{orderId,id},{headers:{Authorization:token}}).then((res)=>{
                  console.log("this si response",res)
                })
                
              })
              .catch((keyErr) => {
                Swal.fire({
                  text: keyErr.response.data.message,
                  icon: 'error',
                })
              })
          } else {
            Swal.fire({
              text: 'Check Payment and Reorder the item , Thankyou !',
              icon: 'error',
            })
          }
        })
        .catch((paymentErr) => {
          Swal.fire({
            text: paymentErr.response.data.message,
            icon: 'error',
          })
        })
      }catch(error){

      }
  
  }


  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-screen flex items-center justify-evenly'>
        <div className='h-[700px] w-[80%] rounded-md flex flex-col items-center border'>
          {/*order head */}
          <div className='w-[100%] h-[60px] flex items-center justify-between'>
            <div className='ml-[100px] text-[16px] font-Playfair font-semibold'>
              ORDER HISTORY
            </div>
          </div>
          {/*order section head */}
          <div className='flex h-[60px] w-[100%] justify-evenly items-center bg-[#F2F4F5]'>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              ORDER ID
            </div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              DATE
            </div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              TOTAL
            </div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              ACTION
            </div>
          </div>
          <div className='overflow-auto w-[100%]'>
            {/*order one item  */}
            {orders?.map((order) => (
              <div
                className='flex h-[60px] w-[100%] justify-evenly items-center border-b'
                key={order?._id}
              >
                <div className='text-[14px] font-Josefin font-semibold'>
                  {order?._id}
                </div>
                <div className='text-[14px] font-Josefin font-semibold'>
                  {formatDate(order?.orderDate)}
                </div>
                <div className='text-[14px] font-Josefin font-semibold'>
                  ₹ {calculateTotalSalePriceForOrder(order)} (
                  {order?.orderedItems?.length} Products)
                </div>
                <div className='flex gap-5'>
                  {order?.payment =="" && order?.paymentMethod == "RazorPay" ? <button onClick={()=>handleRepayment(order?.totalAmount,order?._id)} className='font-Josefin text-red-500 font-semibold'>Payment Failed</button> : <div></div>}
                <div className='flex '>
                  <div
                    onClick={() => handleOrderId(order?._id)}
                    className='text-[14px] font-Josefin font-semibold text-[#2DA5F3] cursor-pointer'
                  >
                    View Details
                  </div>
                  <FaArrowRight className='text-[#2DA5F3]' />
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderHistoryPage
