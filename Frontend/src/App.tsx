import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Studentpage from './components/Studentpage';
import Tutorpage from './components/Tutorpage';
import LoginPage from './Auth/StudentAuth/LoginPage';
import SignUpPage from './Auth/StudentAuth/SignUpPage'
import Dashbord from './Students/dashboard';
import ResetPassword from './Auth/StudentAuth/ResetPassword'
import VerifyEmail from './Auth/StudentAuth/VerifyEmail';
import { Toaster } from "sonner";

function App() {
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <Toaster richColors position="top-center" />
       <Routes>
      <Route path="/" element={<Landingpage theme={theme} setTheme={setTheme} />} />
      <Route path="/student" element={<Studentpage theme={theme} setTheme={setTheme} />} />
      <Route path="/tutor" element={<Tutorpage theme={theme} setTheme={setTheme} />} />
      <Route path="/auth/student/login" element={<LoginPage theme={theme} setTheme={setTheme}  />} />
      <Route path="/auth/student/reset-password" element={<ResetPassword theme={theme} setTheme={setTheme} />} />
       <Route path="/auth/student/verify-email" element={<VerifyEmail  theme={theme} setTheme={setTheme} />}  />
      <Route path="/auth/student/register" element={<SignUpPage  />} />
      <Route path="/student/dashboard" element={<Dashbord />} />
    </Routes>
     </>
   
  );
}

export default App;
