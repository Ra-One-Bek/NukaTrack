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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Заявки</h1>

        <div className="mb-6 flex gap-3">
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
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div>Загрузка заявок...</div>
        ) : currentList.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            Пока заявок нет.
          </div>
        ) : (
          <div className="space-y-5">
            {currentList.map((request) => (
              <div key={request.id} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {request.listing.title}
                  </h2>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {request.status}
                  </span>
                </div>

                <p className="mb-2 text-slate-600">
                  {request.listing.city} • {request.listing.category} •{' '}
                  {request.listing.pricePerDay.toLocaleString('ru-RU')} ₸
                </p>

                <p className="mb-4 text-slate-700">
                  Сообщение: {request.message || 'Без сообщения'}
                </p>

                {tab === 'incoming' && (
                  <div className="mb-4 text-sm text-slate-600">
                    Отправитель: {request.sender.name} ({request.sender.email})
                  </div>
                )}

                {tab === 'incoming' && request.status === 'PENDING' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange(request.id, 'APPROVED')}
                      className="rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                    >
                      Одобрить
                    </button>

                    <button
                      onClick={() => handleStatusChange(request.id, 'REJECTED')}
                      className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
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
    </div>
  );
}