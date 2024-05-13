import React,{useEffect,useState} from 'react'
import phoneimage from '../../assets/phoneimage.png'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'

const CategoryBar = () => {
  const [categories,setCategories]=useState([])

  useEffect(()=>{
    axios.get(`${baseUrl}/api/v1/getCategories`).then((res)=>{
      setCategories(res?.data?.categories)
    }).catch((err)=>{
      console.log("this is category error",err)
    })
  },[])
  return (
    <div className='   flex flex-col w-[100%] '>
      <div className='flex justify-center '>
        <div className='font-bold'>Shop with Categorys</div>
      </div>

      <div className='flex flex-wrap justify-center items-center'>
  {/*Card */}
  {categories?.map((category) => (
    <div key={category?._id} className='flex flex-col justify-center items-center w-[150px] h-[170px] border px-[5px] py-[5px] mt-4 ml-2'>
      {/*Upper side */}
      <div>
        <img src={phoneimage} alt='' />
      </div>
      {/*Bottom side */}
      <div className='flex justify-start items-center gap-1 mt-2'>
        {/* You can add additional elements here */}
      </div>
      <div className='text-[#191C1F] text-[12px]'>{category?.title}</div>
    </div>
  ))}
</div>
</div>
  )
}

export default CategoryBar
