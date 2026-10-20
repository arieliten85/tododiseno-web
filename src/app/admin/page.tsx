import { AdminApp } from "@/features/admin/components/admin-app";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-6 text-[#111]">
      <div className="mx-auto w-full max-w-3xl">
        <AdminApp />
      </div>
    </main>
  );
}
