import UserManagementTable from '@/components/dashboard/UserManagementTable';

export default function AdminAgentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Agent Management</h1>
        <p className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mt-1">
          View and manage travel agent accounts.
        </p>
      </div>
      <UserManagementTable
        roleFilter="travel_agent"
        emptyTitle="No travel agents yet"
        emptyDescription="Once travel agents sign up, they'll appear here."
      />
    </div>
  );
}
