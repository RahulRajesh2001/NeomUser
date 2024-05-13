import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
}

const ChooseAddresss = ({ chooseAddress }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [addresses, setAddress] = useState([])

  //token
  const token = localStorage.getItem('userToken')
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/getShippingAddress`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
        setAddress(res?.data?.shippingAddresses)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [open])

  return (
    <div>
      <button
        onClick={handleOpen}
        className=' bg-orange-500 rounded-md w-[70px] h-[30px] font-semibold text-[#ffff]'
      >
        ADD
      </button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='h-full w-[100%]'>
              {/*upper part */}
              <div className='h-[100%] overflow-auto '>
                {addresses?.map((address) => (
                  <div key={address._id} className='border h-[20%] rounded-lg justify-center  flex flex-col mt-2'>
                    <div
                      key={address?._id}
                      className='w-[100%] flex justify-center items-center '
                    >
                      <div className='w-[60%] '>
                        <div className='font-Josefin font-semibold text-[16px] ml-5'>
                          {address?.name}
                        </div>
                        <div className='font-Josefin font-semibold text-[16px] ml-5'>
                          {address?.address}
                        </div>
                      </div>
                      <div className='w-[40%] flex justify-evenly items-center'>
                        <div className='font-Josefin font-semibold text-[16px] ml-5'>
                          {address?.pincode}
                        </div>
                        <button
                          className='w-[50px] h-[30px] bg-orange-500 rounded-lg text-white'
                          onClick={() => {
                            handleClose()
                            chooseAddress(address?._id)
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChooseAddresss
