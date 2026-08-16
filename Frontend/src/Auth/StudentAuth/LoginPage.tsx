import React from 'react';
import type { Dispatch, SetStateAction } from "react";
import { assets } from '../../asserts/assert';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { StudentAuth } from '../../client/server/api';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

type StudentLoginProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const LoginPage: React.FC <StudentLoginProps > = ({ theme }) => { 
    const navigate = useNavigate();

    const getApiErrorMessage = (error: any, fallback: string) => {
      const data = error?.response?.data;
      if (typeof data?.message === 'string' && data.message.trim()) {
        return data.message;
      }
      if (typeof data?.msg === 'string' && data.msg.trim()) {
        return data.msg;
      }
      if (typeof data?.error === 'string' && data.error.trim()) {
        return data.error;
      }
      if (typeof error?.message === 'string' && error.message.trim()) {
        return error.message;
      }
      return fallback;
    };

    const startSocialLogin = async (provider: 'google' | 'facebook') => {
      setError('');
      if (!navigator.onLine) {
        setError('You are offline. Please connect to the internet and try again.');
        return;
      }

      try {
        setLoading(true);
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiBaseUrl}/auth/student/${provider}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.message || `${provider === 'google' ? 'Google' : 'Facebook'} sign-in could not be started.`);
        }

        if (data.authUrl) {
          window.location.href = data.authUrl;
          return;
        }

        throw new Error('The sign-in service did not return an authorization URL.');
      } catch (err: any) {
        const message = !navigator.onLine
          ? 'You are offline. Please connect to the internet and try again.'
          : getApiErrorMessage(err, `${provider === 'google' ? 'Google' : 'Facebook'} sign-in could not be started.`);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    
    const signInWithGoogle = () => startSocialLogin('google');
    const signInWithFacebook = () => startSocialLogin('facebook');
    const [password, setPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    function update (event: React.ChangeEvent<HTMLInputElement>) {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    }

    const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError("");
        setSuccess("");
        if (!form.email || !form.password) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }
        const res = await StudentAuth.login({email: form.email.trim(), password: form.password});
        if (res.user) {
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Login successful! ");
            setTimeout(() => navigate("/student/dashboard", { replace: true }), 1200);
        } else {
            setError("Incorrect email or password");
            setForm((current) => ({...current, password: "",}));
        }
    } catch (err: any) {
        const message = !navigator.onLine
            ? "You are offline. Please connect to the internet and try again."
            : "Incorrect email or password";
        setError(message);
        setForm((current) => ({...current, password: "",}))
    } finally {
        setLoading(false);
    }
    }
    return (
        <div className={`flex-col justify-center items-center w-full  h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-radial-[at_ 25%_50%_75%] from-white via-blue-100/10 to-indigo-300/20 to-90%'}`}>
            <div className={` ${theme === 'dark' ? 'pattern' :'pattern'  } w-full lg:h-screen  flex-col justify-center items-center gap-10 flex relative`} >
                <div className={`${theme === 'dark' ? '' : 'hidden'} max-sm:hidden  bg-fuchsia-600 opacity-40 brightness-70 blur-3xl absolute top-0 right-2/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135`}></div>
                <div className={`${theme === 'dark' ? '' : 'hidden'}   bg-blue-600 opacity-40 blur-3xl brightness-70 absolute top-0 right-4/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135 `}></div>
                
                <div className='bg-white flex z-30 rounded-3xl 4/5 lg:w-3/5 my-14 mx-2 md:my-12 lg:my-16 overflow-hidden dark:bg-slate-900/90 shadow-2xl shadow-slate-200 dark:shadow-slate-800'>
                    <div className='relative hidden lg:flex w-1/2 overflow-hidden rounded-l-3xl'>
                        <img src={assets.bg1} alt='Decorative background' className='h-full w-full object-cover' />
                        <div className='absolute inset-0 bg-linear-to-br from-blue-800/80 to-violet-800/80' />
                        <div className='absolute flex items-center justify-center p-6 text-center text-white gap-1'>
                            <img src={ assets.dark_logo} className='size-7' alt="" />
                            <div className='font-goldman font-semibold text-lg'>Kademy</div>
                        </div>
                        <div className='absolute inset-0 flex items-center justify-center p-6 text-center text-white'>
                            <div>
                                <h2 className='text-2xl font-semibold'>Welcome back</h2>
                                <p className='mt-2 text-sm text-blue-100'>Continue your learning journey with Kademy.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 p-6'>
                        <div className=' flex lg:hidden items-center justify-center p-3 text-center text-gray-800 dark:text-gray-300 gap-1'>
                            <img src={theme ==='dark' ? assets.dark_logo :assets.logo} className='size-8' alt="" />
                            <div className='font-goldman font-semibold text-lg dark:text-white'>Kademy</div>
                        </div>

                        <div className='flex justify-between items-center mb-4 text-xs'>
                            <span className='text-gray-600 dark:text-gray-300'>Didn't have an account?</span>
                            <Link to='/auth/student/register'><button className='ml-2 text-indigo-500  dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-100/70 hover:border-transparent px-3 py-1.5 cursor-pointer border border-indigo-400/70 rounded-md'>Sign up</button></Link>
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-blue-950 dark:text-white'>Login</h3>
                            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>Sign in to access your lessons and study materials.</p>
                        </div>
                        <div>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error}
                                </p>
                            )}
                           
                            <form onSubmit={submit}  className='mt-4'>
                                <label >
                                    <span className="after:content-['*'] dark:text-slate-200 after:text-red-400 after:ml-0.5 text-sm font-medium  text-gray-800 datk:text-gray-300">Email</span>
                                    <div className="relative mb-3">
                                        <input type="email" name="email" value={form.email} onChange={update} placeholder="Enter your email" className=" font-medium text-slate-700 invalid:outline-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500 text-sm disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 mt-1 :placeholder:text-gray-400 px-2  py-2 pl-10  block w-full rounded-sm invisible:outline-1 outline-1 outline-slate-400/60 dark:bg-gray-800 dark:text-white dark:outline-gray-600 dark:focus:outline-indigo-400 focus:outline-indigo-500 shadow-sm " />
                                        <div className="absolute inset-y-0 left-0 flex items-center px-1.5 pointer-events-none bg-slate-100 justify-center rounded-l-sm dark:bg-gray-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500 dark:text-gray-300">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                                <label className='' >
                                    <span className="after:content-['*'] dark:text-slate-200 after:text-red-400 after:ml-0.5 text-sm font-medium  text-gray-800 datk:text-gray-300">Password</span>
                                    <div className="relative">
                                        <input value={form.password} onChange={update} name="password" type={password ? "text" : "password"} placeholder="Enter password" className="invalid:outline-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500 text-sm disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 mt-1 :placeholder:text-gray-400 px-2  py-2 pl-10 font-medium text-gray-800 block w-full rounded-sm invisible:outline-1 outline-1 outline-slate-400/60 dark:bg-gray-800 dark:text-white dark:outline-gray-600 dark:focus:outline-indigo-400 focus:outline-indigo-500 shadow-sm " />
                                        <div className="absolute inset-y-0 left-0 flex items-center px-1.5 pointer-events-none bg-slate-100 justify-center rounded-l-sm dark:bg-gray-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500 dark:text-gray-300">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                        </div>
                                        <div onClick={() => setPassword(!password )} className="absolute inset-y-0 right-0 flex items-center px-1.5 cursor-pointer justify-center rounded-l-sm ">
                                            { !password ?(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  className="size-5 text-gray-500 dark:text-gray-300 hover:text-indigo-600">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>)
                                                : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  className="size-5 text-indigo-600">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                                 ) } 
                                        </div>
                                    </div>
                                </label>
                                <div className='flex justify-end mt-2'>
                                    <Link to={'/auth/student/verify-email'} className='text-indigo-500 text-sm font-medium cursor-pointer'>Forget password</Link>
                                </div>
                                <div className=''>
                                    <button type="submit" disabled={loading} className='w-2/3 mx-auto mt-4 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed  flex justify-center items-center bg-linear-to-br from-indigo-500 to-indigo-700 text-white py-2 md:py-2.5 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-indigo-800'>{loading ? <>  <LoaderCircle className="w-5 h-5 animate-spin" /> Please wait...</> : "Login"}    </button>
                                </div>
                            </form>
                            
                            <div className="flex items-center my-3 md:my-4 ">
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                            <span className="px-4 text-xs md:text-sm text-gray-500">OR</span>
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                            </div>

                            <div className=" flex justify-center items-center gap-3">
                                <button disabled={loading} aria-busy={loading} type="button" onClick={signInWithGoogle} className="w-full cursor-pointer flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-sm py-2 md:py-2.5 lg:py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="size-4 md:size-5">
                                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
                                        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2c-2.1 1.5-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
                                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.6-6.2 7.2l6.2 5.2C39.1 37 44 31.1 44 24c0-1.3-.1-2.3-.4-3.5z"/>
                                    </svg>
                                    Google
                                </button>
                                <button disabled={loading} aria-busy={loading} type="button" onClick={signInWithFacebook} className="w-full cursor-pointer flex items-center justify-center gap-3 border border-gray-300 rounded-lg  text-sm py-2 md:py-2.5 lg:py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-4 md:size-5 ">
                                        <path fill="#1976D2" d="M22 12A10 10 0 1 0 10.4 21.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12"/>
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute  bottom-0 py-5 z-40  text-center text-xs lg:text-sm text-gray-400 dark:text-slate-500">   © {new Date().getFullYear()} Kademy E-Learning Platform. All rights reserved. Designed by HusTech</div>
            </div>
        </div>
           
    )
}

export default LoginPage;
