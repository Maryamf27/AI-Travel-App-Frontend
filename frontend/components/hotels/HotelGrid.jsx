'use client';

import HotelCard from './HotelCard';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyHotelState from './EmptyHotelState';

export default function HotelGrid({ hotels, loading }) {
  if (loading) {
    return <LoadingSkeleton count={6} variant="card" />;
  }

  if (!hotels || hotels.length === 0) {
    return (
      <EmptyHotelState
        title="No hotels found"
        description="We couldn't find any hotels for this search. Try a different destination or date range."
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {hotels.map((hotel, idx) => (
        <HotelCard key={hotel._id || hotel.id || idx} hotel={hotel} />
      ))}
    </div>
  );
}
