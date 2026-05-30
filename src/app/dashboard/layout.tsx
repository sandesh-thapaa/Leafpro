import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import { AUTH } from "@/lib/constants";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let role = "business_owner";
  let slug = "";

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH.COOKIE_NAME)?.value;
    if (token) {
      const user = await verifyJwt(token);
      if (user) {
        role = user.role;
        slug = user.slug;
      }
    }
  } catch {}

  return (
    <div className="h-screen bg-paper flex overflow-hidden">
      <Sidebar slug={slug} role={role} businessName="" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
