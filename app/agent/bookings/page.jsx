import ComingSoon from '@/components/dashboard/ComingSoon';

export default function AgentBookingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Bookings</h1>
        <p className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mt-1">
          Track and manage active and past bookings.
        </p>
      </div>
      <ComingSoon
        title="Booking management is on its way"
        description="Soon you'll be able to create bookings for clients, track statuses, and view booking history here."
      />
    </div>
  );
}
