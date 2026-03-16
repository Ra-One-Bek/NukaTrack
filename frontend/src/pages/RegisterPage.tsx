import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError('');
      await registerUser(form);
      navigate('/login');
    } catch {
      setError('Не удалось зарегистрироваться');
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Регистрация</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
        <input
          type="text"
          placeholder="Имя"
          className="w-full rounded-xl border px-4 py-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border px-4 py-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Телефон"
          className="w-full rounded-xl border px-4 py-3"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Пароль"
          className="w-full rounded-xl border px-4 py-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}