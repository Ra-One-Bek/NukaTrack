import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/authApi';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError('');

      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem('token', response.access_token);

      navigate('/');
    } catch {
      setError('Неверный email или пароль');
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Вход</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl bg-white p-6 shadow"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border px-4 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          className="w-full rounded-xl border px-4 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
        >
          Войти
        </button>

        {/* Кнопка регистрации */}
        <p className="text-center text-sm text-slate-600">
          Нет аккаунта?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
}