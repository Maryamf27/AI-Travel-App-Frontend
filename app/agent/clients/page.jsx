import ComingSoon from '@/components/dashboard/ComingSoon';

export default function AgentClientsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Clients</h1>
        <p className="text-[13.5px] sm:text-[14px] text-slate-500 dark:text-slate-400 mt-1">
          Manage the travelers you work with.
        </p>
      </div>
      <ComingSoon
        title="Client management is on its way"
        description="Soon you'll be able to add clients, track their trips, and message them directly from here."
      />
    </div>
  );
}
