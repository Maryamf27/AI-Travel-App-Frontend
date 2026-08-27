import ComingSoon from '@/components/dashboard/ComingSoon';

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Settings</h1>
        <p className="text-[13.5px] sm:text-[14px] text-slate-500 dark:text-slate-400 mt-1">
          Configure platform-wide preferences.
        </p>
      </div>
      <ComingSoon
        title="Platform settings are on their way"
        description="Soon you'll be able to configure roles, permissions, and platform-wide preferences from here."
      />
    </div>
  );
}
