import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import profile from '../../assets/profile.jpg'
import { FaStar } from 'react-icons/fa6'

const Review = ({ id }) => {
  const [review, setReview] = useState([])
  const token = localStorage.getItem('userToken')
  useEffect(() => {
    if (!token) {
      return
    }
    const fetchData = async () => {
      try {
        await axios
          .get(`${baseUrl}/api/v1/get-review`, {
            params: { id },
            headers: { Authorization: token },
          })
          .then((res) => {
            setReview(res?.data?.review)
          })
      } catch (error) {
        console.error(error?.response?.data?.message)
      }
    }

    fetchData()
  }, [id, token])

  return (
    <div className=' flex  justify-center flex-wrap items-center gap-2 overflow-auto'>
      {review?.map((review) => (
        <div
          key={review?._id}
          className='mt-5 w-[200px] h-[130px] flex flex-col justify-center items-center border rounded-lg '
        >
          <div className='w-[80px] h-[100px] rounded-full'>
            <img
              src={profile}
              alt=''
              className='rounded-full w-[80px] h-[80px]'
            />
          </div>
          <div className='flex'>
            {Array.from({ length: review?.rating }).map((_, index) => (
              <div key={index}>
                <FaStar key={index} className={`text-[18px]  text-[#FA8232]`} />
              </div>
            ))}
          </div>
          <div>
            <div className='font-semibold'>{review?.review}</div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Review
