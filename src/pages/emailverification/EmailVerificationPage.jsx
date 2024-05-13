import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { otpSchema } from '../../formValidationSchema/otpShcema.js'
import Swal from 'sweetalert2'

const EmailVerificationPage = () => {
  // Get email from Redux store

  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [timer, setTimer] = useState({ minutes: 2, seconds: 0 })

  const email = useSelector((state) => state.email.email)
  console.log('redux ', email)

  // Update userEmail when email changes
  useEffect(() => {
    if (email) {
      setUserEmail(email.email)
    }
  }, [email])

  // Form submission and validation
  const onSubmit = async (values, actions) => {
    const { otp } = values
    try {
      const response = await axios.post(`${baseUrl}/api/v1/otp-verify`, {
        otp,
        userEmail,
      })
      if (response.status === 200) {
        Swal.fire({
          text: response.data.message,
          icon: "success"
        });
        navigate('/loginSignup')
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        text: 'Your otp is incorrect..!',
        icon: "error"
      });
    }
    actions.resetForm()
  }

  const otpRegenerate = async () => {
    try {
      await axios.post(`${baseUrl}/api/v1/otp-regeneration`, {
        email: userEmail,
      })
    } catch (error) {
      console.error('Error regenerating OTP:', error)
    }
  }

  // Timer
  useEffect(() => {
    let interval = null
    if (timer.minutes === 0 && timer.seconds === 0) {
      // Timer has expired
      clearInterval(interval)
    } else {
      interval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes !== 0) {
            setTimer({ minutes: timer.minutes - 1, seconds: 59 })
          }
        } else {
          setTimer({ minutes: timer.minutes, seconds: timer.seconds - 1 })
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  // Formik validation
  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: otpSchema,
    onSubmit,
  })

  return (
    <div className='h-screen flex justify-center items-center '>
      <form className='flex flex-col justify-center items-center gap-4 w-[300px] h-[280px]  rounded-sm border border-[#E4E7E9]'>
        <div className='font-semibold text-[14px]'>
          Verify Your Email Address
        </div>
        <div className='w-[90%] text-[#5F6C72] text-[12px] flex justify-center'>
          Lorem ipsum dolor sit amet consectetur,{' '}
        </div>
        <div className='flex  flex-col gap-2 bg-red- w-[90%]'>
          <div className='flex justify-between'>
            <div className='text-[12px] font-semibold '>OTP</div>
            <div
              onClick={otpRegenerate}
              className='text-[12px] font-semibold text-[#2DA5F3] cursor-pointer '
            >
              Resent OTP
            </div>
          </div>
          <input
            name='otp'
            type='text'
            className={`border h-[35px]  ${
              formik.errors.otp ? 'outline-red-400' : 'outline-none'
            }`}
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.otp && formik.touched.otp && (
            <p className='text-[10px] '>{formik.errors.otp}</p>
          )}
          <div className='flex gap-2'>
            <div className='font-semibold text-[12px]'>Time Remaining : </div>
            <div className='font-semibold text-[12px]'>
              {timer.minutes}:
              {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
            </div>
          </div>
        </div>
        <button
          onClick={formik.handleSubmit}
          className='mt-2 font-Playfair bg-orange-500 w-[90%] h-[40px] rounded-md text-[#ffff] flex justify-center items-center '
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default EmailVerificationPage
