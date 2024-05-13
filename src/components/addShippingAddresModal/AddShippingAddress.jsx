import React,{useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import SelectionBox from '../selectionBox/SelectionBox.jsx';
import { shippingAddressSchema } from '../../formValidationSchema/shippgingAddressSchema.js';
import {baseUrl} from '../../../baseUrl.js'
import { setShippingAddress } from '../../../redux/reducers/userSlice.js';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, 
  height: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddShippingAddress = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const [region,setRegion]=useState('')
//for taking child region
const getState=(state)=>{
  setRegion(state[0])
}


  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm
  } = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      pincode: '',
      phone1: '',
      phone2: '',
      street: '',
      landmark: '',
      region: '', 
    },
    validationSchema: shippingAddressSchema,
    onSubmit: (values) => {
      const shippingAddress = {
        name: values.name,
        address: values.address,
        city: values.city,
        pincode: values.pincode,
        phone1: values.phone1,
        phone2: values.phone2,
        street: values.street,
        landmark: values.landmark,
        region: region,
      };

    //axios interceptor

      axios.interceptors.request.use(config=>{
        const token=localStorage.getItem('userToken')
        if(token){
          config.headers.Authorization=token;
        }
        return config
      })

      axios.post(`${baseUrl}/api/v1/add-address`,shippingAddress).then((res)=>{
        if(res.status ==200){
          Swal.fire({
            text: res.data.message,
            icon: "success"
          });
          dispatch(setShippingAddress(res?.data?.remainingAddresses))
          resetForm()
        }else{
          Swal.fire({
            text: res.data.message,
            icon: "error"
          });
        }
      }).catch((err)=>{
        console.log(err)
      })
    


      handleClose();
    }
  });

  const states=[
    "kerala",
    "tamilnadu"
  ]

  return (
    <div >
      <button onClick={handleOpen}
            type='submit'
            className='mt-5 bg-orange-500 rounded-md w-[200px] h-[30px] text-[15px] font-semibold text-[#ffff]'
          >ADD MULTIPLE ADDRESS</button>
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
            <form
              onSubmit={handleSubmit}
              className='w-[100%] h-full flex flex-col justify-center items-center gap-4 '
            >
              <div  className='overflow-auto w-[100%] '>
              <div className='font-Playfair font-bold text-[18px] mb-2'>
                SHIPPING ADDRESS
              </div>
              <div className='flex flex-col gap-2 w-[80%] overflow-auto'>
                <div className='font-Josefin font-bold'>Full Name</div>
                <input
                  id='name'
                  type='text'
                  placeholder='Enter name'
                  className={`bg-[#FAFAFA] border h-[40px] w-[50%] rounded-lg ${
                    errors.name && touched.name
                      ? 'outline-red-400 '
                      : 'outline-none'
                  }`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <div className='text-red-500'>{errors.name}</div>
                )}
              </div>
              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>Address</div>
                <input
                  id='address'
                  type='text'
                  placeholder='Enter address'
                  className={`bg-[#FAFAFA] border h-[40px] w-[100%] rounded-lg ${
                    errors.address && touched.address
                      ? 'outline-red-400 '
                      : 'outline-none'
                  }`}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && (
                  <div className='text-red-500'>{errors.address}</div>
                )}
              </div>
              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>Region/State</div>
                <SelectionBox  states={states} getState={getState}/>
                {errors.region && touched.region && (
                  <div className='text-red-500'>{errors.region}</div>
                )}
              </div>
              <div className='flex w-[80%]'>
                <div className='flex flex-col gap-2 w-[100%] '>
                  <div className='font-Josefin font-bold'>City</div>
                  <input
                    id='city'
                    type='text'
                    placeholder='City'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.city && touched.city
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.city && touched.city && (
                    <div className='text-red-500'>{errors.city}</div>
                  )}
                </div>
                <div className='flex flex-col gap-2 w-[100%] '>
                  <div className='font-Josefin font-bold'>PinCode</div>
                  <input
                    id='pincode'
                    type='text'
                    placeholder='Pincode'
                    className={`bg-[#FAFAFA] border h-[40px] w-[100%] rounded-lg ${
                      errors.pincode && touched.pincode
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.pincode && touched.pincode && (
                    <div className='text-red-500'>{errors.pincode}</div>
                  )}
                </div>
              </div>

              <div className='flex w-[80%]'>
                <div className='flex flex-col gap-2 w-[100%] '>
                  <div className='font-Josefin font-bold'>Phone No.1</div>
                  <input
                    id='phone1'
                    type='text'
                    placeholder='phone1'
                    className={`bg-[#FAFAFA] border h-[40px] w-[90%] rounded-lg ${
                      errors.phone1 && touched.phone1
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.phone1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone1 && touched.phone1 && (
                    <div className='text-red-500'>{errors.phone1}</div>
                  )}
                </div>
                <div className='flex flex-col gap-2 w-[100%] '>
                  <div className='font-Josefin font-bold'>
                    Phone No.2 (optional)
                  </div>
                  <input
                    id='phone2'
                    type='text'
                    placeholder='phone2'
                    className={`bg-[#FAFAFA] border h-[40px] w-[100%] rounded-lg ${
                      errors.phone2 && touched.phone2
                        ? 'outline-red-400 '
                        : 'outline-none'
                    }`}
                    value={values.phone2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone2 && touched.phone2 && (
                    <div className='text-red-500'>{errors.phone2}</div>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>Street</div>
                <input
                  id='street'
                  type='text'
                  placeholder='Street'
                  className={`bg-[#FAFAFA] border h-[40px] w-[100%] rounded-lg ${
                    errors.street && touched.street
                      ? 'outline-red-400 '
                      : 'outline-none'
                  }`}
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.street && touched.street && (
                  <div className='text-red-500'>{errors.street}</div>
                )}
              </div>

              <div className='flex flex-col gap-2 w-[80%] '>
                <div className='font-Josefin font-bold'>Landmark</div>
                <input
                  id='landmark'
                  type='text'
                  placeholder='Landmark'
                  className={`bg-[#FAFAFA] border h-[40px] w-[100%] rounded-lg ${
                    errors.landmark && touched.landmark
                      ? 'outline-red-400 '
                      : 'outline-none'
                  }`}
                  value={values.landmark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.landmark && touched.landmark && (
                  <div className='text-red-500'>{errors.landmark}</div>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type='submit'
                className='w-[100px] h-[40px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer mt-4'
              >
                Add
              </button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default AddShippingAddress
