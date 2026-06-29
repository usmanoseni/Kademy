import { useState, useEffect } from 'react';
import Landingpage from "./components/Landingpage";
import Studentpage from "./components/Studentpage";
import Tutorpage from "./components/Tutorpage";

function App() {
  const [hash, setHash] = useState<string>(window.location.hash || '#home');
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (hash === '#student') return <Studentpage theme={theme} setTheme={setTheme} />;
  if (hash === '#tutor') return <Tutorpage theme={theme} setTheme={setTheme} />;
  return <Landingpage theme={theme} setTheme={setTheme} />;
}

export default App;
