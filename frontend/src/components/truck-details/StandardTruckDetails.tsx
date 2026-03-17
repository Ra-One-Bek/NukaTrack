import type { Listing } from '../../types/listing';
import TruckGallery from './TruckGallery';
import StandardInfoSection from './StandardInfoSection';

interface StandardTruckDetailsProps {
  listing: Listing;
}

export default function StandardTruckDetails({
  listing,
}: StandardTruckDetailsProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm lg:grid-cols-2">
          <TruckGallery images={listing.images} title={listing.title} />
          <StandardInfoSection listing={listing} />
        </div>
      </div>
    </div>
  );
}