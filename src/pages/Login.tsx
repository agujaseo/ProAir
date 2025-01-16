import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LoginForm } from '../components/forms/LoginForm';
import type { LoginFormData } from '../types/auth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = (data: LoginFormData) => {
    login({
      id: '1',
      name: 'Admin User',
      email: data.email,
      role: 'developer',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Sprout className="h-12 w-12 text-emerald-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          AromaGest
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
}
