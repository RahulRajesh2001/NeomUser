import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl'
import { useNavigate } from 'react-router-dom'


const GoogleLoginComponent = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      try {
        axios
          .post(`${baseUrl}/api/v1/auth/google`, user)
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              localStorage.setItem('userToken', res.data.token)
              navigate('/')
            }
          })
          .catch((error) => {
            console.error('Error occurred during Google login:', error)
          })
      } catch (err) {
        console.error('Error occurred during Google login:', err)
      }
    }
  }, [user])

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const details = jwtDecode(credentialResponse.credential)
          setUser(details)
        }}
        onError={() => {
          console.log('Login Failed')
        }}
      />
    </>
  )
}

export default GoogleLoginComponent
