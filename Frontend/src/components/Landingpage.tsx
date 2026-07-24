import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import '../index.css';
import { assets as assert, assets, gender } from '../asserts/assert';

type LandingpageProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Landingpage: React.FC<LandingpageProps> = ({ theme, setTheme }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
            const footerEl = footerRef.current;
            if (!footerEl) return;
            const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => setIsFooterVisible(entry.isIntersecting));
            },
            { root: null, threshold: 0.1 }
            );
            obs.observe(footerEl);
            return () => obs.disconnect();
        }, []);

    useEffect(() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      const showImages = (index: number) => {
        const nextIndex = index >= gender.length ? 0 : index;
        setCurrentIndex(nextIndex);
        timeoutId = setTimeout(() => {
          showImages(nextIndex + 1);
        }, 60000 * 0.2);
      };
      showImages(0);
      return () => clearTimeout(timeoutId);
    }, []);

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => { 
      scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    }

    const scrollRight = () => {
      scrollRef.current?.scrollBy({
        left: 200,
        behavior: 'smooth',
      })
    }




    return (
      <div className={`flex-col justify-center items-center w-full  h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-radial-[at_25%_50%_75%] from-white via-blue-100/10 to-indigo-300/20 to-90%'}`}>
        <div className={`${theme === 'dark' ? 'pattern' : 'pattern'} w-full h-[100vh] max-sm:h-[75vh]  flex-col justify-center items-center gap-10 flex relative`}>
          <Navbar theme={theme} setTheme={setTheme} hideOnFooter={isFooterVisible} />
          <img className={`${theme === 'dark' ? 'hidden' : ''} max-sm:w-24 max-sm:h-24  max-w-40 max-h-40 min-w-16 min-h-16 rounded-lg absolute  right-10 top-22 opacity-10`} src={assert.jamb} alt="Logo" />
          <img className={`${theme === 'dark' ? 'hidden' : ''} max-sm:w-24 max-sm:h-24  max-w-40 max-h-40 min-w-16 min-h-16 rounded-lg absolute  right-20 bottom-16 opacity-10 `} src={assert.neco} alt="Logo" />
          <img className={`${theme === 'dark' ? 'hidden' : ''} max-sm:w-24 max-sm:h-24  max-w-40 max-h-40 min-w-16 min-h-16 rounded-lg absolute  left-10  opacity-10 `} src={assert.weac} alt="Logo" />
          <div className='relative w-full z-10 flex-col justify-center items-center gap-6 top-8 '>
            <h1 className='max-sm:text-3xl text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 font-google-sans-flex  text-center px-4 dark:text-white  mb-6'>Unlock Your Potential <span className='bg-gradient-to-tr  from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent'>Through</span> <br /> Easy Learning</h1>
            <p className='text-gray-700 dark:text-gray-300 max-sm:text-sm mx-auto max-sm:w-full w-4/6 text-center  text-base font-noto-sans-display md:text-lg mb-8 px-4'>Discover a smarter way to learn with easy-to-follow lessons, comprehensive study materials, and personalized learning experiences.</p>
          </div>
          <div className='flex justify-center items-center gap-4 '>
            <Link to="/auth/student/register"><button className='border border-gray-900 px-6 max-sm:text-sm py-2 rounded-md cursor-pointer font-medium hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-700 hover:text-white relative z-20 dark:border-white hover:border-indigo-600 '>
              Register
            </button></Link>
            <Link to="/auth/student/login"><button className="flex max-sm:text-sm bg-gradient-to-br from-blue-500 to-indigo-700 cursor-pointer transition-all duration-200 text-white py-2 px-3 justify-center items-center relative z-20 gap-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700">
              Start Learning
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white max-sm:size-5.5 size-7 rotate-45 ">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
              </svg>
            </button></Link>
          </div>
        </div>

        <div className={`${theme === 'dark' ? '' : 'hidden'} max-sm:hidden  bg-fuchsia-600 opacity-40 brightness-70 blur-3xl absolute top-20 rounded-3xl z-0 w-30 h-[80vh] rotate-160 md:rotate-150 lg:rotate-135`}></div>
        <div className={`${theme === 'dark' ? '' : 'hidden'}   bg-blue-600 opacity-40 blur-3xl brightness-70 absolute top-14 right-1/2 rounded-3xl z-0 w-30 h-[80vh] rotate-160 md:rotate-150 lg:rotate-135 `}></div>

        <div data-animate className='bg-slate-50  dark:bg-slate-800/40   '>
          <div className='grid grid-cols-1 md:grid-cols-2 relative gap-16 w-4/5 mx-auto py-12 '>
            <div className='flex-col gap-6 justify-center content-center w-full h-full '>
              <h2 className='text-2xl/8 md:text-3xl/10 lg:text-4xl/12  font-bold text-blue-950 mb-2 dark:text-white font-google-sans-flex'>The Purpose Behind <br /> Our Platform?</h2>
              <p className='text-gray-800 md:font-medium text-base/7 dark:text-neutral-300  '>We are dedicated to providing senior secondary school students in west africa countries  with the tools they need to understand, practice, and succeed in any examination councils such as WEAC, NECO, JAMB etc . Through high-quality video lessons,PDF notes, and interactive assessments by making learning simple, engaging, and accessible to everyone.</p>
            </div>
            <div className='relative p-3 '>
              <div className='absolute w-45 z-10 h-60 top-0 left-0 bg-gradient-to-br from-purple-600 to-fuchsia-400 rounded-l-lg  '></div>
              <div className='absolute w-45 z-10 h-60 bottom-0 right-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-r-lg '></div>
              <img className='rounded-lg object-cover w-full h-[25rem] relative z-20 shadow-2xl' src={gender[currentIndex]} alt="Purpose Image" />
            </div>
          </div>
        </div>

        <div data-animate className='bg-white w-full h-full dark:bg-slate-900'>
          <div className='flex justify-center items-center w-full h-full py-12' >
          <div className="relative w-5/6 rounded-xl overflow-hidden shadow-2xl shadow-slate-400 dark:shadow-slate-800">
            <img src={assert.bg2} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/70 to-teal-400/70 h-full"></div>
            <div className="relative z-10 px-7 grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
             <div className='relative flex-col gap-6 justify-center content-center w-full h-full '> 
                <h2 className='text-2xl/8 md:text-3xl/10 lg:text-4xl/12  font-bold text-blue-950 mb-2  font-google-sans-flex max-sm:text-center'>Benefits of Using <br /> Our Platform</h2>
                <p className='text-white leading-5 md:font-medium text-base/7  max-sm:text-center font-noto-sans-display '>Designed to help secondary school students learn faster, understand better, and stay motivated.</p>
              </div>
               <div className='flex-col gap-1 justify-center content-center w-full h-full '>
                <div className=' max-sm:flex-col max-sm:gap-2.5 flex justify-start items-start gap-4 p-2 text-white max-sm:mb-3 mb-3'>
                  <div className='bg-orange-500 py-3.5 px-3.5 rounded-full max-sm:p-2.5 '><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 max-sm:size-5.5">
                  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                  </svg></div>
                  <div className='max-sm:flex-col gap-1.5 justify-start items-center '>
                    <h4 className=' text-lg max-sm:text-base font-semibold text-gray-950 mb-1 ' >Easy-to-Understand Video Lessons</h4>
                    <p className='text-neutral-200  leading-5.5 text-sm font-noto-sans-display '>Our video lessons break down complex topics into simple, clear explanations that students can easily follow. Each lesson is guided by experienced educators who make learning enjoyable and stress-free.</p>
                  </div>
                </div>
                <div className='max-sm:flex-col flex justify-start items-start max-sm:gap-2.5 gap-4 p-2 text-white  max-sm:mb-3 mb-3'>
                  <div className='bg-orange-500 py-3.5 px-3.5 max-sm:p-2.5   rounded-full'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 max-sm:size-5.5">
                    <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className='max-sm:flex-col gap-1.5 justify-start items-center '>
                    <h4 className='text-lg max-sm:text-base font-semibold text-gray-950 mb-1 ' >Learn at Your Own Pace</h4>
                    <p className='text-neutral-200 text-sm leading-5.5 font-noto-sans-display  '>Every student learns differently that’s why we let you study on your own schedule. Pause, rewind, or replay lessons anytime until you fully understand each topic.</p>
                  </div>
                </div>
                <div className=' max-sm:flex-col flex justify-start items-start max-sm:gap-2.5 gap-4 p-2 text-white  max-sm:mb-3 mb-4'>
                  <div className='bg-orange-500 py-3.5 px-3.5 max-sm:p-2.5  rounded-full'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 max-sm:size-5.5">
                    <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                    <path fill-rule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div className='flex-col gap-1.5 justify-start items-center '>
                    <h4 className='text-lg max-sm:text-base font-semibold text-gray-950 mb-1 ' >Available on All Devices</h4>
                    <p className='text-neutral-200 text-sm leading-5.5 font-noto-sans-display  '>Whether you’re using a phone, tablet, or laptop, you can access your lessons anywhere. Your learning experience stays smooth and uninterrupted across all devices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className='flex-col justify-center items-center w-full h-full bg-slate-50 dark:bg-slate-800/40 py-12'>
           <div className='flex-col gap-6 justify-center items-center max-sm:w-full w-5/6 px-5 h-full m-auto mb-5 '>
              <h2 className='text-2xl/8 md:text-3xl/10 text-center lg:text-4xl/12 font-bold text-blue-950 mb-2 dark:text-white font-google-sans-flex'>Supported Examination Board </h2>
              <p className='text-gray-800 md:font-medium text-base/7 max-md:text-sm max-md:font-medium dark:text-neutral-300 text-center font-noto-sans-display  '>Our lessons and study materials follow the curriculum of major examination boards, ensuring students are fully prepared for school assessments and standardized exams.</p>
          </div>
          
          <div className='relative '>
            <div onClick={scrollRight} className='absolute bg-white ring-1 ring-slate-300 p-1 rounded-full hover:cursor-pointer right-5.5 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200 max-sm:right-4.5 dark:ring-slate-50 dark:bg-slate-900  '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-slate-700 dark:text-white max-sm:size-4.5 ">
              <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
            </svg>
            </div>
            <div ref={scrollRef} className='h-full mx-20 max-sm:mx-12 relative overflow-x-auto scroll-smooth no-scrollbar p-2 flex gap-4 justify-between  items-center '>
              <div className='bg-white max-sm:w-[8rem] max-w-[15rem] min-w-[25rem] p-2.5 ring-2 ring-slate-400/50 rounded-md shadow-md dark:ring-slate-50/50  dark:bg-slate-800 '>
                <div className='flex justify-start items-center gap-2.5'>
                  <img src={assets.weac} className='size-20 max-sm:size-16 ring-1 ring-slate-300 p-2 dark:bg-slate-800  rounded-2xl ' alt="" />
                  <div className='max-sm:text-sm font-medium text-slate-800 dark:text-slate-100'> West African Examinations Council (WAEC)</div>
               </div>
                <div className='text-gray-800 mt-2 w-full h-30 max-sm:h-26  line-clamp-5 overflow-hidden font-light dark:text-slate-200 max-sm:text-sm '>
                 WAEC is a regional examination body established in 1952 to conduct standardized exams across Anglophone West African countries, including Nigeria, Ghana, Sierra Leone, The Gambia, and Liberia. In Nigeria, WAEC conducts the Senior Secondary School Certificate Examination (SSCE), which is the main qualification for students completing secondary school.
                </div>
                <div className='w-full flex justify-end mt-3'>
                    <button className='flex bg-gradient-to-bl from-blue-600  to-violet-700 px-6 py-1.5 max-sm:px-4 max-sm:py-1  hover:cursor-pointer mt-2 text-white text-sm rounded-sm -translate-x-1/2 -mr-10 hover:scale-110 transition-all duration-200   '><a href="https://www.waec.org" >Vist site</a></button>
                </div>
              </div>

              <div className='bg-white min-w-[15rem] min-w-[25rem]  p-2.5 ring-2 ring-slate-400/50 rounded-md shadow-md dark:ring-slate-50/50 dark:bg-slate-800 '>
              <div className='flex justify-center items-center gap-2.5'>
                  <img src={assets.jamb} className='size-20 max-sm:size-16 ring-1 ring-slate-300 dark:bg-slate-800  rounded-2xl ' alt="" />
                  <div  className='max-sm:text-sm font-medium text-slate-800 dark:text-slate-100'> Joint Admissions and Matriculation Board (JAMB)</div>
               </div>
                <div className='text-gray-800 mt-2 w-full h-30 max-sm:h-26  line-clamp-5 overflow-hidden font-light dark:text-slate-200 max-sm:text-sm '>
                 JAMB is the Nigerian body responsible for conducting entrance examinations for students seeking admission into tertiary institutions (universities, polytechnics, and colleges of education). The primary exam is the UTME (Unified Tertiary Matriculation Examination).
                </div>
                <div className='w-full flex justify-end mt-3'>
                    <button className='flex bg-gradient-to-bl from-blue-600  to-violet-700 px-6 py-1.5 max-sm:px-4 max-sm:py-1  hover:cursor-pointer   text-white text-sm rounded-sm -translate-x-1/2 -mr-10 hover:scale-110 transition-all duration-200   '><a href="https://www.jamb.gov.ng/" >Vist site</a></button>
                </div>
              </div>

              <div className='bg-white min-w-[15rem] min-w-[25rem] p-2.5 ring-2 ring-slate-400/50 rounded-md shadow-md dark:ring-slate-50/50  dark:bg-slate-800 '>
                <div className='flex justify-center items-center gap-2.5'>
                  <img src={assets.neco} className='size-20 max-sm:size-16 ring-1 ring-slate-300 dark:bg-slate-800  rounded-2xl ' alt="" />
                  <div className='max-sm:text-sm font-medium text-slate-800 dark:text-slate-100'> National Examinations Council (NECO)</div>
               </div>
                <div className='text-gray-800 mt-2 w-full h-30 max-sm:h-26 line-clamp-5 overflow-hidden font-light dark:text-slate-200 max-sm:text-sm '>
                 NECO is a Nigerian examination board established in 1999 to conduct secondary school exams and provide an alternative to WAEC for SSCE certification. NECO also conducts the National Common Entrance Examination for entry into Federal Unity Colleges.
                </div>
                <div className='w-full flex justify-end mt-3'>
                    <button className='flex bg-gradient-to-bl from-blue-600  to-violet-700 px-6 py-1.5 max-sm:px-4 max-sm:py-1  hover:cursor-pointer   text-white text-sm rounded-sm -translate-x-1/2 -mr-10 hover:scale-110 transition-all duration-200   '><a href="https://neco.gov.ng/" >Vist site</a></button>
                </div>
              </div>
            </div>
            <div onClick={scrollLeft} className='absolute bg-white ring-1 ring-slate-300 p-1 rounded-full hover:cursor-pointer left-5.5 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200  max-sm:left-4.5 dark:ring-slate-50 dark:bg-slate-900  '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-slate-700 dark:text-white max-sm:size-4.5 ">
                <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white w-full h-full dark:bg-slate-900'>
          <div className='flex justify-center items-center w-full h-full py-12' >
            <div className="relative w-5/6 rounded-xl overflow-hidden shadow-2xl shadow-slate-400 dark:shadow-slate-800">
              <img src={assert.bg3} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-indigo-700 h-full"></div>
              <div className="relative z-10 px-7 grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
                <div className='relative flex-col gap-6 justify-center content-center w-full h-full '> 
                    <h2 className='text-3xl lg:text-4xl  font-bold text-blue-950 mb-2  font-google-sans-flex max-md:text-center'>Start learning at <br /> your pace now</h2>
                      <p className='text-white leading-5 text-base/7 max-sm:text-sm  max-md:text-center font-noto-sans-display '>Take control of your learning journey with flexible lessons designed around your schedule</p>
                      <Link to="/Auth/Student/Register"><button className="flex max-md:hidden max-sm:text-sm mt-6 bg-gradient-to-br  from-orange-400 to-rose-600 cursor-pointer transition-all duration-200 text-white py-2 px-3 justify-center items-center relative z-20 gap-2.5 rounded-lg hover:from-orange-600 hover:to-rose-700">
                            Rigister with Us 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white max-sm:size-5.5 size-7 rotate-45 ">
                              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                            </svg>
                        </button></Link>
                </div>
                
                  <div  className='flex gap-3 justify-center lg:justify-evenly max-md:py-1 py-6 w-full h-full'>
                    <div className='flex-col text-white md:border-l-3 border-white px-5 py-4 content-center '>
                      <div className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-goldman font-extrabold '>2000+</div>
                      <div className='ext-base md:text-lg ffont-semibold text-orange-200 '>Students</div>
                    </div>
                    <div className='flex-col text-white border-l-3 border-white px-5 py-4 content-center '>
                      <div className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl  font-goldman font-extrabold '>158+</div>
                      <div className='text-base md:text-lg font-semibold text-orange-200 '>Tutors</div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <Link to="/Auth/Student/Register"><button className="flex md:hidden max-sm:text-sm  bg-gradient-to-br  from-orange-400 to-rose-600 cursor-pointer transition-all duration-200 text-white py-2 px-3 justify-center items-center relative z-20 gap-2.5 rounded-lg hover:from-orange-600 hover:to-rose-700">
                            Rigister with Us 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white max-sm:size-5.5 size-7 rotate-45 ">
                              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                            </svg>
                        </button></Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={footerRef} className="w-full">
          <Footer />
        </div>
        
    </div>
    )
  }

  export default Landingpage
