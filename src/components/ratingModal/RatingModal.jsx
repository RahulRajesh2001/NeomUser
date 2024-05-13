import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { FaStar } from 'react-icons/fa6'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import Swal from 'sweetalert2'

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

const RatingModal = ({varientId }) => {
  const token = localStorage.getItem('userToken')
  const [open, setOpen] = useState(false)
  const [review, setReview] = useState('')
  const [starCount, setStarCount] = useState(0)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleStarClick = (starIndex) => {
    setStarCount(starIndex + 1)
  }

  const handleSubmit = () => {
    if (review.trim() === '') {
      Swal.fire({
        text: 'Enter something in Review !',
        icon: 'error',
      })
      return
    }

    const reviews = {
      review,
      starCount,
      varientId,
    }

    axios
      .post(`${baseUrl}/api/v1/add-review`, reviews, {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            text: res.data.message,
            icon: 'success',
          })
          handleClose()
        } else {
          Swal.fire({
            text: 'Failed to submit review',
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        console.log(err.response.data.message)
        Swal.fire({
          text: 'Failed to submit review',
          icon: 'error',
        })
      })
  }

  return (
    <div>
      <button>
        <div
          onClick={handleOpen}
          className='flex gap-2 justify-center items-center cursor-pointer'
        >
          <div className='text-[12px] font-Playfair text-[#FA8232] font-semibold'>
            Leave a Rating & Review
          </div>
        </div>
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
            <div className='w-[100%] h-full flex flex-col justify-center items-center gap-4'>
              <div className='font-Playfair font-semibold text-[18px]'>
                Rating & Review
              </div>
              <div className='flex justify-center items-center  w-[50%] '>
                <div className='flex justify-evenly items-center w-[100%]'>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <FaStar
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className={`text-[23px] ${
                        index < starCount ? 'text-[#FA8232]' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>Review</div>
                <input
                  id='description'
                  type='text'
                  placeholder='Description...'
                  onChange={(e) => setReview(e.target.value)}
                  className='bg-[#FAFAFA] border h-[90px] w-[90%] rounded-lg outline-red-400 '
                />
              </div>
              <button
                type='submit'
                onClick={() => handleSubmit()}
                className='w-[100px] h-[40px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer'
              >
                ADD
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default RatingModal
