import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import Footer from '../../../components/footer/Footer'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl.js'
import { useNavigate, useParams } from 'react-router-dom'
import RatingModal from '../../../components/ratingModal/RatingModal.jsx'

const OrderDetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  //state for updation
  const [update, setUpdate] = useState(true)

  const [order, setOrder] = useState({})
  const [orderItems, setOrderItems] = useState([])
  const [address, setAddress] = useState({})

  const token = localStorage.getItem('userToken')
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/orderDetails`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
        setOrder(res?.data?.order)
        setAddress(res?.data?.order?.shippingAddress)
        setOrderItems(res?.data?.order?.orderedItems)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }, [update])

  //fetching product varient informations of the product
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProductVarientDetails = async () => {
      try {
        const productPromises = orderItems.map((item) =>
          axios.get(`${baseUrl}/api/v1/productVarientDetails`, {
            params: { id: item?.product },
            headers: { Authorization: token },
          })
        )

        const responses = await Promise.all(productPromises)
        const productData = responses.map((res) => res.data?.product)
        setProducts(productData)
      } catch (err) {
        console.log(err)
      }
    }
    if (orderItems.length > 0) {
      fetchProductVarientDetails()
    }
  }, [orderItems])

  //cancel or return order
  const handleOrderStatus = (orderId, orderedItemId, status, method,quantity) => {
    const orderStatus = {
      id: orderId,
      OrderedItemId: orderedItemId,
      orderStatus: status,
      method,
      quantity
    }

    try {
      axios
        .post(`${baseUrl}/api/v1/changeOrderStatus`, orderStatus, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res?.status === 200) {
            alert(res?.data?.message)
            setUpdate(!update)
          }
        })
        .catch((err) => {
          console.error('Error occurred while changing order status:', err)
        })
    } catch (err) {
      console.error('Error occurred while changing order status:', err)
    }
  }

  //refunding amount to the walet
  const returnToWallet = (id) => {
    const wallet = {
      amount: order?.totalAmount,
      orderId: id,
    }
    try {
      axios
        .post(`${baseUrl}/api/v1/addToWallet`, wallet, {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log(res)
        })
    } catch (err) {
      console.log(err)
    }
  }

  //handle invoice
  const handleInvoice = () => {
    navigate(`/invoice/${id}`)
  }

  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-[900px] flex items-center justify-evenly'>
        <div className='h-[850px] w-[80%] rounded-md flex flex-col items-center border gap-4'>
          <div className='w-[100%] h-[60px] flex items-center justify-around border-b '>
            <div className='text-[16px] font-Playfair font-semibold '>
              ORDER DETAILS
            </div>
            <div className='flex gap-10'>
              <button
                onClick={() => handleInvoice()}
                className='flex gap-2 justify-center items-center cursor-pointer text-[#ffff] w-[70px] h-[30px] font-semibold rounded-lg bg-green-500'
              >
                Invoice
              </button>
            </div>
          </div>
          {/*order section one */}
          <div className='w-[95%] h-[100px] bg-[#FDFAE7] border  mt-4 rounded-md flex items-center justify-between p-10'>
            <div className='flex flex-col gap-3'>
              <div className='text-[#191C1F] text-[20px] font-semibold'>
                # {order?._id}
              </div>
              <div className='flex gap-2'>
                <div className='text-[#475156] font-semibold'>
                  {orderItems.length} Products
                </div>
              </div>
            </div>
            <div className='text-[#2DA5F3] font-semibold text-[20px]'>
              ₹ {order.totalAmount}
            </div>
          </div>
          {/*ordered product*/}

          <div className=' h-[400px] w-[100%] overflow-auto flex flex-col gap-4'>
            {/* <div className='text-[20px] ml-10'>Products ({order.length})</div> */}
            <div className='h-[50px] bg-[#F2F4F5] w-[100%] flex'>
              {/*second section left side */}
              <div className='w-[40%] flex justify-center items-center'>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  PRODUCTS
                </div>
              </div>
              {/*second section right side */}
              <div className='w-[60%] flex justify-evenly items-center'>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  PRICE
                </div>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  QUANTITY
                </div>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  SUB-TOTAL
                </div>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  ORDER STATUS
                </div>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  PAYMENT METHOD
                </div>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  ACTION
                </div>
              </div>
            </div>
            {/*Products section */}

            {orderItems?.map((item) =>
              products
                ?.filter((product) => item?.product === product?._id)
                ?.map((product) => (
                  <div
                    key={item?._id}
                    className='w-[100%] flex justify-evenly items-center bg-[#FFFFFF] h-[80px] '
                  >
                    <RatingModal varientId={product?._id} />
                    <div className='w-[40%] flex justify-evenly items-center '>
                      <img
                        src={product?.images[0]}
                        className='h-[50px] w-[50px]'
                      />
                      <div className='w-[50%] text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        {product?.varientName}
                      </div>
                    </div>
                    <div className='w-[60%]  flex justify-evenly items-center'>
                      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        {product?.salePrice}
                      </div>
                      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        <div className='text-[15px] font-semibold cursor-pointer mt-1'>
                          {item?.quantity}
                        </div>
                      </div>
                      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        <div className='text-[15px] font-semibold cursor-pointer mt-1'>
                          ₹ {item?.quantity * product?.salePrice}
                        </div>
                      </div>
                      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        {item?.orderStatus}
                      </div>

                      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        {order?.paymentMethod}
                      </div>

                      {item?.orderStatus === 'Delivered' ? (
                        <button
                          onClick={() => {
                            handleOrderStatus(order?._id, item?._id, 'Returned',item?.quantity)
                            returnToWallet(product._id)
                          }}
                          className='text-[#FA8232] font-Playfair'
                        >
                          Return
                        </button>
                      ) : item?.orderStatus === 'Pending' ? (
                        <button
                          onClick={() => {
                            handleOrderStatus(
                              order?._id,
                              item?._id,
                              'Cancelled',
                              order?.paymentMethod,
                              item?.quantity
                            )
                          }}
                          className='text-red-600 font-Playfair'
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
            )}
          </div>
          {/*Address part */}
          <div className='w-[100%] h-[300px] flex  border-t-2'>
            <div className='w-[300px] h-[300px] ml-[100px] flex flex-col justify-center  items-center gap-3 border-r-2'>
              <div className=' font-Playfair underline'>Shipping Address</div>
              <div>
                <div className='font-Josefin font-semibold'>
                  {address?.fullName}
                </div>
                <div className='font-Josefin font-semibold text-[#5F6C72]'>
                  {address?.address}
                </div>
                <div className='font-Josefin font-semibold text-[#5F6C72]'>
                  {address?.street}
                </div>
                <div className='font-Josefin font-semibold text-[#5F6C72]'>
                  {address?.state}
                </div>
                <div className='font-Josefin font-semibold text-[#5F6C72]'>
                  {address?.pincode}
                </div>
                <div className='font-Josefin font-semibold text-[#5F6C72]'>
                  {address?.phone1}
                </div>
                <div className='font-Josefin font-semibold text-[#5F6C72]'>
                  {address?.phone2}
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

export default OrderDetailsPage
