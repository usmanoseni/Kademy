import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { assets as assert } from '../asserts/assert';
import { Moon, Sun } from "lucide-react";


type NavbarProps = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    hideOnFooter?: boolean;
}


const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, hideOnFooter = false }) => { 
    type isMenuOpen = boolean;
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const navClass = (path: string) => {
        const base = 'text-gray-900 max-sm:font-medium  dark:text-neutral-300 dark:hover:text-white hover:text-indigo-700 transition-colors duration-300 max-sm:text-neutral-200  max-sm:hover:text-neutral-50';
        return `${base} ${location.pathname === path ? 'text-indigo-600 font-semibold' : ''}`;
    }

    return ( 
        <div className={` relative z-30 flex-col justify-center items-center w-full dark:bg-gray-900 ${hideOnFooter ? 'hidden' : ''}`}>
            <div className="fixed top-0 w-full text-xs lg:text-sm h-9.5 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex items-center justify-center">
               <span className="size-6 flex justify-center items-center pr-1.5"><img src={assert.party_popper} alt="Logo" /></span> Welcome to Kademy E-Learning Platform
            </div>
            <div className="fixed top-9.5 z-50 sm:top-11 w-full sm:w-[calc(100%-2.5rem)] sm:mx-5 sm:rounded-md flex items-center shadow-md py-1.5 dark:bg-gray-900 dark:shadow-gray-800 dark:shadow-lg bg-white sm:opacity-85 px-3 pr-2 justify-between">
                <div className="flex items-center justify-center gap-1"> 
                    <img
                    className="w-5.5 h-5.5"
                    src={theme === "dark" ? assert.dark_logo : assert.logo}
                    alt="Logo"
                    />
                    <h3 className="font-goldman text-lg font-bold dark:text-white text-gray-950  ">Kademy</h3>
                </div>

            <div className={`${isMenuOpen ? 'max-sm:w-55 z-10' : 'overflow:hidden max-sm:w-0'} max-sm:h-full max-sm:bg-gradient-to-tr max-sm:from-violet-700  max-sm:to-blue-700  max-sm:min-h-screen max-sm:fixed max-sm:top-0 max-sm:bottom-0  max-sm:right-0 `}>
                    <div onClick={() => setIsMenuOpen(false)} className={`${!isMenuOpen ? 'hidden' : ''} sm:hidden absolute top-3 right-4 hover:cursor-pointer  text-white`} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <ul className="flex justify-center items-center gap-5.5 text-sm max-sm:flex-col max-sm:justify-start max-sm:items-start max-sm:pt-20 max-sm:pl-8  ">
                        <Link className={navClass('/')} to="/" onClick={() => setIsMenuOpen(false)}>
                            <li>Home</li>
                        </Link>
                        <Link className={navClass('/student')} to="/student" onClick={() => setIsMenuOpen(false)}>
                            <li>Student</li>
                        </Link>
                        <Link className={navClass('/tutor')} to="/tutor" onClick={() => setIsMenuOpen(false)}>
                            <li>Tutor</li>
                        </Link>
                    </ul>
                </div>
                <div className="flex justify-center items-center sm:gap-1.5 md:gap-4">
                    <div className="flex justify-center items-center gap-2" >
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                            {theme === "dark" ? <Sun className="flex justify-center items-center w-8.5 h-8.5 dark:text-white transition-all duration-200 rounded-full   bg-gray-800 p-2 cursor-pointer" size={17} /> : <Moon className="flex justify-center items-center w-8.5 h-8.5 transition-all duration-200 text-neutral-900  p-2 cursor-pointer  rounded-full bg-neutral-100" size={18} />}
                        </button>
                        <div onClick={() => setIsMenuOpen(true)}  className="sm:hidden text-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-100 flex justify-center items-center hover:bg-neutral-100 p-1 rounded-xs  cursor-pointer  transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="hidden  sm:flex justify-center items-center gap-1.5 ">
                       <Link to="/auth/student/register"> <button className="flex justify-center items-center py-1.5 px-3.5 text-sm cursor-pointer  hover:bg-neutral-100  dark:hover:bg-gray-800 rounded-sm transition-colors duration-200">Sign in</button></Link>
                        <Link to="/auth/student/login">
                            <button className="flex justify-center items-center py-1.5 px-5 rounded-sm text-sm cursor-pointer bg-gradient-to-br from-blue-600 to-violet-600 text-white hover:from-blue-700 transition-colors duration-200 hover:to-violet-700">
                                <span className="flex justify-center  items-center text-white " >Start learning</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 flex justify-center items-center ml-1.5">
                                <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;