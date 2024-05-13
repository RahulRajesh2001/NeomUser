import React from 'react'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/reducers/userSlice.js'
import { useFormik } from 'formik'
import { loginSchema } from '../../formValidationSchema/loginFormValidation.js'
import GoogleLoginComponent from '../googleLogin/GoogleLogin.jsx'
import Swal from 'sweetalert2'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (values, actions) => {
    const user = {
      email: values.email,
      password: values.password,
    }
    try {
      axios.post(`${baseUrl}/api/v1/login`, user).then((response) => {
        localStorage.setItem('userToken', response?.data?.token)
        dispatch(setUser(response.data))
        if (response.status == 200) {
          Swal.fire({
            text: response.data.message,
            icon: 'success',
          })
          navigate('/')
        } else {
          Swal.fire({
            text: response.data.message,
            icon: 'error',
          })
          navigate('/loginSignup')
        }
      })
    } catch (error) {
      console.log(error)
      navigate('/loginSignup')
    }

    actions.resetForm()
  }

  //formik validation
  const { values, handleChange, handleSubmit, errors, isSubmitting } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit,
    })

  return (
    <div>
      {/*signinbody*/}
      <div className='flex flex-col justify-center ml-[14px] mt-[10px] w-[90%] gap-2'>
        {/*From validation*/}
        <form className='flex justify-center flex-col'>
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
            <div className='flex justify-between'>
              <div className='text-[12px] font-semibold '>Password</div>
              <Link to='/forget-password'>
                <div className='text-[12px] font-semibold text-[#2DA5F3]'>
                  Forget Password
                </div>
              </Link>
            </div>
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
          <div className='flex justify-center items-center'>
            <button
              className='mt-2 font-Playfair bg-orange-500 w-[100%] h-[40px] rounded-md text-[#ffff] flex justify-center items-center '
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              SignIn
            </button>
          </div>
        </form>
        {/*0auth section*/}
        <div className='h-[1px] bg-[#E4E7E9] mt-2'></div>
        {/*O Auth*/}

        <GoogleLoginComponent/>
      </div>
    </div>
  )
}

export default SignIn
