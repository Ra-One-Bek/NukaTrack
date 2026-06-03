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
      if (!token) { setUser(null); return; }
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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: '#0f0f0f',
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Truck size={17} color="#fff" />
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#0f0f0f',
              letterSpacing: '-0.3px',
            }}
          >
            UberTrack
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {[
            { to: '/', label: 'Главная' },
            { to: '/catalog', label: 'Каталог' },
            { to: '/about', label: 'О сервисе' },
            { to: '/contacts', label: 'Контакты' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#555',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 20,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.05)';
                (e.target as HTMLElement).style.color = '#0f0f0f';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.color = '#555';
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {user ? (
            <>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#333',
                  textDecoration: 'none',
                  background: '#f5f4f0',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 20,
                  padding: '7px 14px',
                  transition: 'border-color 0.15s',
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    background: '#0f0f0f',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User size={12} color="#fff" />
                </div>
                {user.name}
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#c53030',
                  background: '#fff5f5',
                  border: '1px solid #fed7d7',
                  borderRadius: 20,
                  padding: '7px 14px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                <LogOut size={13} />
                Выход
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#333',
                textDecoration: 'none',
                background: '#f5f4f0',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 20,
                padding: '7px 16px',
              }}
            >
              Войти
            </Link>
          )}

          <Link
            to="/add"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              background: '#0f0f0f',
              borderRadius: 20,
              padding: '8px 18px',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            + Разместить
          </Link>
        </div>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Открыть меню"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: '#0f0f0f',
          }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.06)',
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 20px 24px' }}>
            {[
              { to: '/', label: 'Главная' },
              { to: '/catalog', label: 'Каталог' },
              { to: '/about', label: 'О сервисе' },
              { to: '/contacts', label: 'Контакты' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#333',
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                {label}
              </Link>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#333',
                      textDecoration: 'none',
                      background: '#f5f4f0',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 12,
                      padding: '12px',
                    }}
                  >
                    <User size={15} />
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#c53030',
                      background: '#fff5f5',
                      border: '1px solid #fed7d7',
                      borderRadius: 12,
                      padding: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    <LogOut size={15} />
                    Выход
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#333',
                    textDecoration: 'none',
                    background: '#f5f4f0',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 12,
                    padding: '12px',
                  }}
                >
                  Войти
                </Link>
              )}

              <Link
                to="/add"
                onClick={() => setOpen(false)}
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  textDecoration: 'none',
                  background: '#0f0f0f',
                  borderRadius: 12,
                  padding: '13px',
                }}
              >
                + Разместить объявление
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}