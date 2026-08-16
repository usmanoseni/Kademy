import React, { useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../asserts/assert';
import { StudentAuth } from '../../client/server/api';
import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner";

type ResetPasswordProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const OTP_LENGTH = 6;
const OTP_VALIDITY_MS = 3 * 60 * 1000;

const ResetPassword: React.FC<ResetPasswordProps> = ({ theme }) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [otpRequestedAt, setOtpRequestedAt] = useState(() => Number(localStorage.getItem('otpRequestedAt')) || Date.now());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [otpVerified, setOtpVerified] = useState(false)
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const email = localStorage.getItem('verifyEmail') || '';

  useEffect(() => {
    if (!email) {
      navigate('/auth/student/verify-email', { replace: true });
      return;
    }

    const updateCountdown = () => setSecondsLeft(Math.max(0, Math.ceil((otpRequestedAt + OTP_VALIDITY_MS - Date.now()) / 1000)));
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [email, navigate, otpRequestedAt]);

  const updateOtp = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    setOtp((current) => current.map((digit, digitIndex) => digitIndex === index ? value : digit));
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const pasteOtp = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedOtp = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pastedOtp) return;
    event.preventDefault();
    setOtp(Array.from({ length: OTP_LENGTH }, (_, index) => pastedOtp[index] || ''));
    inputRefs.current[Math.min(pastedOtp.length, OTP_LENGTH - 1)]?.focus();
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 6) return setError('Your new password must be at least 6 characters.');
    if (password !== confirmPassword) return setError('Your passwords do not match.');

    setLoading(true);
    try {
      await StudentAuth.resetPassword(email, password);
      localStorage.removeItem('verifyEmail');
      localStorage.removeItem('otpRequestedAt');
      toast.success('Password updated sucessfully. ');
      window.setTimeout(() => navigate('/auth/student/login', { replace: true }), 1400);
    } catch (requestError: any) {
      setError(requestError.response?.data?.msg || requestError.response?.data?.message || 'Unable to reset your password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await StudentAuth.requestPasswordResetOtp(email);
      const requestedAt = Date.now();
      localStorage.setItem('otpRequestedAt', requestedAt.toString());
      setOtpRequestedAt(requestedAt);
      setSecondsLeft(OTP_VALIDITY_MS / 1000);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
      setMessage('A new code has been sent to your email.');
    } catch (requestError: any) {
      setError(requestError.response?.data?.msg || requestError.response?.data?.message || 'Unable to resend the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
    return setError("Please enter the complete OTP.");
    }
    setLoading(true);
    try {
      const Otp = await StudentAuth.verifyOtp(email, otpCode);
      if (!Otp.success) return setError('Invalid otp code.');
      toast.success("Otp code verified")
      setOtpVerified(true)
    } catch (requestError: any) {
      setError(requestError.response?.data?.msg || requestError.response?.data?.message || 'Unable to resend the code.');
    } finally {
      setLoading(false);
    }
  }
  const formattedTime = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`;

  return (
    <div className={`flex-col justify-center items-center w-full  h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-radial-[at_ 25%_50%_75%] from-white via-blue-100/10 to-indigo-300/20 to-90%'}`}>
      <div className={` ${theme === 'dark' ? 'pattern' :'pattern'  } w-full  h-[100vh] flex-col justify-center items-center gap-10 flex relative`} >
        <div className={`${theme === 'dark' ? '' : 'hidden'} max-sm:hidden  bg-fuchsia-600 opacity-40 brightness-70 blur-3xl absolute top-0 right-2/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135`}></div>
        <div className={`${theme === 'dark' ? '' : 'hidden'}   bg-blue-600 opacity-40 blur-3xl brightness-70 absolute top-0 right-4/6 rounded-3xl z-0 w-30 h-full rotate-160 md:rotate-150 lg:rotate-135 `}></div>

        {!otpVerified ? (
          <div className='bg-white flex z-30 rounded-3xl w-[25rem] mx-2.5 my-auto  overflow-hidden dark:bg-slate-900/90 shadow-2xl shadow-slate-200 dark:shadow-slate-800'>
            <div className='flex-1 p-6'>
              <div className=' flex  items-center justify-center pb-5 text-center text-gray-800 dark:text-gray-300 gap-1'>
                <img src={theme ==='dark' ? assets.dark_logo :assets.logo} className='size-8' alt="" />
                <div className='font-goldman font-semibold text-lg dark:text-white'>Kademy</div>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Enter the otp code sent to your email <br /><span className="font-medium text-indigo-600">{email}</span></p>
              {error && <p className="mt-3 text-sm text-red-500" role="alert">{error}</p>}
              <div className="flex justify-center gap-3  mt-3">
                {otp.map((digit, index) => ( <input key={index} ref={(input) => { inputRefs.current[index] = input; }} value={digit} maxLength={1} inputMode="numeric" autoComplete={index === 0 ? 'one-time-code' : 'off'} onPaste={pasteOtp} onChange={(event) => updateOtp(event.target.value, index)} onKeyDown={(event) => { if (event.key === 'Backspace' && !digit && index > 0) inputRefs.current[index - 1]?.focus(); }} className="size-11 rounded-lg border border-gray-300 text-center font-semibold text-slate-800 outline-none focus:border-indigo-500 dark:border-gray-500 dark:bg-gray-800 dark:text-white" aria-label={`OTP digit ${index + 1}`} />))}
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className='text-slate-700 dark:text-slate-300'>Check your email?</div>
                <div>
                  {secondsLeft > 0 ? <span className="text-gray-500 font-medium dark:text-gray-300"> {formattedTime}</span>:
                  <button type="button" onClick={resendOtp} disabled={loading} className="font-medium  text-indigo-600 hover:text-indigo-800 disabled:opacity-60 cursor-pointer">Resend code</button>}
                </div>
              </div>
              <div className='mt-12'>
                <button  type="button" onClick={handleVerifyOtp}  disabled={loading} className='w-2/3 mx-auto mt-4 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed  flex justify-center items-center bg-linear-to-br from-indigo-500 to-indigo-700 text-white py-2 md:py-2.5 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-indigo-800'>{loading ? <>  <LoaderCircle className="w-5 h-5 animate-spin" /> Please wait...</> : "verify Otp"}    </button>
              </div>
              <div className='flex justify-center items-center mt-4.5 '>
                <span className='text-gray-600 dark:text-gray-300'>Go back to </span>
                <Link to='/auth/student/login'><button className='ml-2 text-indigo-500  dark:text-indigo-400 dark:hover:text-orange-400 hover:text-orange-600  cursor-pointer'>Login</button></Link>
            </div>
              
            </div>
            <div className="absolute  bottom-0 py-6 z-40  text-center text-xs lg:text-sm text-gray-400 dark:text-slate-500">   © {new Date().getFullYear()} Kademy E-Learning Platform. All rights reserved. Designed by HusTech</div>
          </div>
            ):(
          <div className='bg-white flex z-30 rounded-3xl w-[25rem] mx-2.5 my-auto  overflow-hidden dark:bg-slate-900/90 shadow-2xl shadow-slate-200 dark:shadow-slate-800'>
            <div className='flex-1 p-6'>
              <div className=' flex  items-center justify-center pb-5 text-center text-gray-800 dark:text-gray-300 gap-1'>
                <img src={theme ==='dark' ? assets.dark_logo :assets.logo} className='size-8' alt="" />
                <div className='font-goldman font-semibold text-lg dark:text-white'>Kademy</div>
              </div>
              <h1 className="text-2xl font-bold text-center text-blue-950 dark:text-white">Reset your password</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Create a new password to your email <br /><span className="font-medium text-indigo-600">{email}</span></p>
                {error && <p className="mt-3 text-sm text-red-500" role="alert">{error}</p>}
                
              <form className="mt-5" onSubmit={submit}>
                <label className='' >
                  <span className="after:content-['*'] dark:text-slate-200 after:text-red-400 after:ml-0.5 text-sm font-medium  text-gray-800 datk:text-gray-300">New password</span>
                  <div className="relative mb-3">
                      <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type={showPassword ? "text" : "password"} placeholder="Enter new password" className="invalid:outline-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500 text-sm disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 mt-1 :placeholder:text-gray-400 px-2  py-2 pl-10 font-medium text-gray-800 block w-full rounded-sm invisible:outline-1 outline-1 outline-slate-400/60 dark:bg-gray-800 dark:text-white dark:outline-gray-600 dark:focus:outline-indigo-400 focus:outline-indigo-500 shadow-sm " />
                      <div className="absolute inset-y-0 left-0 flex items-center px-1.5 pointer-events-none bg-slate-100 justify-center rounded-l-sm dark:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500 dark:text-gray-300">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      </div>
                      <div onClick={() => setShowPassword(!showPassword )} className="absolute inset-y-0 right-0 flex items-center px-1.5 cursor-pointer justify-center rounded-l-sm ">
                          { !showPassword?(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  className="size-5 text-gray-500 dark:text-gray-300 hover:text-indigo-600">
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
                <label className='' >
                  <span className="after:content-['*'] dark:text-slate-200 after:text-red-400 after:ml-0.5 text-sm font-medium  text-gray-800 datk:text-gray-300">Confirmed new password</span>
                  <div className="relative">
                      <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmpassword" type={showConfirmPassword ? "text" : "password"} placeholder="Enter confirmed password" className="invalid:outline-pink-500 invalid:text-pink-600 focus:invalid:outline-pink-500 text-sm disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 mt-1 :placeholder:text-gray-400 px-2  py-2 pl-10 font-medium text-gray-800 block w-full rounded-sm invisible:outline-1 outline-1 outline-slate-400/60 dark:bg-gray-800 dark:text-white dark:outline-gray-600 dark:focus:outline-indigo-400 focus:outline-indigo-500 shadow-sm " />
                      <div className="absolute inset-y-0 left-0 flex items-center px-1.5 pointer-events-none bg-slate-100 justify-center rounded-l-sm dark:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-gray-500 dark:text-gray-300">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      </div>
                      <div onClick={() => setShowConfirmPassword (!showConfirmPassword  )} className="absolute inset-y-0 right-0 flex items-center px-1.5 cursor-pointer justify-center rounded-l-sm ">
                          { !showConfirmPassword  ?(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  className="size-5 text-gray-500 dark:text-gray-300 hover:text-indigo-600">
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
                
                <div className='mt-12'>
                  <button type="submit"  disabled={loading} className='w-2/3 mx-auto mt-4 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed  flex justify-center items-center bg-linear-to-br from-indigo-500 to-indigo-700 text-white py-2 md:py-2.5 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-indigo-800'>{loading ? <>  <LoaderCircle className="w-5 h-5 animate-spin" /> Please wait...</> : "Reset password"}    </button>
                </div>
              </form>

              <div className='flex justify-center items-center mt-4.5 '>
                <span className='text-gray-600 dark:text-gray-300'>Go back to </span>
                <Link to='/auth/student/login'><button className='ml-2 text-indigo-500  dark:text-indigo-400 dark:hover:text-orange-400 hover:text-orange-600  cursor-pointer'>Login</button></Link>
              </div>
            </div>
            <div className="absolute  bottom-0 py-6 z-40  text-center text-xs lg:text-sm text-gray-400 dark:text-slate-500">© {new Date().getFullYear()} Kademy E-Learning Platform. All rights reserved. Designed by HusTech</div>
          </div> )}
      </div>
    </div>
  );
};
export default ResetPassword;
