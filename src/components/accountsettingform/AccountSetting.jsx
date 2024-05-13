import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../redux/reducers/userSlice.js'
import Swal from 'sweetalert2'
import profile from '../../assets/profile.jpg'
import {Link} from 'react-router-dom'

const AccountSetting = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.user)
  const token = localStorage.getItem('userToken')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/getCurrentUser`, {
          params: { token },
        })
        dispatch(setUser(response?.data?.user))
        setName(response?.data?.user?.name)
        setEmail(response?.data?.user?.email)
      } catch (err) {
        console.error('Error fetching user:', err)
      }
    }
    fetchUser()
  }, [dispatch, token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const editUser = {
        name,
        email,
        id: currentUser._id,
      }

      const res = await axios.post(`${baseUrl}/api/v1/editUser`, editUser, {
        headers: {
          Authorization: token,
        },
      })
      if (res.status === 200) {
        Swal.fire({
          text: res.data.message,
          icon: 'success',
        })
      } else {
        Swal.fire({
          text: res.data.message,
          icon: 'success',
        })
      }
    } catch (err) {
      console.error('Error editing user:', err)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <div className='w-[100%] h-[200px] flex  justify-evenly items-center gap-5 '>
      <div className=''>
        <img
          src={profile}
          alt=''
          className='w-[200px] h-[200px] rounded-full'
        />
      </div>

      <div>
        <div className='flex font-semibold text-[18px]'>Account Settings</div>
        <div className='w-[100%] h-[50px] flex justify-end items-center '>
          <Link to={"/renewPassword"}>
          <button className='w-[150px] h-[35px] bg-blue-400 rounded-lg text-[#ffff] font-semibold'>Reset Password</button>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex gap-10 mt-5 justify-center items-center '
        >
          <div className='flex flex-col gap-2'>
            <div className='text-[12px] font-semibold'>Full Name</div>
            <input
              name='name'
              type='text'
              className='outline-none rounded-lg h-[35px] border'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-[12px] font-semibold'>Email Address</div>
            <input
              name='email'
              type='email'
              className='outline-none rounded-lg h-[35px] border'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='mt-5 bg-orange-500 rounded-md w-[100px] h-[30px] font-semibold text-[#ffff]'
          >
            Save Chages
          </button>
        </form>
      </div>
    </div>
  )
}

export default AccountSetting
