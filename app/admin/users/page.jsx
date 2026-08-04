import UserManagementTable from '@/components/dashboard/UserManagementTable';

export default function AdminUsersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">User Management</h1>
        <p className="text-[13.5px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 mt-1">
          View and manage every account on the platform.
        </p>
      </div>
      <UserManagementTable
        emptyTitle="No users found"
        emptyDescription="No accounts match your search."
      />
    </div>
  );
}
