import ComingSoon from '@/components/dashboard/ComingSoon';

export default function AgentPackagesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Travel Packages</h1>
        <p className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mt-1">
          Build and publish curated travel packages for your clients.
        </p>
      </div>
      <ComingSoon
        title="Package builder is on its way"
        description="Soon you'll be able to create, price, and publish travel packages that clients can book directly."
      />
    </div>
  );
}
