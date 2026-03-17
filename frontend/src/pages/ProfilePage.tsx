import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe } from '../api/authApi';
import type { MeResponse } from '../types/auth';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    async function loadProfile() {
      try {
        const me = await getMe();
        setUser(me);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-10">Загрузка профиля...</div>;
  }

  if (!user) {
    return <div className="mx-auto max-w-4xl px-4 py-10">Пользователь не найден.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-bold text-slate-900">Профиль</h1>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Имя</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{user.name}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{user.email}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Телефон</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {user.phone || 'Не указан'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/my-listings"
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Мои объявления
            </Link>

            <Link
              to="/requests"
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Мои заявки
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-200 px-5 py-3 font-medium text-red-600 hover:bg-red-50"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}