import React, { useState, useEffect } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import SelectButton from '../../components/buttons/selecButton/SelectButton'
import ProductDetail from '../../components/productdeatil/ProductDetail'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";

const ProductDetailsPage = () => {
  const navigate = useNavigate()
  //mounting axios interceptor
const token=localStorage.getItem("userToken")
  //taking id from params
  const { id } = useParams()
  //state for fetched product
  const [product, setProduct] = useState([])
  const [productVarient, setProductVarient] = useState([])
  const [currentProductVarient, setCurrentProductVarient] = useState()
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/getProductDetails/${id}`, { params: { id } ,headers:{Authorization:token}})
        .then((res) => {
          setProduct(res.data?.product)
          setProductVarient(res.data.product.variants)
          setCurrentProductVarient(res.data.product.variants[0])
        })
    } catch (err) {}
  }, [id])

  //handleVarient
  const handleVarient = (id) => {
    productVarient.map((item) => {
      if (item?._id === id) {
        setCurrentProductVarient(item)
      }
    })
  }



  //for handling image
  const [image, setImage] = useState(0)
  const handleImage = (index) => {
    setImage(index)
  }

  const handleSubmit = () => {
    const requestData = {
      productVarientId: currentProductVarient?._id,
      quantity: 1,
    }
  
    axios
      .post(`${baseUrl}/api/v1/addToCart`, requestData,{headers:{Authorization:token}})
      .then((res) => {
        if (res?.status === 200) {
          Swal.fire({
            text: res?.data?.message,
            icon: 'success',
          })
          navigate('/cart')
        } else {
          Swal.fire({
            text: res.data.message,
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: 'error',
        })
      })
  }

    //adding to wishlist
    const addToWishlist=(id)=>{
      try{
        axios.get(`${baseUrl}/api/v1/addToWishlist`,{params:{id},headers:{Authorization:token}}).then((res)=>{
          Swal.fire({
            text: res?.data?.message,
            icon: "success"
          });
        })
  
      }catch(err){
        console.log(err)
      }
    }


  
  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <BrudCrumbs
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Product Details' },
        ]}
      />
      <div className='h-[1000px]'>
        <div className='w-[100%] h-[50px] flex justify-between items-center '>

        {currentProductVarient?.offers[0]?.offerAmount>0 ?<div className='ml-[100px] w-[250px] h-[40px] flex justify-center items-center rounded-lg font-Playfair bg-[#F3DE6D]' >₹ {currentProductVarient?.offers[0]?.offerAmount} Offer Price Will Deduct</div> : <div></div>}
        
          <div className='flex gap-2 mr-10'>
            {productVarient.map((item, index) => (
              
              <div
                onClick={() => handleVarient(item?._id)}
                key={item?._id}
                className={`w-[100px] h-[50px] flex justify-center items-center font-Playfair text-[15px] ${
                  currentProductVarient._id == item._id
                    ? 'border-b-2 border-[#FA8232]'
                    : 'border-none'
                } cursor-pointer`}
              >
                Varient {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center gap-32 '>
          <div className='flex flex-col justify-center items-center mb-12'>
          <div 
  className='w-[400px] h-[300px] mt-5' 
  style={{ position: 'relative', overflow: 'hidden' }}
>
  <img 
    src={currentProductVarient?.images?.[image] || ''} 
    className='w-[100%] transition-transform duration-300 ease-in-out' 
    alt=""
    style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
    onMouseEnter={(e) => e.target.style.transform = 'scale(1.5)'}
    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
  />
</div>
            <div className='flex gap-3'>
              {currentProductVarient?.images?.map((image, index) => (
                <div key={index}>
                 
                  <img
                    src={image}
                    alt=''
                    className='w-[50px] h-[50px] mt-[50px]'
                    onClick={() => handleImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-3 flex justify-center flex-col w-[500px] gap-2'>
            <div className='flex gap-1 '>
              <div className='font-Josefin'>Varient Name :</div>
              <div className='font-Playfair'>{currentProductVarient?.varientName}</div>
            </div>
            <div className='font-semibold text-[16px]'>{''}</div>
            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Availability :</div>
              <div
                className={`font-bold text-[12px] ${
                  currentProductVarient?.stock <= 0
                    ? 'text-red-600'
                    : 'text-[#2DB224]'
                }`}
              >
                {currentProductVarient?.stock <= 0
                  ? 'Out of stock'
                  : 'In stock'}
              </div>
            </div>

            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Stock :</div>
              <div className={'font-bold text-[12px]'}>
                {currentProductVarient?.stock}
              </div>
            </div>

            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Brand :</div>
              <div className='text-[#191C1F] font-bold text-[12px]'>
                {product.brand}
              </div>
            </div>
            <div className='flex gap-1 mr-[150px]'>
              <div className='text-[12px] text-[#5F6C72]'>Category :</div>
              <div className='text-[#191C1F] font-bold text-[12px]'>
                {product.category}
              </div>
            </div>

            <div className='flex gap-3 items-center'>
              <div className='font-bold text-[#2DA5F3] text-[15px]'>
                ₹ {Math.round(currentProductVarient?.salePrice)}
              </div>
              <div className='text-[#77878F] text-[14px]'>
                <strike>₹{currentProductVarient?.regularPrice}</strike>
              </div>
              <div className='w-[60px] h-[20px] bg-[#F3DE6D] flex justify-center items-center'>
                <div className='font-bold text-[11px]'>{Math.round((currentProductVarient?.regularPrice - currentProductVarient?.salePrice) / currentProductVarient?.regularPrice * 100)}% OFF</div>
              </div>
            </div>
            <div className='bg-[#E4E7E9] h-[1px] w-[100%] mt-2'></div>
            <div className='flex justify-between gap-1 mt-2'>
              <div className='flex  items-center justify-center gap-1'>
                <div className='text-[12px] font-semibold'>Color :</div>
                <div className='flex justify-center items-center mt-1 gap-2 '>
                  <div className='text-[#191C1F] font-bold text-[12px]'>
                    {currentProductVarient?.color}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              {currentProductVarient?.specification?.map((element, index) => (
                <SelectButton
                  key={index}
                  head={element.specName}
                  innerHead={element.specValue}
                />
              ))}
            </div>
            <div className='flex gap-5 justify-center items-center'>
              <button
                onClick={handleSubmit}
                className='bg-[#FA8232] w-[200px] h-[40px] rounded-lg text-[#ffff] font-Playfair text-[15px]'
              >
                ADD TO CART
              </button>
            </div>

            {/*wishlist section*/}
            <div className='mt-2 flex gap-8'>
              <div className='flex items-center gap-2'>
              <CiHeart onClick={()=>addToWishlist(currentProductVarient?._id)} className='text-[25px] cursor-pointer'/>
                <div className='text-[#475156] text-[12px]'>
                  Add to Wishlist
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*bottomside*/}
        <div className='flex justify-center'>
          <ProductDetail
            id={currentProductVarient?._id}
            productDetailsDescription={product?.description}
            productSpecification={currentProductVarient?.specification}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetailsPage
