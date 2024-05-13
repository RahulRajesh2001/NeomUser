import React, { useState} from 'react'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')

  const { token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/reset-password/${token}`,
        { newPassword }
      )
      if (response.status == 200) {
        navigate('/loginSignup')
        alert(response.data.message)
      } else {
        navigate('/forget-password')
        alert(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
      <div className='h-screen flex justify-center items-center '>
        <form className='flex flex-col justify-center items-center gap-4 w-[300px] h-[350px]  rounded-sm border border-[#E4E7E9]'>
          <div className='font-semibold text-[14px]'>Reset Password</div>
          <div className='w-[90%] text-[#5F6C72] text-[12px] flex justify-center'>
            Reset you password using new password !
          </div>
          <div className='flex  flex-col gap-2 bg-red- w-[90%]'>
            <div className='flex justify-between'>
              <div className='text-[12px] font-semibold '>
                Enter new password
              </div>
            </div>
            <input
              type='password'
              className='border outline-none  h-[35px]'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className='mt-2 font-Playfair bg-orange-500 w-[90%] h-[40px] rounded-md text-[#ffff] flex justify-center items-center '
          >
            Submit
          </button>
        </form>
      </div>
  )
}

export default ResetPasswordPage
