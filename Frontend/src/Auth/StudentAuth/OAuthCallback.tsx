import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Finishing sign-in...');

  useEffect(() => {
    const finishSignIn = async () => {
      try {
        navigate('/student/dashboard', { replace: true });
      } catch (error) {
        console.error('OAuth callback failed', error);
        setStatus('Sign-in failed. Please try again.');
        navigate('/auth/student/login', { replace: true });
      }
    };

    finishSignIn();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center text-sm text-slate-600">
      {status}
    </div>
  );
};

export default OAuthCallback;
