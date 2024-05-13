import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import BottomBar from '../../components/bottombar/BottomBar';
import Footer from '../../components/footer/Footer';
import { renewPasswordSchema } from '../../../formValidationSchema/renewPasswordSchema.js';
import { useFormik } from 'formik';
import { baseUrl } from '../../../baseUrl.js';
import axios from 'axios';
import Swal from 'sweetalert2'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs.jsx'


const ReNewPasswordPage = () => {
    const breadcrumbs = [{ label: 'Home', path: '/' },{label:'Profile',path:'/profile'},{label:'Reset Password',path:'/renewPassword'}];

    const token=localStorage.getItem('userToken')
    const onSubmit = (values, actions) => {
        const passwords = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmNewPassword
        };
    try{
        axios.post(`${baseUrl}/api/v1/renewPassword`,passwords,{headers:{Authorization:token}}).then((res)=>{
            console.log(res)
            if(res.status==200){
                Swal.fire({
                    text: res.data.message,
                    icon: "success"
                  });
            }
        }).catch((err)=>{
            Swal.fire({
                text: err.response.data.message,
                icon: "error"
              });
        })
    }catch(err){
        console.log(err)
    }
    actions.resetForm()
    };

    const formik = useFormik({
        initialValues: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
        validationSchema: renewPasswordSchema,
        onSubmit: onSubmit
    });

    const { values, handleChange, handleSubmit, errors, isSubmitting } = formik;

    return (
        <div>
            <Navbar />
            <BottomBar />
            <BrudCrumbs breadcrumbs={breadcrumbs} />
            <div className='h-screen flex justify-center items-center gap-10'>
                <form className='flex flex-col justify-center items-center gap-4 w-[300px] h-[500px] rounded-sm border border-[#E4E7E9]'>
                    <div className='font-semibold text-[14px]'>Reset Your Password</div>
                    <div className='w-[90%] text-[#5F6C72] text-[12px] flex justify-center'>
                        Enter old and new Passwords here,{' '}
                    </div>
                    <div className='flex flex-col gap-2 bg-red- w-[90%]'>
                        <div className='flex justify-between'>
                            <div className='text-[12px] font-semibold '>Old Password</div>
                        </div>
                        <input
                            name='oldPassword'
                            type='password'
                            className={`border h-[35px] ${
                                errors.oldPassword ? 'outline-red-400 ' : 'outline-none'
                                }`}
                            value={values.oldPassword}
                            onChange={handleChange}
                            aria-describedby={errors.oldPassword ? 'oldPasswordError' : ''}
                        />
                        {/* Error message */}
                        {errors.oldPassword && (
                            <div id="oldPasswordError" className="text-red-500 text-xs">
                                {errors.oldPassword}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 bg-red- w-[90%]'>
                        <div className='flex justify-between'>
                            <div className='text-[12px] font-semibold '>New Password</div>
                        </div>
                        <input
                            name='newPassword'
                            type='password'
                            className={`border h-[35px] ${
                                errors.newPassword ? 'outline-red-400 ' : 'outline-none'
                                }`}
                            value={values.newPassword}
                            onChange={handleChange}
                            aria-describedby={errors.newPassword ? 'newPasswordError' : ''}
                        />
                        {/* Error message */}
                        {errors.newPassword && (
                            <div id="newPasswordError" className="text-red-500 text-xs">
                                {errors.newPassword}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 bg-red- w-[90%]'>
                        <div className='flex justify-between'>
                            <div className='text-[12px] font-semibold '>Confirm Password</div>
                        </div>
                        <input
                            name='confirmNewPassword'
                            type='password'
                            className={`border h-[35px] ${
                                errors.confirmNewPassword ? 'outline-red-400 ' : 'outline-none'
                                }`}
                            value={values.confirmNewPassword}
                            onChange={handleChange}
                            aria-describedby={errors.confirmNewPassword ? 'confirmNewPasswordError' : ''}
                        />
                        {/* Error message */}
                        {errors.confirmNewPassword && (
                            <div id="confirmNewPasswordError" className="text-red-500 text-xs">
                                {errors.confirmNewPassword}
                            </div>
                        )}
                    </div>
                    <button
                        className='mt-2 font-Playfair bg-orange-500 w-[90%] h-[40px] rounded-md text-[#ffff] flex justify-center items-center '
                        onClick={handleSubmit}
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ReNewPasswordPage;
