"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import {
  Building2,
  ExternalLink,
  Plus,
  Loader2,
  Calendar,
} from "lucide-react";

interface Tenant {
  _id: string;
  name: string;
  slug: string;
  phone: string;
  role: string;
  accountStatus: string;
  createdAt: string;
}

export default function AdminPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const fetchTenants = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/dashboard/admin/tenants");
      if (res.status === 403) {
        setIsAuthorized(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setTenants(data.data);
      }
    } catch {
      showToast("Failed to load tenants", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const res = await fetch("/api/v1/dashboard/admin/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        showToast(data.error || "Failed to create tenant", "error");
        setIsCreating(false);
        return;
      }

      showToast(
        `Created ${data.data.name} — login: ${data.data.phone}`,
        "success"
      );
      setShowForm(false);
      setFormData({ name: "", phone: "", password: "" });
      fetchTenants();
    } catch {
      showToast("Failed to create tenant", "error");
    } finally {
      setIsCreating(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-500 mb-6">
          Only superadmins can access this page.
        </p>
        <Button onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all tenant businesses
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Tenant
        </Button>
      </div>

      {showForm && (
        <Card hover={false}>
          <form onSubmit={handleCreate} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Create New Tenant
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                label="Business Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Sandesh Store"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="9779812345678"
                required
              />
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Min 8 characters"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreating}>
                Create Tenant
              </Button>
            </div>
          </form>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="space-y-3">
          {tenants.map((tenant) => (
            <Card key={tenant._id} hover={false}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">
                        {tenant.name}
                      </p>
                      <Badge
                        variant={
                          tenant.accountStatus === "active"
                            ? "success"
                            : "warning"
                        }
                      >
                        {tenant.accountStatus}
                      </Badge>
                      {tenant.role === "superadmin" && (
                        <Badge variant="accent">admin</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                      <span>{tenant.phone}</span>
                      <span>/</span>
                      <span>{tenant.slug}</span>
                      <Calendar className="h-3.5 w-3.5 ml-1" />
                      <span>
                        {new Date(tenant.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                {tenant.role !== "superadmin" && (
                  <a
                    href={`/${tenant.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/5 transition-all"
                    title="View page"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
