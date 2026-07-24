import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import '../index.css';
import satudentvid from '../videos/Student.mp4'
import { assets,} from '../asserts/assert';

const listimg = [
  assets.stud1,
  assets.stud2,
  assets.stud3,
  assets.stud4,
  assets.stud5
];

const benefits = [
  {
    title: "Clear Video Lessons",
    description:
      "Engaging teacher-led videos that simplify even the hardest topics, making learning fun and easy to understand.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5.5 text-orange-400 dark:text-white    ">
        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
      </svg>
    ),
  },

  {
    title: "PDF Notes Materials",
    description:
      "Well-structured, downloadable notes aligned with the school syllabus to help students revise anytime, even offline.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5.5 text-orange-400 dark:text-white ">
  <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
</svg>

    ),
  },

  {
    title: "Learn at Your Pace",
    description:
      "No rushing. Learn whenever you want, pause and replay lessons, and build knowledge at a pace that suits you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5.5 text-orange-400 dark:text-white">
  <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
</svg>

    ),
  },

  {
    title: "Quizzes Test",
    description:
      "Interactive quizzes that help you check what you've learned, track your progress, and strengthen your understanding.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5.5 text-orange-400 dark:text-white">
  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
</svg>

    ),
  },

  {
    title: "Exam Practice Tools",
    description:
      "Access past questions, mock exams, and personalized practice to boost your confidence for major national exams.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5.5 text-orange-400 dark:text-white ">
  <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
</svg>

    ),
  },

  {
    title: "Multi-Device Access",
    description:
      "Whether you are on a phone, tablet, or laptop, your learning continues smoothly across all your devices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5.5 text-orange-400 dark:text-white">
  <path fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clip-rule="evenodd" />
</svg>

    ),
  },
];

const faqs = [
  {
    question: "How do I sign up on the platform?",
    answer:
      "Create an account using your email address or phone number, then verify your account and start learning.",
  },
  {
    question: "Can I access lessons on my phone?",
    answer:
      "Yes. Our platform works perfectly on phones, tablets, and computers.",
  },
  {
    question: "Do I need an internet connection?",
    answer:
      "Yes, but some materials such as PDFs can be downloaded for offline study.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Absolutely. Your quizzes, completed lessons, and scores are saved automatically.",
  },
];

type StudentpageProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Studentpage: React.FC<StudentpageProps> = ({ theme, setTheme }) => { 
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRotated, setIsRotated] = useState(false);
  const [screen, setScreen] = useState("mobile");
  const visibleBenefits = screen === "lg" ? benefits : isRotated ? benefits : benefits.slice(0, screen === "mobile" ? 3 : 4);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  const scrollTestimonialLeft = () => {
    testimonialScrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  }

  const scrollTestimonialRight = () => {
    testimonialScrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  }
  
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setScreen("lg");
    } else if (window.innerWidth >= 768) {
      setScreen("md");
    } else {
      setScreen("mobile");
    }
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  
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

    return (
      <div className={`flex-col justify-center items-center w-full  h-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-radial-[at_ 25%_50%_75%] from-white via-blue-100/10 to-indigo-300/20 to-90%'}`}>
        <div className={`${theme === 'dark' ? 'pattern' : 'pattern'}  w-full h-full lg:h-[100vh]  flex-col justify-center items-center gap-10 flex relative`}>
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
                        <h1 className='max-sm:text-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 font-google-sans-flex  pl-4 dark:text-white  mb-4 lg:leading-12'>What You Get as <br /> <span className='bg-gradient-to-tr  from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent'>a Student</span>  </h1>
                        <p className='text-gray-700 dark:text-gray-300 max-sm:text-sm ml-4 max-sm:w-full w-full  text-base font-noto-sans-display md:text-base lg:text-lg mb-8'>A simple and personalized learning space designed to help you study faster and better thoughout their academic journey in secondary schools.</p>
                    </div>
                    <div className='flex justify-start ml-2 md:ml-4 items-center gap-4 '>
                        <Link to="/Auth/Student/Register"><button className='border border-gray-900 px-6 max-sm:text-sm  py-1.5 md:py-2 rounded-md cursor-pointer font-medium hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-700 hover:text-white relative z-20 dark:border-white hover:border-indigo-600 '>
                        Register
                        </button></Link> 
                        <Link to="/Auth/Student/login"><button className="flex max-sm:text-sm bg-gradient-to-br from-blue-500 to-indigo-700 cursor-pointer transition-all duration-200 text-white py-2 px-2 md:py-2 md:px-3  justify-center items-center relative z-20 gap-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700">
                        Start Learning
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white max-sm:size-5 size-7 rotate-90 ">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                        </svg>
                        </button></Link>
                    </div> 
                </div>  
                <div className='relative w-full overflow-hidden bg-slate-200 rounded-2xl h-[15rem]  md:h-[20rem] shadow-2xl shadow-slate-500/20 dark:shadow-slate-400/20  '>
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
      
        <div className='py-12 mx-auto w-full bg-slate-50 dark:bg-slate-800/40 '>
          <h2 className='text-2xl/8 md:text-3xl/10 text-center lg:text-4xl/12 font-semibold text-blue-950 mb-2 dark:text-white font-google-sans-flex'>Benefit of Our platform to the student.</h2>
          <div className="w-5/6 mt-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBenefits.map(({ title, description, icon }) => (
                  <div key={title} className="flex gap-4 p-4 items-start  bg-white rounded-xl shadow-sm dark:bg-slate-800/60" >
                  <div className="bg-orange-300/10 p-3 ring-1  ring-orange-400 dark:ring-orange-300 flex rounded-full text-white shrink-0">
                      {icon}
                  </div>
                  <div>
                      <h4 className="text-lg max-sm:text-base font-semibold font-google-sans-flex text-gray-950 mb-2 dark:text-white">{title}</h4>
                      <p className="text-slate-600 text-sm leading-6 font-noto-sans-display dark:text-slate-300 ">{description}</p>
                  </div>
              </div>
              ))}
          </div>
          <div onClick={() => setIsRotated(!isRotated)} className='flex justify-center items-center w-full lg:hidden'>
            <div className='flex justify-center item gap-2 py-1.5 px-3 rounded-md  mt-8   text-slate-800 dark:text-white font-google-sans-flex cursor-pointer border-1 border-indigo-600  mb-5'>
          <div className='font-medium text-sm' >{!isRotated ? 'View More': 'View less'}</div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={` size-5 ${isRotated ? 'rotate-180' : ''} transition-transform duration-300`}>
              <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className='w-full py-6 md:py-12 '>
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
        <div className='flex-col justify-center items-center w-full h-full bg-slate-50 dark:bg-slate-800/40 py-12'>
           <div className='flex-col gap-6 justify-center items-center max-sm:w-full w-5/6 px-5 h-full m-auto mb-5 '>
              <h2 className='text-2xl/8 md:text-3xl/10 text-center lg:text-4xl/12 font-bold text-blue-950 mb-2 dark:text-white font-google-sans-flex'>Testimonial</h2>
          </div>

          <div className='relative '>
            <div onClick={scrollTestimonialRight} className='absolute bg-white ring-1 ring-slate-300 p-1 rounded-full hover:cursor-pointer right-5.5 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200 max-sm:right-4.5 dark:ring-slate-50 dark:bg-slate-900  '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-slate-700 dark:text-white max-sm:size-4.5 ">
              <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
            </svg>
            </div>
            <div ref={testimonialScrollRef} className='h-full mx-20 max-sm:mx-12 relative overflow-x-auto scroll-smooth no-scrollbar p-2 flex gap-4 justify-start items-center '>
              <div className='bg-white min-w-[18rem] h-full  p-3.5  rounded-2xl shadow-lg dark:bg-slate-800 '>
                <div className='flex justify-between items-center gap-2.5'>
                  <div className='flex-col justify-end items-end'>
                    <div className='text-sm font-medium text-slate-800 dark:text-slate-100 text-end mb-1'>Iganmode Grammar school Ota</div>
                    <div className='flex gap-1 items-center justify-end'>
                      <span className='text-xs font-medium text-violet-700 dark:text-violet-300  '>Ogun state</span>
                      <span className='text-slate-500 dark:text-slate-400 text-xs'> - Student </span>
                    </div>
                  </div>
                  <img src={assets.man1} className='size-12 object-cover bg-top ring-2  ring-orange-400 ring-offset-2 dark:ring-offset-slate-800  dark:bg-slate-800 rounded-full ' alt="" />
               </div>
                <div className='text-gray-700 mt-4 w-full h-full line-clamp-10 leading-6 font-noto-sans-display dark:text-slate-300 text-sm '>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores maxime vitae, amet reprehenderit quidem et minus magni aliquam obcaecati modi fugiat saepe quis ipsam ex, incidunt dignissimos soluta consequuntur! Sint quae maiores unde quibusdam ut voluptatibus sed nulla provident numquam est, libero dolorem, ab nostrum ipsam optio culpa repellat voluptate illum commodi dignissimos maxime at modi. Quod ab eum quas?
                </div>
                <div className='mt-3 text-sm flex-col gap-1'>
                  <div className='font-medium text-slate-800 dark:text-slate-200 tracking-wide '>Oseni Usman</div>
                  <div className='text-slate-500 dark:text-slate-400 text-xs mt-0.5'>Nigeria <span className='font-extrabold text-green-600'>__</span></div>
                </div>
              </div>
              <div className='bg-white min-w-[18rem] h-full  p-3.5  rounded-2xl shadow-lg dark:bg-slate-800 '>
                <div className='flex justify-between items-center gap-2.5'>
                  <div className='flex-col justify-end items-end'>
                    <div className='text-sm font-medium text-slate-800 dark:text-slate-100 text-end mb-1'>Iganmode Grammar school Ota</div>
                    <div className='flex gap-1 items-center justify-end'>
                      <span className='text-xs font-medium text-violet-700 dark:text-violet-300  '>Ogun state</span>
                      <span className='text-slate-500 dark:text-slate-400 text-xs'> - Student </span>
                    </div>
                  </div>
                  <img src={assets.man1} className='size-12 object-cover bg-top ring-2  ring-orange-400 ring-offset-2 dark:ring-offset-slate-800  dark:bg-slate-800 rounded-full ' alt="" />
               </div>
                <div className='text-gray-700 mt-4 w-full h-full line-clamp-10 leading-6 font-noto-sans-display dark:text-slate-300 text-sm '>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores maxime vitae, amet reprehenderit quidem et minus magni aliquam obcaecati modi fugiat saepe quis ipsam ex, incidunt dignissimos soluta consequuntur! Sint quae maiores unde quibusdam ut voluptatibus sed nulla provident numquam est, libero dolorem, ab nostrum ipsam optio culpa repellat voluptate illum commodi dignissimos maxime at modi. Quod ab eum quas?
                </div>
                <div className='mt-3 text-sm flex-col gap-1'>
                  <div className='font-medium text-slate-800 dark:text-slate-200 tracking-wide '>Oseni Usman</div>
                  <div className='text-slate-500 dark:text-slate-400 text-xs mt-0.5'>Nigeria <span className='font-extrabold text-green-600'>__</span></div>
                </div>
              </div>
             <div className='bg-white min-w-[18rem] h-full  p-3.5  rounded-2xl shadow-lg dark:bg-slate-800 '>
                <div className='flex justify-between items-center gap-2.5'>
                  <div className='flex-col justify-end items-end'>
                    <div className='text-sm font-medium text-slate-800 dark:text-slate-100 text-end mb-1'>Iganmode Grammar school Ota</div>
                    <div className='flex gap-1 items-center justify-end'>
                      <span className='text-xs font-medium text-violet-700 dark:text-violet-300  '>Ogun state</span>
                      <span className='text-slate-500 dark:text-slate-400 text-xs'> - Student </span>
                    </div>
                  </div>
                  <img src={assets.man1} className='size-12 object-cover bg-top ring-2  ring-orange-400 ring-offset-2 dark:ring-offset-slate-800  dark:bg-slate-800 rounded-full ' alt="" />
               </div>
                <div className='text-gray-700 mt-4 w-full h-full line-clamp-10 leading-6 font-noto-sans-display dark:text-slate-300 text-sm '>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores maxime vitae, amet reprehenderit quidem et minus magni aliquam obcaecati modi fugiat saepe quis ipsam ex, incidunt dignissimos soluta consequuntur! Sint quae maiores unde quibusdam ut voluptatibus sed nulla provident numquam est, libero dolorem, ab nostrum ipsam optio culpa repellat voluptate illum commodi dignissimos maxime at modi. Quod ab eum quas?
                </div>
                <div className='mt-3 text-sm flex-col gap-1'>
                  <div className='font-medium text-slate-800 dark:text-slate-200 tracking-wide '>Oseni Usman</div>
                  <div className='text-slate-500 dark:text-slate-400 text-xs mt-0.5'>Nigeria <span className='font-extrabold text-green-600'>__</span></div>
                </div>
              </div>
              <div className='bg-white min-w-[18rem] h-full  p-3.5  rounded-2xl shadow-lg dark:bg-slate-800 '>
                <div className='flex justify-between items-center gap-2.5'>
                  <div className='flex-col justify-end items-end'>
                    <div className='text-sm font-medium text-slate-800 dark:text-slate-100 text-end mb-1'>Iganmode Grammar school Ota</div>
                    <div className='flex gap-1 items-center justify-end'>
                      <span className='text-xs font-medium text-violet-700 dark:text-violet-300  '>Ogun state</span>
                      <span className='text-slate-500 dark:text-slate-400 text-xs'> - Student </span>
                    </div>
                  </div>
                  <img src={assets.man1} className='size-12 object-cover bg-top ring-2  ring-orange-400 ring-offset-2 dark:ring-offset-slate-800  dark:bg-slate-800 rounded-full ' alt="" />
               </div>
                <div className='text-gray-700 mt-4 w-full h-full line-clamp-10 leading-6 font-noto-sans-display dark:text-slate-300 text-sm '>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores maxime vitae, amet reprehenderit quidem et minus magni aliquam obcaecati modi fugiat saepe quis ipsam ex, incidunt dignissimos soluta consequuntur! Sint quae maiores unde quibusdam ut voluptatibus sed nulla provident numquam est, libero dolorem, ab nostrum ipsam optio culpa repellat voluptate illum commodi dignissimos maxime at modi. Quod ab eum quas?
                </div>
                <div className='mt-3 text-sm flex-col gap-1'>
                  <div className='font-medium text-slate-800 dark:text-slate-200 tracking-wide '>Oseni Usman</div>
                  <div className='text-slate-500 dark:text-slate-400 text-xs mt-0.5'>Nigeria <span className='font-extrabold text-green-600'>__</span></div>
                </div>
              </div>
              <div className='bg-white min-w-[18rem] h-full  p-3.5  rounded-2xl shadow-lg dark:bg-slate-800 '>
                <div className='flex justify-between items-center gap-2.5'>
                  <div className='flex-col justify-end items-end'>
                    <div className='text-sm font-medium text-slate-800 dark:text-slate-100 text-end mb-1'>Iganmode Grammar school Ota</div>
                    <div className='flex gap-1 items-center justify-end'>
                      <span className='text-xs font-medium text-violet-700 dark:text-violet-300  '>Ogun state</span>
                      <span className='text-slate-500 dark:text-slate-400 text-xs'> - Student </span>
                    </div>
                  </div>
                  <img src={assets.man1} className='size-12 object-cover bg-top ring-2  ring-orange-400 ring-offset-2 dark:ring-offset-slate-800  dark:bg-slate-800 rounded-full ' alt="" />
               </div>
                <div className='text-gray-700 mt-4 w-full h-full line-clamp-10 leading-6 font-noto-sans-display dark:text-slate-300 text-sm '>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores maxime vitae, amet reprehenderit quidem et minus magni aliquam obcaecati modi fugiat saepe quis ipsam ex, incidunt dignissimos soluta consequuntur! Sint quae maiores unde quibusdam ut voluptatibus sed nulla provident numquam est, libero dolorem, ab nostrum ipsam optio culpa repellat voluptate illum commodi dignissimos maxime at modi. Quod ab eum quas?
                </div>
                <div className='mt-3 text-sm flex-col gap-1'>
                  <div className='font-medium text-slate-800 dark:text-slate-200 tracking-wide '>Oseni Usman</div>
                  <div className='text-slate-500 dark:text-slate-400 text-xs mt-0.5'>Nigeria <span className='font-extrabold text-green-600'>__</span></div>
                </div>
              </div>
              <div className='bg-white min-w-[18rem] h-full  p-3.5  rounded-2xl shadow-lg dark:bg-slate-800 '>
                <div className='flex justify-between items-center gap-2.5'>
                  <div className='flex-col justify-end items-end'>
                    <div className='text-sm font-medium text-slate-800 dark:text-slate-100 text-end mb-1'>Iganmode Grammar school Ota</div>
                    <div className='flex gap-1 items-center justify-end'>
                      <span className='text-xs font-medium text-violet-700 dark:text-violet-300  '>Ogun state</span>
                      <span className='text-slate-500 dark:text-slate-400 text-xs'> - Student </span>
                    </div>
                  </div>
                  <img src={assets.man1} className='size-12 object-cover bg-top ring-2  ring-orange-400 ring-offset-2 dark:ring-offset-slate-800  dark:bg-slate-800 rounded-full ' alt="" />
               </div>
                <div className='text-gray-700 mt-4 w-full h-full line-clamp-10 leading-6 font-noto-sans-display dark:text-slate-300 text-sm '>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores maxime vitae, amet reprehenderit quidem et minus magni aliquam obcaecati modi fugiat saepe quis ipsam ex, incidunt dignissimos soluta consequuntur! Sint quae maiores unde quibusdam ut voluptatibus sed nulla provident numquam est, libero dolorem, ab nostrum ipsam optio culpa repellat voluptate illum commodi dignissimos maxime at modi. Quod ab eum quas?
                </div>
                <div className='mt-3 text-sm flex-col gap-1'>
                  <div className='font-medium text-slate-800 dark:text-slate-200 tracking-wide '>Oseni Usman</div>
                  <div className='text-slate-500 dark:text-slate-400 text-xs mt-0.5'>Nigeria <span className='font-extrabold text-green-600'>__</span></div>
                </div>
              </div>
            </div>
            <div onClick={scrollTestimonialLeft} className='absolute bg-white ring-1 ring-slate-300 p-1 rounded-full hover:cursor-pointer left-5.5 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-200  max-sm:left-4.5 dark:ring-slate-50 dark:bg-slate-900  '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-slate-700 dark:text-white max-sm:size-4.5 ">
                <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-transparent py-12'>
          <div className='flex justify-center items-center w-full h-full ' >
            <div className="relative w-5/6 rounded-xl overflow-hidden shadow-2xl shadow-slate-400 dark:shadow-slate-800">
              <img src={assets.bg4} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-indigo-700 h-full"></div>
              <div className="relative z-10 px-7 grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
                <div className='relative flex-col gap-6 justify-center content-center w-full h-full '> 
                    <h2 className='max-sm:text-2xl/8  max-md:text-3xl text-4xl  font-bold text-blue-950 mb-2  font-google-sans-flex max-md:text-center'>Start learning at <br /> your pace now</h2>
                      <p className='text-white leading-5 text-base/7 max-sm:text-sm  max-md:text-center font-noto-sans-display mt-5 '>Take control of your learning journey with flexible lessons designed around your schedule</p>
                </div>
                  <div className='flex justify-center md:justify-end items-center'>
                    <Link to="/Auth/Student/Register"><button className="flex  max-sm:text-sm  bg-gradient-to-br md:mr-10  from-orange-400 to-rose-600 cursor-pointer transition-all duration-200 text-white py-2 px-3 justify-center items-center relative z-20 gap-2.5 rounded-lg hover:from-orange-600 hover:to-rose-700">
                            Rigister with Us 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" text-white max-sm:size-5 size-7 rotate-45 ">
                              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.3 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                            </svg>
                        </button></Link>
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


export default Studentpage;