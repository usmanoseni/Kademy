import Navbar from './Navbar'
import Footer from './Footer'
import { useState, useEffect, useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import '../index.css'
import satudentvid from '../videos/movie.mp4'
import { assets } from '../asserts/assert';

const listimg = [assets.man1, assets.man2, assets.man3, assets.female3, assets.female4]
const faqs = [
  {
    question: "How do I become a tutor on the platform?",
    answer:
      "Create a tutor account, complete your profile, submit the required qualifications, and wait for approval before you start teaching.",
  },
  {
    question: "How can I earn money as a tutor?",
    answer:
      "You can earn by uploading video lessons, hosting live classes, or offering premium study materials to students on the platform.",
  },
  {
    question: "Can I teach from anywhere?",
    answer:
      "Yes. You can create courses, upload content, and conduct live classes from anywhere using your computer or mobile device.",
  },
  {
    question: "Do I need to teach live classes only?",
    answer:
      "No. You can record and upload lessons, teach live sessions, or use both methods depending on your preference.",
  },
  {
    question: "How do students find my courses?",
    answer:
      "Your tutor profile showcases your qualifications, subjects, courses, and ratings, making it easier for students to discover and enroll in your classes.",
  },
  {
    question: "Can I track my students' progress?",
    answer:
      "Yes. You can monitor student enrollments, quiz performance, and overall learning progress through your tutor dashboard.",
  },
];

type TutorpageProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Tutorpage: React.FC<TutorpageProps> = ({ theme, setTheme }) => {
   const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const footerEl = footerRef.current
    if (!footerEl) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsFooterVisible(entry.isIntersecting))
      },
      { root: null, threshold: 0.1 }
    )
    obs.observe(footerEl)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`flex-col justify-center items-center w-full  h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-radial-[at_ 25%_50%_75%] from-white via-blue-100/10 to-indigo-300/20 to-90%'}`}>
      <div className={`${theme === 'dark' ? 'pattern' : 'pattern'}  w-full h-full lg:h-screen  flex-col justify-center items-center gap-10 flex relative`}>
            <Navbar theme={theme} setTheme={setTheme} hideOnFooter={isFooterVisible} />
            <div className='grid pb-24 md:pb-16 lg:pb-0 grid-cols-1 md:grid-cols-2 w-5/6 h-full items-center gap-6 relative z-10 top-14 lg:top-6 '>
                <div className='py-6 md:ml-2 '  >
                    <div className='flex items-center gap-2 mb-5'   >
                        <div className='flex   '   >
                        {listimg.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index + 1}`} className=' size-8 md:size-10 -ml-2 bg-violet-300 ring-1 ring-offset-2 ring-orange-500 dark:ring-white object-cover rounded-full' />
                        ))}
                        </div>
                        <div className='font-medium text-sm md:text-base'>Join Others +</div>
                    </div>
                    <div className='relative w-full flex-col justify-center items-center md:gap-4  '>
                        <h1 className='max-sm:text-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 font-google-sans-flex  pl-4 dark:text-white  mb-4 lg:leading-12'>How to Navigate as <br /> <span className='bg-linear-to-tr  from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent'>a Tutor</span>  </h1>
                        <p className='text-gray-700 dark:text-gray-300 max-sm:text-sm ml-4 max-sm:w-full w-full  text-base font-noto-sans-display md:text-base lg:text-lg mb-8'>A simple and personalized teaching space designed to help you create lessons, reach more students, and grow your impact with confidence.</p>
                    </div>
                    <div className='flex justify-start ml-2 md:ml-4 items-center gap-4 '>
                        <a href="#"><button className='border border-gray-900 px-6 max-sm:text-sm  py-1.5 md:py-2 rounded-md cursor-pointer font-medium hover:bg-linear-to-br hover:from-blue-500 hover:to-indigo-700 hover:text-white relative z-20 dark:border-white hover:border-indigo-600 '>
                        Create Account
                        </button></a> 
                        <a href="#"><button className="flex max-sm:text-sm bg-linear-to-br from-blue-500 to-indigo-700 cursor-pointer transition-all duration-200 text-white py-2 px-2 md:py-2 md:px-3  justify-center items-center relative z-20 gap-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700">
                        Go to Dashboard
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white max-sm:size-5 size-7 rotate-90 ">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                        </svg>
                        </button></a>
                    </div> 
                </div>  
                <div className='relative w-full overflow-hidden bg-slate-200 rounded-2xl h-60  md:h-80 shadow-2xl shadow-slate-500/20 dark:shadow-slate-400/20  '>
                    <video ref={videoRef} src={satudentvid} poster={assets.logo} className='absolute inset-0 w-full h-full object-cover' preload='metadata' controls onPlay={() => setIsVideoPlaying(true)} onPause={() => setIsVideoPlaying(false)}>
                      Your browser does not support the video tag.
                    </video>
                    {!isVideoPlaying && (
                      <button type='button' onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.play(); }}}
                        className='absolute inset-0 z-20 flex items-center justify-center text-white bg-black/20 hover:bg-black/30 transition'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-20 size-14 text-white hover:cursor-pointer">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                </div> 
          </div>
      </div>
        <div className={`${theme === 'dark' ? '' : 'hidden'}    bg-blue-600 opacity-40 brightness-70 blur-3xl absolute top-20 right-2/6 md:right-5/6 rounded-3xl z-0 w-30 h-[80vh] rotate-160 md:rotate-150 lg:rotate-135`}></div>
          <div className={`${theme === 'dark' ? '' : 'hidden'}  max-sm:hidden bg-fuchsia-600 opacity-40 blur-3xl brightness-70 absolute top-14 right-2/6 rounded-3xl z-0 w-30 h-[80vh] rotate-160 md:rotate-150 lg:rotate-135 `}></div>

      <div data-animate className='bg-slate-50 dark:bg-slate-800/40  '>
        <div className='grid grid-cols-1 md:grid-cols-2 relative gap-16 w-4/5 mx-auto py-12 '>
          <div className='flex-col gap-6 justify-center content-start w-full h-full '>
            <h2 className='text-2xl/8 md:text-3xl/10 lg:text-4xl/12  font-bold text-blue-950 mb-2 dark:text-white font-google-sans-flex'>Why should you choose <br /> Our Platform?</h2>
            <p className='text-gray-800 md:font-medium text-base/7 dark:text-neutral-300  '>Our platform empowers tutors to grow their teaching careers by transforming their knowledge into a sustainable source of income. Whether you create video lessons, host live classes, or share premium study materials, you can reach hundreds or even thousands of students across Nigeria and beyond without the limitations of a physical classroom. Build a strong professional profile that showcases your qualifications, subjects, courses, and student ratings, helping you earn trust and attract more learners. With the freedom to teach anytime and from anywhere, you can manage your schedule while making a meaningful impact on students' academic success.</p>
          </div>
          <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[520px]">
            <div className="row-start-1 row-span-3 shadow-lg">
              <img src={assets.man1}alt=""className="w-full h-full object-cover rounded-lg"/>
            </div>
            <div className='row-start-4 shadow-lg row-span-2 ' >
              <img src={assets.female3}alt=""className="w-full h-full object-cover bg-top rounded-lg"/>
          </div>
          <div className="row-start-1 col-start-2 shadow-lg row-span-2 ">
            <img src={assets.man3}alt=""className="w-full h-full object-cover bg-top rounded-lg"/>
          </div>
          <div className="row-span-3 row-start-3 shadow-lg col-start-2">
            <img src={assets.female4}alt=""className="w-full h-full object-cover rounded-lg"/>
          </div>
          </div>
        </div>
      </div>

      <div className='w-full py-6 md:py-10 '>
          <div className="relative z-10 mx-auto px-7 w-5/6 grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
            <div className='flex-col justify-center items-center'>
              <div className='bg-green-50 dark:bg-green-300/10  py-1 pl-1 pr-6 rounded-full flex  justify-start items-center gap-2  border-1 border-green-200/70 dark:border-green-500/20 '>
                <div className="bg-green-500 p-1 ring-1 ring-offset-2 ring-green-400 flex rounded-full  text-white shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 ">
                      <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                <div className='tetx-sm md:text-base text-green-950 dark:text-slate-50'>Know more through</div>
              </div>
              <h2 className='text-2xl  md:text-3xl/10  lg:text-4xl/12 mt-2 font-bold md:font-semibold text-blue-950 mb-2 dark:text-white font-google-sans-flex'>Questions Frequently <br /> Asked</h2>
            </div>
            <div className='flex-col'>
              {faqs.map((faq, index) =>(<div key={index} className='flex-col px-8 mb-2 border-1 py-3 border-slate-300 rounded-md  '>
                <div onClick={() => setOpenIndex(openIndex === index ? null : index)} className='flex justify-between items-center hover:cursor-pointer '>
                  <div className='font-medium text-slate-900 text-base dark:text-white'>{faq.question}</div>
                  { openIndex != index ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 dark:text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 dark:text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                  </svg>
                    )}
                </div>
                {openIndex === index && (<div className={` mt-4 dark:text-slate-300/70 text-slate-700 `}>
                  {faq.answer}
                </div>)}
              </div>))}
            </div>
        </div>
      </div>
      <div data-animate className='bg-slate-50  dark:bg-slate-800/40   '>
          <div className='grid grid-cols-1 md:grid-cols-2 relative gap-8 md:gap-16 w-4/5 mx-auto py-12 '>
            <div className='flex-col gap-2 justify-center content-start w-full h-full '>
              <div className='ring-1 mb-3 ring-rose-300 dark:ring-rose-500/40  w-48 rounded-full flex  justify-start items-center gap-0.5 py-0.5 pl-0.5 pr-2  dark:bg-rose-400/10 bg-rose-50 '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-rose-800 dark:text-white">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
                <div className='tetx-sm md:text-base text-rose-950 dark:text-white'>Why you needed to</div>
              </div>
            <h2 className=' text-3xl/10 lg:text-4xl/12  font-bold text-blue-950 mb-2 dark:text-white font-google-sans-flex'>Create Your Account <br /> Now!</h2>
            <a href="#"><button className="flex  max-sm:text-sm mt-8  bg-gradient-to-br from-orange-400 to-rose-600  cursor-pointer transition-all duration-200 text-white py-3 px-5 justify-center items-center relative z-20 gap-2.5 rounded-lg hover:from-orange-600 hover:to-rose-700">
              Open Account with Us
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white max-sm:size-5.5 size-7 rotate-45 ">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
              </svg>
            </button></a>
            </div>
          <div className=' bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-2xl shadow-2xl dark:shawdow-slate-800 h-full w-full px-3 py-4  '>
            <div className='font-bold text-white text-xl mb-3'>Benefits</div>
            <div className='flex flex-col pl-4 justify-start gap-2'>
              <div className='flex gap-2 '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-orange-600">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
              <span className='text-white'>Expand your audience and increase your earning potential</span>
              </div>
              <div className='flex gap-2 '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-orange-600">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
              <span className='text-white'>Turn your teaching expertise into a reliable source of income.</span>
              </div>
              <div className='flex gap-2 '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-orange-600">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
              <span className='text-white'>Connect with learners across Nigeria and beyond.</span>
              </div>
               <div className='flex gap-2 '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-orange-600">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
              <span className='text-white'>Enjoy the freedom to teach on your own schedule.</span>
              </div>
              <div className='flex gap-2 justify-start items-start h-full '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-orange-600">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
              <span className='text-white '> Empower students to achieve academic excellence in future.</span>
              </div>
            </div>
            </div>
          </div>
        </div>

      <div ref={footerRef} className="w-full relative z-30">
        <Footer />
      </div>
    </div>
  )
}

export default Tutorpage
