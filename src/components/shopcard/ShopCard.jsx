import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ShopCard = ({ featuredProducts, fullProducts }) => {
  const navigate = useNavigate()

  // State for storing products
  const [products, setProducts] = useState([])

  // Effect to update products when featuredProducts change
  useEffect(() => {
    setProducts(featuredProducts)
  }, [featuredProducts])

  useEffect(() => {
    setProducts(fullProducts)
  }, [fullProducts])

  // Function to handle product details navigation
  const handleDetails = (id) => {
    navigate(`/getProductDetails/${id}`)
  }

  return (
    <div className='w-full flex flex-wrap justify-center items-center'>
      {products
        ?.filter((product) => !product?.isDeleted)
        ?.map((product) => (
          <div
            key={product?._id}
            className=' vvsm:w-[140px] vvsm:h-[200px] md:w-[160px] md:h-[220px] border px-5 py-5 mt-4 ml-2 cursor-pointer rounded-lg hover:scale-105 duration-300'
          >
            {product?.variants && product?.variants?.length > 0 && (
              <div onClick={() => handleDetails(product?._id)}>
                <img
                  src={product.variants[0]?.images[0]}
                  alt=''
                  className='mt-2'
                />
                <div className='mt-2'>
                  <div className='text-[#191C1F] text-[12px]'>
                    {product.name}
                  </div>
                </div>
                <div className='text-[#2DA5F3] font-semibold text-[14px] flex justify-between '>
                  <div>
                  ₹{Math.round(product?.variants[0]?.salePrice)}
                  </div>
                  <div className='text-[#77878F] text-[12px]'>
                <strike>₹{Math.round(product?.variants[0]?.regularPrice)}</strike>
              </div>
                </div>
                <div className='w-[60px] h-[20px] bg-[#F3DE6D] flex justify-center items-center rounded-md mt-2'>
                <div className='font-bold text-[11px]'>{Math.round((product?.variants[0]?.regularPrice- product?.variants[0]?.salePrice) / product?.variants[0]?.regularPrice * 100)}% OFF</div>
              </div>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default ShopCard
