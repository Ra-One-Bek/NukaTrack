import type { ListingOwner } from '../../types/listing';

interface ContactOwnerModalProps {
  owner: ListingOwner;
  isOpen: boolean;
  onClose: () => void;
}

function normalizePhone(phone?: string) {
  if (!phone) return '';

  return phone.replace(/[^\d]/g, '');
}

export default function ContactOwnerModal({
  owner,
  isOpen,
  onClose,
}: ContactOwnerModalProps) {
  const phone = owner.phone || '';
  const normalizedPhone = normalizePhone(phone);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-300 md:left-auto md:right-6 md:top-6 md:h-fit md:w-[420px] md:rounded-3xl ${
          isOpen
            ? 'translate-y-0 md:translate-x-0'
            : 'translate-y-full md:translate-x-[120%]'
        }`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Контакты владельца</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {owner.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-xl text-slate-500 hover:bg-slate-200"
          >
            ×
          </button>
        </div>

        {phone ? (
          <>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Номер телефона</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{phone}</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={`tel:${phone}`}
                className="rounded-2xl bg-slate-900 px-4 py-3 text-center font-semibold text-white hover:bg-slate-800"
              >
                Позвонить
              </a>

              <a
                href={`https://wa.me/${normalizedPhone}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-green-600 px-4 py-3 text-center font-semibold text-white hover:bg-green-700"
              >
                WhatsApp
              </a>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-amber-50 p-4 text-amber-800">
            У владельца пока не указан номер телефона.
          </div>
        )}
      </div>
    </div>
  );
}