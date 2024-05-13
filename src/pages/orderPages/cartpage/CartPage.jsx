import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import Footer from '../../../components/footer/Footer'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl'
import { useDispatch } from 'react-redux'
import { setCartProducts } from '../../../../redux/reducers/cartSlice'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const dispatch = useDispatch()
  const [newQty, setNewQty] = useState([])
  const [update, setUpdate] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [totalDiscountValue, setTotalDiscountValue] = useState(0)

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })

    axios
      .get(`${baseUrl}/api/v1/getCartItems`)
      .then((res) => {
        if (res.data.cart) {
          dispatch(setCartProducts(res?.data.cart?.products))
          setCartItems(res?.data?.cart?.products)

          setNewQty(() => res?.data?.cart?.products?.map((item) => item.quantity))
          setSubTotal(() =>
            res?.data?.cart?.products?.reduce(
              (acc, curr) =>
                acc + curr?.productVarientId?.salePrice * curr?.quantity,
              0
            )
          )
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [update])

  const increaseQuantity = (id, index) => {
    const requestData = {
      productVarientId: id,
      quantity: 1,
    }

    if (newQty[index] < 5) {
      axios
        .post(`${baseUrl}/api/v1/addToCart`, requestData)
        .then((res) => {
          dispatch(setCartProducts(res?.data?.cart?.products))
          setNewQty(res?.data?.cart?.products?.map((item) => item.quantity))
          setUpdate(!update)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const decreaseQuantity = (id, index) => {
    const requestData = {
      productVarientId: id,
      quantity: -1,
    }

    if (newQty[index] > 1) {
      axios
        .post(`${baseUrl}/api/v1/addToCart`, requestData)
        .then((res) => {
          dispatch(setCartProducts(res?.data?.cart?.products))
          setNewQty(res?.data?.cart?.products?.map((item) => item.quantity))
          setUpdate(!update)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const removeCartItem = (id) => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })

    axios
      .delete(`${baseUrl}/api/v1/removeItem`, {
        params: { productVarientId: id },
      })
      .then((res) => {
        setUpdate(!update)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let price = 0; 

  cartItems?.forEach((item) => {
    price += item?.productVarientId?.offers[0]?.offerAmount; 
  })
  
  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className=' h-screen flex justify-evenly items-center '>
        {/*Left side */}
        <div className='h-[700px] w-[60%] rounded-sm overflow-auto border'>
          {/*First head*/}
          <div className='h-[50px] flex items-center ml-20'>
            <div className='font-Playfair text-[18px] font-semibold'>
              Shopping Cart
            </div>
          </div>
          {/*second section*/}
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
            </div>
          </div>
          {/*Third item or single item*/}
          {cartItems?.map((item, index) => (
            <div
              key={item?._id}
              className='w-[100%] flex justify-evenly items-center bg-[#FFFFFF] h-[80px]'
            >
              {/* {item?.productVarientId?.stock}
              <div>now {newQty} index {index}</div> */}
              <div className='w-[40%] flex justify-evenly items-center '>
                <IoMdRemoveCircleOutline
                  onClick={() => removeCartItem(item?.productVarientId?._id)}
                  className='text-[25px] cursor-pointer'
                />
                <img
                  src={item?.productVarientId?.images[0]}
                  className='h-[50px] w-[50px]'
                />
                <div className='w-[50%] text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  {item?.productVarientId?.varientName}
                </div>
              </div>
              <div className='w-[70%]  flex justify-evenly items-center'>
                <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  {item?.productVarientId?.salePrice}
                </div>
                <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  <div className='w-[100px] h-[50px] border flex justify-evenly items-center'>
                    <div
                      onClick={() =>
                        decreaseQuantity(item?.productVarientId?._id, index)
                      }
                      className='text-[40px] font-semibold cursor-pointer'
                    >
                      -
                    </div>
                    <div className='text-[15px] font-semibold cursor-pointer mt-1'>
                      {newQty[index]}
                    </div>
                    <div
                      onClick={() =>
                        increaseQuantity(item?.productVarientId?._id, index)
                      }
                      className='text-[25px] font-semibold cursor-pointer'
                    >
                      +
                    </div>
                  </div>
                </div>

                {item?.productVarientId?.stock <= 0 ? (
                  <div className='bg-red-600 w-[10px] h-[10px] rounded-full'></div>
                ) : (
                  <div className='bg-green-600 w-[10px] h-[10px] rounded-full'></div>
                )}
                <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  {item.quantity * item?.productVarientId?.salePrice}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*right side */}
        <div className='h-[500px] w-[30%] rounded-sm flex justify-center items-center border'>
          <div className='w-[90%] h-[90%] flex justify-center items-center flex-col gap-5'>
            <div className='text-[25px] font-Playfair'>Card Total</div>
            <div className=' w-[100%] h-[50%] flex flex-col justify-center items-center gap-4 border-b'>
              <div className='flex justify-between items-center w-[80%] '>
                <div className='text-[#5F6C72] font-Playfair'>SubTotal</div>
                <div className='text-[#191C1F] font-Playfair font-semibold'>
                  ₹ {parseInt(subTotal)}
                </div>
              </div>
              <div className='flex justify-between items-center w-[80%] '>
                <div className='text-[#5F6C72] font-Playfair'>
                  Offer Applied
                </div>
                <div className='text-[#191C1F] font-Playfair font-semibold'>
                  ₹ {parseInt(price)}
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center w-[80%] '>
              <div className='text-[#5F6C72] font-Playfair'>Total</div>
              <div className='text-[#191C1F] font-Playfair font-semibold'>
                ₹ {subTotal - Number(price)}
              </div>
            </div>

            {cartItems.length > 0 ? (
              <Link className='w-[100%] flex justify-center' to='/checkout'>
                <div className='w-[80%] h-[70px] bg-[#FA8232] font-Playfair text-[#ffff] font-semibold flex justify-center items-center cursor-pointer'>
                  PROCEED TO CHECKOUT
                </div>
              </Link>
            ) : (
              <div className='text-red-600 font-Playfair font-semibold'>
                Cart Is Empty
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartPage
