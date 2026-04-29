import { useEffect, useState } from 'react';
import {
  getIncomingRequests,
  getMyRequests,
  updateRequestStatus,
} from '../api/requestsApi';
import type { RentalRequest } from '../types/request';

export default function RequestsPage() {
  const [tab, setTab] = useState<'my' | 'incoming'>('my');
  const [myRequests, setMyRequests] = useState<RentalRequest[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      setLoading(true);
      setError('');

      const [my, incoming] = await Promise.all([
        getMyRequests(),
        getIncomingRequests(),
      ]);

      setMyRequests(my);
      setIncomingRequests(incoming);
    } catch {
      setError('Не удалось загрузить заявки');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(
    requestId: string,
    status: 'APPROVED' | 'REJECTED',
  ) {
    try {
      await updateRequestStatus(requestId, status);
      await loadRequests();
    } catch {
      setError('Не удалось изменить статус заявки');
    }
  }

  const currentList = tab === 'my' ? myRequests : incomingRequests;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-950">Заявки</h1>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setTab('my')}
            className={`rounded-xl px-5 py-3 font-medium ${
              tab === 'my'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-300 bg-white text-slate-700'
            }`}
          >
            Мои заявки
          </button>

          <button
            onClick={() => setTab('incoming')}
            className={`rounded-xl px-5 py-3 font-medium ${
              tab === 'incoming'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-300 bg-white text-slate-700'
            }`}
          >
            Входящие заявки
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-slate-600">Загрузка заявок...</p>
        ) : currentList.length === 0 ? (
          <p className="mt-8 text-slate-600">Пока заявок нет.</p>
        ) : (
          <div className="mt-8 grid gap-5">
            {currentList.map((request) => (
              <div
                key={request.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-950">
                      {request.listing.title}
                    </h2>

                    <p className="mt-2 text-slate-600">
                      {request.listing.city} • {request.listing.category} •{' '}
                      {request.listing.pricePerDay.toLocaleString('ru-RU')} ₸/сутки
                    </p>

                    <p className="mt-3 text-slate-700">
                      Сообщение: {request.message || 'Без сообщения'}
                    </p>

                    {tab === 'incoming' && (
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                        <p className="font-semibold text-slate-950">
                          Данные отправителя
                        </p>
                        <p className="mt-1 text-slate-700">
                          Имя: {request.sender.name}
                        </p>
                        <p className="text-slate-700">
                          Телефон: {request.sender.phone || 'Не указан'}
                        </p>
                        <p className="text-slate-700">
                          Email: {request.sender.email}
                        </p>
                      </div>
                    )}

                    {tab === 'my' && (
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                        <p className="font-semibold text-slate-950">
                          Моя заявка
                        </p>
                        <p className="mt-1 text-slate-700">
                          Вы отправили заявку на это объявление.
                        </p>
                      </div>
                    )}
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      request.status === 'APPROVED'
                        ? 'bg-green-100 text-green-700'
                        : request.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {request.status === 'APPROVED'
                      ? 'Одобрено'
                      : request.status === 'REJECTED'
                        ? 'Отклонено'
                        : 'Ожидает'}
                  </span>
                </div>

                {tab === 'incoming' && request.status === 'PENDING' && (
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => handleStatusChange(request.id, 'APPROVED')}
                      className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                    >
                      Одобрить
                    </button>

                    <button
                      onClick={() => handleStatusChange(request.id, 'REJECTED')}
                      className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
                    >
                      Отклонить
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}