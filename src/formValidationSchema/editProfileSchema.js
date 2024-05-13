import * as Yup from 'yup';

export const editProfileSchema=Yup.object().shape({
    email:Yup.string().email("Please enter valid email!").required("Required!"),
    name:Yup.string().required("Required!"),
})