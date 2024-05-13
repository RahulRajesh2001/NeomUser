import * as Yup from 'yup';

const passwordRules=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/

export const signupSchema=Yup.object().shape({
    name:Yup.string().required("Required!"),
    email:Yup.string().email("Please enter valid email!").required("Required!"),
    password:Yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!"),
    confirmPassword:Yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!")
})