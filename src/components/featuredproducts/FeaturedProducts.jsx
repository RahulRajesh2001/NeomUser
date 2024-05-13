import React, { useEffect, useState } from 'react'
import ShopCard from '../../components/shopcard/ShopCard'
import axios from 'axios';
import { baseUrl } from '../../../baseUrl.js';


const FeaturedProducts = () => {
  const token = localStorage.getItem('userToken')

  //fetching featered products
  const [featuredProducts,setFeaturedProducts]=useState([])
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/featuredProducts`, {
        headers: {
          Authorization:token,
        },
      })
      .then((res) => {
        setFeaturedProducts(res?.data?.products)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token])
  return (
   
      <div className='flex '>
        {/*body*/}
        <div className='flex flex-col gap-2'>
          <div className='font-bold ml-5'>New Arrivals</div>
          <div className='flex justify-center items-center vvsm:flex-col  md:flex-row  '>
            <ShopCard featuredProducts={featuredProducts}/>
          </div>
        </div>
      </div>
  )
}

export default FeaturedProducts
