import ProfileForm from '@/components/dashboard/ProfileForm';

export default function AgentProfilePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
        <p className="text-[13.5px] sm:text-[14px] text-slate-500 dark:text-slate-400 mt-1">
          Update your account details.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
