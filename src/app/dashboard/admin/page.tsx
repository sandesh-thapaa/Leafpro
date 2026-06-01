"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import {
  Building2,
  ExternalLink,
  Plus,
  Loader2,
  KeyRound,
  ShieldAlert,
  PauseCircle,
  PlayCircle,
  Search,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface Tenant {
  _id: string;
  name: string;
  slug: string;
  phone: string;
  role: string;
  accountStatus: string;
  createdAt: string;
  updatedAt: string;
  pageViewCount: number;
  galleryCount: number;
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
  const [resetRequests, setResetRequests] = useState<any[]>([]);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const changeStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/v1/dashboard/admin/tenants/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountStatus: status }),
      });
      const data = await res.json();
      if (!data.success) { showToast(data.error || "Failed", "error"); return; }
      showToast(`Tenant ${status === "active" ? "activated" : "suspended"}`, "success");
      fetchTenants();
    } catch { showToast("Failed", "error"); }
    finally { setActionLoading(null); }
  };

  const deleteTenant = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this tenant? This action cannot be undone and will remove all data including images.")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/v1/dashboard/admin/tenants/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) { showToast(data.error || "Failed", "error"); return; }
      showToast("Tenant permanently deleted", "success");
      fetchTenants();
    } catch { showToast("Failed", "error"); }
    finally { setActionLoading(null); }
  };

  const fetchResetRequests = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/dashboard/admin/reset-requests");
      const data = await res.json();
      if (data.success) setResetRequests(data.data);
    } catch {}
  }, []);

  const fetchTenants = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/v1/dashboard/admin/tenants?${params.toString()}`);
      if (res.status === 403) { setIsAuthorized(false); return; }
      const data = await res.json();
      if (data.success) setTenants(data.data);
    } catch {
      showToast("Failed to load tenants", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast, searchQuery, statusFilter]);

  useEffect(() => {
    fetchTenants();
    fetchResetRequests();
  }, [fetchTenants, fetchResetRequests]);

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

  const handleResetPassword = async () => {
    if (!selectedRequest || !newPassword || newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }
    setIsResetting(true);
    try {
      const res = await fetch("/api/v1/dashboard/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedRequest._id, newPassword }),
      });
      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Failed to reset password", "error");
        return;
      }
      showToast(`Password reset for ${selectedRequest.businessName}`, "success");
      setShowResetModal(false);
      setSelectedRequest(null);
      setNewPassword("");
      fetchResetRequests();
    } catch {
      showToast("Failed to reset password", "error");
    } finally {
      setIsResetting(false);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage all tenant businesses</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : <>
            <Plus className="h-4 w-4 mr-2" />
            New Tenant
          </>}
        </Button>
      </div>

      {/* Create Tenant Form */}
      {showForm && (
        <Card hover={false}>
          <form onSubmit={handleCreate} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Tenant</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input label="Business Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Sandesh Store" required />
              <Input label="Phone Number" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="9779812345678" required />
              <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Min 8 characters" required />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" isLoading={isCreating}>Create Tenant</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Password Reset Requests */}
      {resetRequests.length > 0 && (
        <Card hover={false}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900">Password Reset Requests</h2>
            <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
              {resetRequests.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {resetRequests.map((req) => (
              <div key={req._id} className="flex items-center justify-between p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{req.businessName}</p>
                  <p className="text-xs text-gray-500">{req.phone}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Requested {new Date(req.requestedAt).toLocaleDateString()}
                  </p>
                </div>
                <Button size="sm" onClick={() => {
                  setSelectedRequest(req);
                  setShowResetModal(true);
                  setNewPassword("");
                }}>
                  <KeyRound className="h-3.5 w-3.5 mr-1.5" />
                  Generate Password
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setIsLoading(true); fetchTenants(); } }}
            placeholder="Search by name or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
          />
        </div>
        <div className="flex gap-1">
          {["all", "active", "suspended"].map((f) => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); setIsLoading(true); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                statusFilter === f
                  ? "bg-accent text-white shadow-sm"
                  : "bg-white text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tenant List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="space-y-2">
          {tenants.map((tenant) => (
            <div key={tenant._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{tenant.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                      tenant.accountStatus === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {tenant.accountStatus}
                    </span>
                    {tenant.role === "superadmin" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium shrink-0">superadmin</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-gray-500">
                    <span>{tenant.phone}</span>
                    <span className="text-gray-300">/</span>
                    <span>{tenant.slug}</span>
                    <span className="text-gray-300">|</span>
                    <span>{tenant.pageViewCount} views</span>
                    <span>{tenant.galleryCount} images</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-gray-400">
                    <span>Created: {new Date(tenant.createdAt).toLocaleDateString()}</span>
                    {tenant.updatedAt && <span>Updated: {new Date(tenant.updatedAt).toLocaleDateString()}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-wrap self-end sm:self-center">
                  <a href={`/${tenant.slug}`} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/5 transition-all" title="View page">
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  {tenant.role !== "superadmin" && (
                    <>
                      {tenant.accountStatus === "active" ? (
                        <button onClick={() => changeStatus(tenant._id, "suspended")}
                          disabled={actionLoading === tenant._id}
                          className="p-2 rounded-lg text-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all disabled:opacity-50" title="Suspend">
                          <PauseCircle className="h-4 w-4" />
                        </button>
                      ) : (
                        <button onClick={() => changeStatus(tenant._id, "active")}
                          disabled={actionLoading === tenant._id}
                          className="p-2 rounded-lg text-green-400 hover:text-green-600 hover:bg-green-50 transition-all disabled:opacity-50" title="Activate">
                          <PlayCircle className="h-4 w-4" />
                        </button>
                      )}

                      <button onClick={() => {
                        setSelectedRequest({ _id: tenant._id, businessName: tenant.name, phone: tenant.phone });
                        setShowResetModal(true);
                        setNewPassword("");
                      }}
                        className="p-2 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="Reset password">
                        <RotateCcw className="h-4 w-4" />
                      </button>

                      <button onClick={() => deleteTenant(tenant._id)}
                        disabled={actionLoading === tenant._id}
                        className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50" title="Delete permanently">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {tenants.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Building2 className="h-8 w-8 mx-auto mb-3" />
              <p className="text-sm">No tenants found.</p>
            </div>
          )}
        </div>
      )}

      {/* Reset Password Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => { setShowResetModal(false); setSelectedRequest(null); setNewPassword(""); }}
        title={`Reset Password for ${selectedRequest?.businessName || ""}`}
        maxWidth="max-w-sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Set a new password for <strong>{selectedRequest?.businessName}</strong> ({selectedRequest?.phone}).
            The user will be prompted to change this on first login.
          </p>
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Min 8 characters"
            hint="At least 8 characters, 1 uppercase, 1 number"
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="ghost"
              onClick={() => { setShowResetModal(false); setSelectedRequest(null); setNewPassword(""); }}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword} isLoading={isResetting}>
              Reset Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
