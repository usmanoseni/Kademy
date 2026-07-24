import React from 'react';
import type { Dispatch, SetStateAction } from "react";
import { Link } from 'react-router-dom';
import { assets } from '../../asserts/assert';
import {useRef, useState } from 'react';
import { StudentAuth } from '../../client/server/api';
import { LoaderCircle } from "lucide-react";

type ForgetPasswordProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};


const ForgetPassword: React.FC<ForgetPasswordProps> = ({ theme }) => { 
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [time, setTime] = useState(false);
    const [loading, setLoading] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
    const handleChange = (value: string, index: number) => {
        // Allow only numbers
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>,index: number) => {
        // Move back on Backspace
        if ( e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        }
  };
    
    return (
        <div className={`flex-col justify-center items-center w-full  h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-radial-[at_ 25%_50%_75%] from-white via-blue-100/10 to-indigo-300/20 to-90%'}`}>
            <div className={` ${theme === 'dark' ? 'pattern' :'pattern'  } w-full  h-[100vh] flex-col justify-center items-center gap-10 flex relative`} >
                <div className={`${theme === 'dark' ? '' : 'hidden'} max-sm:hidden  bg-fuchsia-600 opacity-40 brightness-70 blur-3xl absolute top-0 right-2/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135`}></div>
                <div className={`${theme === 'dark' ? '' : 'hidden'}   bg-blue-600 opacity-40 blur-3xl brightness-70 absolute top-0 right-4/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135 `}></div>

                <div className='bg-white flex z-30 rounded-3xl max-w-[26rem] mx-2.5 my-auto overflow-hidden dark:bg-slate-900/90 shadow-2xl shadow-slate-200 dark:shadow-slate-800'>
                    <div className='flex-1 p-6'>
                        <div className=' flex  items-center justify-center  pb-6 text-center text-gray-800 dark:text-gray-300 gap-1'>
                            <img src={theme ==='dark' ? assets.dark_logo :assets.logo} className='size-8' alt="" />
                            <div className='font-goldman font-semibold text-lg dark:text-white'>Kademy</div>
                        </div>

                        <p className='my-3  text-gray-600 dark:text-gray-300'>Enter your Otp code sent to your email <span className="text-indigo-600 font-medium">johnoe@gmail.com</span> </p>
                       
                        <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input maxLength={1}
                            key={index}
                            ref={(el) => {inputRefs.current[index] = el;}}
                            onChange={(e) => handleChange(e.target.value, index)} inputMode="numeric" onKeyDown={(e) => handleKeyDown(e, index)} type="text" value={digit} className="size-10 text-center  font-semibold border-1 dark:border-gray-400 border-gray-300 rounded-lg outline-none focus:border-orange-500 dark:bg-gray-800 text-slate-800 dark:text-white" />
                        ))}
                        </div>
                        {time &&(
                            <div className="flex justify-between item-center my-4 text-sm ">
                            <span className="text-slate-500 dark:text-slate-300">Didn't not recieved?</span>
                            <span className="text-indigo-500 font-semibold cursor-pointer ">Resend</span>
                        </div>
                        )}
                        
                        {!time &&(
                        <div className="flex justify-between item-center my-4 text-sm ">
                            <span className="text-slate-500 dark:text-slate-300">Check your email?</span>
                            <span className="text-indigo-500 font-medium  cursor-pointer ">02:59</span>
                        </div>
                        )}

                        <div className=''>
                            <button className='w-2/3 mx-auto mt-12 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed  flex justify-center items-center bg-linear-to-br from-indigo-500 to-indigo-700 text-white py-2 md:py-2.5 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-indigo-800'>{loading ? <>  <LoaderCircle className="w-5 h-5 animate-spin" /> Please wait...</> : "Confirmed"}    </button>
                        </div>
                        <div className='flex justify-center items-center mt-4.5 '>
                                <span className='text-gray-600 dark:text-gray-300'>Go back to </span>
                                <Link to='/auth/student/login'><button className='ml-2 text-indigo-500  dark:text-indigo-400 dark:hover:text-orange-400 hover:text-orange-600  cursor-pointer'>Login</button></Link>
                            </div>
                    </div>
                </div>
                <div className="absolute  bottom-0 py-6 z-40  text-center text-xs lg:text-sm text-gray-400 dark:text-slate-500">   © {new Date().getFullYear()} Kademy E-Learning Platform. All rights reserved. Designed by HusTech</div>
            </div>
           
        </div>
           
    )
}

export default ForgetPassword;
