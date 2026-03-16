import { useState } from 'react';
import type { ListingImage } from '../../types/listing';

interface TruckGalleryProps {
  images: ListingImage[];
  title: string;
  isVip?: boolean;
}

export default function TruckGallery({
  images,
  title,
  isVip = false,
}: TruckGalleryProps) {
  const fallbackImage =
    'https://via.placeholder.com/1200x700?text=No+Image';

  const safeImages =
    images.length > 0
      ? images
      : [
          {
            id: 'fallback',
            listingId: 'fallback',
            imageUrl: fallbackImage,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = safeImages[activeIndex];

  return (
    <div className="space-y-4">
      <div
        className={`overflow-hidden rounded-3xl ${
          isVip ? 'ring-1 ring-white/10 bg-white/5' : 'bg-white'
        }`}
      >
        <img
          src={activeImage.imageUrl}
          alt={title}
          className={`w-full object-cover ${
            isVip ? 'h-[420px] md:h-[520px]' : 'h-[320px] md:h-[420px]'
          }`}
        />
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {safeImages.slice(0, 10).map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-2xl border-2 transition ${
                index === activeIndex
                  ? isVip
                    ? 'border-amber-400'
                    : 'border-blue-600'
                  : 'border-transparent'
              }`}
            >
              <img
                src={image.imageUrl}
                alt={`${title} ${index + 1}`}
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}