import * as Yup from 'yup';

export const shippingAddressSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup
    .string()
    .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits')
    .required('Pincode is required'),
  phone1: Yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  phone2: Yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .notRequired()
    .nullable(),
  street: Yup.string().required('Street is required'),
  landmark: Yup.string().required('Landmark is required'),
})
