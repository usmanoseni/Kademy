import React from "react";
import { assets as assert } from '../asserts/assert';
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; 
import {Link, useLocation } from 'react-router-dom';

const listItem1 = [
  { name: "Home", to: "/" },
  { name: "Student", to: "/student" },
  { name: "Tutor", to: "/tutor" }
];

const listItem2 = [
  { name: "Weac Site", href: "https://www.waec.org" },
  { name: "Neco Site", href: "https://www.jamb.gov.ng/" },
  { name: "Jamb Site", href: "https://neco.gov.ng/" } 
];

const Footer: React.FC = () => { 
      const [currentHash, setCurrentHash] = React.useState<string>(window.location.hash || '#home');
      React.useEffect(() => {
        const onHash = () => setCurrentHash(window.location.hash || '#home');
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
      }, []);
  
     const location = useLocation();

      const quickLinkClass = (path: string) =>
        location.pathname === path
          ? 'text-white font-semibold'
          : 'hover:text-orange-400 transition-colors';
    
    return (
         <footer className='w-full h-full flex-col  items-center justify-center'>
                  <div className=' bg-gradient-to-br from-indigo-900 to-violet-950 text-white pt-10 pb-5 px-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto'>
                      <div className='flex-col gap-2'>
                        <div className="flex items-center justify-start gap-1"> 
                          <img className="size-6  " src={ assert.dark_logo} alt="Logo"/>
                          <h3 className="font-goldman text-lg font-bold text-white  ">Kademy</h3>
                        </div>
                        <div className='text-xs md:text-xs leading-6  font-noto-sans-display mt-2 '>Dedicated to helping students build knowledge, develop skills, and achieve excellence in their academic journey.</div>
                        <div className='flex flex-col gap-2 mt-4'>
                          <div className='font-semibold tracking-wide mt-4 '>Follow Us</div>
                          <div className="flex space-x-4">
                            <a href="#" className="hover:text-orange-300 transition">
                              <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-orange-300  transition">
                              <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-orange-300 transition">
                              <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:text-orange-300 transition">
                              <Linkedin size={20} />
                            </a>
                            
                          </div>
                        </div>
                      </div>
                      
                      <div className='grid grid-cols-2 w-full gap-1.5 col-span-2 '>
                        <div className='flex flex-col gap-1.5 justify-items-start '>
                          <div className=' font-google-sans-flex text-lg font-semibold text-white  '>Quick Links</div>
                          <ul className='flex flex-col gap-2 mt-2 text-sm '>
                            {listItem1.map(({name, to}) => (
                              <li key={name}>
                                <Link
                                  to={to}
                                aria-current={location.pathname === to ? 'page' : undefined}
                                  className={quickLinkClass(to)}
                                >
                                  {name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
        
                        <div className='flex flex-col gap-1.5 justify-items-start '>
                          <div className=' font-google-sans-flex text-lg font-semibold text-white  '>Exam Board Links</div>
                          <ul className='flex flex-col gap-2 mt-2 text-sm '>
                                {listItem2.map(({ name, href }) => (
                                  <li key={name}>
                                    <a href={href} target="_blank" rel="noreferrer" className='hover:text-orange-400 '>{name}</a>
                                  </li>
                                ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='text-xs text-slate-300 flex md:pr-10 justify-end items-center mt-3 w-full text-end ' >Designed by: <span className='font-medium tracking-wider font-goldman pl-0.5 '> HusTech</span></div>
                    <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Kademy E-Learning Platform. All rights reserved.
                    </div>
                  </div>
                </footer>
    )
}

export default Footer;