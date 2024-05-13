import * as Yup from 'yup';

const passwordRules=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/

export const renewPasswordSchema=Yup.object().shape({
    oldPassword:Yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!"),
    newPassword:Yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!"),
    confirmNewPassword:Yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!")
})