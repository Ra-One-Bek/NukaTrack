import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Truck, User, LogOut } from 'lucide-react';
import { getMe } from '../api/authApi';
import type { MeResponse } from '../types/auth';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<MeResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const me = await getMe();
        setUser(me);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      }
    }

    loadUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    setOpen(false);
    navigate('/');
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-slate-900"
        >
          <Truck size={24} className="text-blue-600" />
          <span>UberTrack</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Главная
          </Link>

          <Link
            to="/catalog"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Каталог
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            О сервисе
          </Link>

          <Link
            to="/contacts"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Контакты
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              >
                <User size={16} />
                <span>{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                <span>Выход</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
            >
              Войти
            </Link>
          )}

          <Link
            to="/add"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Разместить
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center md:hidden"
          aria-label="Открыть меню"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="flex flex-col gap-4 px-4 py-6">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Главная
            </Link>

            <Link
              to="/catalog"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Каталог
            </Link>

            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              О сервисе
            </Link>

            <Link
              to="/contacts"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Контакты
            </Link>

            <div className="mt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700"
                  >
                    <span>{user.name || user.name || 'Профиль'}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl border border-red-200 px-4 py-2 text-center text-sm font-medium text-red-600"
                  >
                    Выход
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700"
                >
                  Войти
                </Link>
              )}

              <Link
                to="/add"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Разместить объявление
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}