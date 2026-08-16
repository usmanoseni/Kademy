import React from 'react';
import type { Dispatch, SetStateAction } from "react";
import { assets } from '../../asserts/assert';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { StudentAuth } from '../../client/server/api';
import { LoaderCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

type VerifyEmailProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const VerifyEmail: React.FC <VerifyEmailProps > = ({ theme }) => { 

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: ""});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    function update (event: React.ChangeEvent<HTMLInputElement>) {
        setForm((current) => ({ ...current, email: event.target.value }));
    }

    const check = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        try{
            const email = form.email.trim();
            
            if (!email) {
            setError("Please fill your email field");
            return;
            }

            const res = await StudentAuth.verifyEmail(email);
            if (res.success && res.student) {
                await StudentAuth.requestPasswordResetOtp(email);
                localStorage.setItem("verifyEmail", email);
                localStorage.setItem("otpRequestedAt", Date.now().toString());
                toast.success("Sucessful");
                   setTimeout(() => navigate("/auth/student/reset-password", { replace: true }), 1200); 
            } else {
                setError("Email not found");
                setForm((current) => ({...current, email: "",}));
            }
        } catch (err: any) {
           const message =
        !navigator.onLine
            ? "You are offline. Please connect to the internet."
            : err.response?.data?.message || "Email not found";
            setError(message);
        setForm((current) => ({...current, email: "",}));
        } finally {
            setLoading(false);
        }
    }

    
    return (
        <div className={`flex-col justify-center items-center w-full  h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-radial-[at_ 25%_50%_75%] from-white via-blue-100/10 to-indigo-300/20 to-90%'}`}>
            <div className={` ${theme === 'dark' ? 'pattern' :'pattern'  } w-full  h-[100vh] flex-col justify-center items-center gap-10 flex relative`} >
                <div className={`${theme === 'dark' ? '' : 'hidden'} max-sm:hidden  bg-fuchsia-600 opacity-40 brightness-70 blur-3xl absolute top-0 right-2/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135`}></div>
                <div className={`${theme === 'dark' ? '' : 'hidden'}   bg-blue-600 opacity-40 blur-3xl brightness-70 absolute top-0 right-4/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135 `}></div>

                <div className='bg-white flex z-30 rounded-3xl w-[26rem] mx-2.5 my-auto  overflow-hidden dark:bg-slate-900/90 shadow-2xl shadow-slate-200 dark:shadow-slate-800'>
                    <div className='flex-1 p-6'>
                        <div className=' flex  items-center justify-center pb-5 text-center text-gray-800 dark:text-gray-300 gap-1'>
                            <img src={theme ==='dark' ? assets.dark_logo :assets.logo} className='size-8' alt="" />
                            <div className='font-goldman font-semibold text-lg dark:text-white'>Kademy</div>
                        </div>
                        <div>
                            <div>
                                <h3 className='text-2xl font-bold text-blue-950 dark:text-white'>Can't log in?</h3>
                                <p className='mt-2  text-gray-600 dark:text-gray-300'>Type your email so we can send you a password recovery email</p>
                            </div>
                             {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error}
                                </p>
                            )}
                             {success && (
                                <p role="status" className="mt-2 rounded-md bg-green-100 px-3 py-2 text-sm text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                    {success}
                                </p>
                            )}
                            <form onSubmit={check} className='mt-4'>
                                <label >
                                    <span className="after:content-['*'] dark:text-slate-200 after:text-red-400 after:ml-0.5 text-sm font-medium  text-gray-800 datk:text-gray-300">Email</span>
                                    <div className="relative mb-3">
                                        <input type="email" name="email" value={form.email} onChange={update}  placeholder="Enter your email" className=" font-medium text-slate-700 invalid:outline-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500 text-sm disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 mt-1 :placeholder:text-gray-400 px-2  py-2 pl-10  block w-full rounded-sm invisible:outline-1 outline-1 outline-slate-400/60 dark:bg-gray-800 dark:text-white dark:outline-gray-600 dark:focus:outline-indigo-400 focus:outline-indigo-500 shadow-sm " />
                                        <div className="absolute inset-y-0 left-0 flex items-center px-1.5 pointer-events-none bg-slate-100 justify-center rounded-l-sm dark:bg-gray-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500 dark:text-gray-300">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                                <div className=''>
                                    <button type="submit" disabled={loading} className='w-2/3 mx-auto mt-4 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed  flex justify-center items-center bg-linear-to-br from-indigo-500 to-indigo-700 text-white py-2 md:py-2.5 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-indigo-800'>{loading ? <>  <LoaderCircle className="w-5 h-5 animate-spin" /> Please wait...</> : "verify email"}    </button>
                                    </div>
                                    <div className='flex justify-center items-center mt-4.5 '>
                                        <span className='text-gray-600 dark:text-gray-300'>Go back to </span>
                                        <Link to='/auth/student/login'><button className='ml-2 text-indigo-500  dark:text-indigo-400 dark:hover:text-orange-400 hover:text-orange-600  cursor-pointer'>Login</button></Link>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="absolute  bottom-0 py-6 z-40  text-center text-xs lg:text-sm text-gray-400 dark:text-slate-500">   © {new Date().getFullYear()} Kademy E-Learning Platform. All rights reserved. Designed by HusTech</div>
            </div>
        </div>
           
    )
}

export default VerifyEmail;
