import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    router.push('/dashboard');
  };

  return <LoginForm onLogin={handleLogin} />;
}
