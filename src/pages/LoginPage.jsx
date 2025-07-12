import { getAuth, signInWithPopup } from 'firebase/auth';
import { provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/dashboard');
    }
  }, [auth.currentUser]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to Todo App</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
