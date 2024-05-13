import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../baseUrl.js'
import { useDispatch } from 'react-redux'
import { setEmailvalue } from '../../../redux/reducers/otpSlice.js'
import { useFormik } from 'formik'
import { signupSchema } from '../../formValidationSchema/signUpValidation.js';
import Swal from 'sweetalert2'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values, actions) => {
    const user = {
      email: values.email,
      password: values.password,
      name: values.name,
      confirmPassword: values.confirmPassword,
    }

    try {
      const registerResponse = await axios.post(
        `${baseUrl}/api/v1/register`,
        user
      )

      if (registerResponse.data) {
        const otpGenerationResponse = await axios.post(
          `${baseUrl}/api/v1/otp-generation`,
          { email: registerResponse?.data?.user?.email }
        )
        dispatch(setEmailvalue({ email: registerResponse?.data?.user?.email }))
        if (otpGenerationResponse.status == 200) {
          Swal.fire({
            text: registerResponse.data.message,
            icon: "success"
          });
          navigate('/email-verification')
        } else {
          Swal.fire({
            text: registerResponse.data.message,
            icon: "error"
          });
          navigate('/register')
        }
      }
    } catch (err) {
      console.error('Error occurred when user registering..!', err)
      alert('Some error occurred..!')
    }
    actions.resetForm()
  }

  //formik validation
  const { values, handleChange, handleSubmit, errors, isSubmitting } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
      },
      validationSchema: signupSchema,
      onSubmit,
    })

  return (
    <div>
      {/*signinbody*/}
      <form className='flex flex-col justify-center ml-[14px] mt-[10px] w-[90%] gap-2'>
        {/*input box*/}

        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Full Name</div>
          <input
            name='name'
            type='text'
            className={`border h-[35px]  ${
              errors.name ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.name}
            onChange={handleChange}
          />
          {errors.name ? <p className='text-[10px] '>{errors.name}</p> : ''}
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Email Address</div>
          <input
            name='email'
            type='email'
            className={`border h-[35px]  ${
              errors.email ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? <p className='text-[10px] '>{errors.email}</p> : ''}
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Password</div>
          <input
            name='password'
            type='password'
            className={`border h-[35px]  ${
              errors.password ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? (
            <p className='text-[10px] '>{errors.password}</p>
          ) : (
            ''
          )}
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='flex justify-between'>
            <div className='text-[12px] font-semibold '>Confirm Password</div>
          </div>
          <input
            name='confirmPassword'
            type='password'
            className={`border h-[35px]  ${
              errors.confirmPassword ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword ? (
            <p className='text-[10px] '>{errors.confirmPassword}</p>
          ) : (
            ''
          )}
        </div>
        <div className='w-[100%] flex justify-center items-center'>
          <button
            disabled={isSubmitting}
            className='mt-2 font-Playfair bg-orange-500 w-[100%] h-[40px] rounded-md text-[#ffff] flex justify-center items-center '
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
