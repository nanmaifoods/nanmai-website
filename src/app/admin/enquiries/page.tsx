"use client";
import { useState, useEffect } from "react";
import { Search, Mail, Phone, Trash2, MessageCircle } from "lucide-react";
import { useAdminMode } from "@/store/adminModeContext";
import { Spinner } from "@/components/ui/Spinner";

const STATUS_OPTIONS = ["all", "new", "read", "replied"];

const STATUS_BADGE: Record<string, string> = {
  new: "bg-brand-pink/10 text-brand-pink",
  read: "bg-blue-100 text-blue-700",
  replied: "bg-green-100 text-green-700",
};

interface Enquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
}

const TEST_ENQUIRIES: Enquiry[] = [
  {
    id: "test-1",
    created_at: new Date(Date.now() - 120000).toISOString(),
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    subject: "Bulk Order",
    message: "Hi, I'd like to place a bulk order of 50 packs for a wedding event. Please share pricing.",
    status: "new",
  },
  {
    id: "test-2",
    created_at: new Date(Date.now() - 1080000).toISOString(),
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "9876543211",
    subject: "Product Question",
    message: "Does the Garlic Appalam contain any preservatives?",
    status: "read",
  },
  {
    id: "test-3",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    name: "Anitha Rajan",
    email: "anitha@example.com",
    phone: "9876543212",
    subject: "Order Inquiry",
    message: "My order NM-2024-003 hasn't arrived yet, can you check the status?",
    status: "replied",
  },
  {
    id: "test-4",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    name: "Karthik Srinivas",
    email: "karthik@example.com",
    phone: "9876543213",
    subject: "Partnership",
    message: "We run a chain of grocery stores in Hyderabad and would love to stock your products.",
    status: "new",
  },
];

export default function AdminEnquiriesPage() {
  const { isTest } = useAdminMode();
  const [enquiries, setEnquiries] = useState<Enquiry[]>(TEST_ENQUIRIES);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isTest) {
      fetchLiveEnquiries();
    } else {
      setEnquiries(TEST_ENQUIRIES);
    }
  }, [isTest]);

  const fetchLiveEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    );
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));

    if (isTest || id.startsWith("test-")) return;

    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error("Error updating enquiry:", err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    setSelected(null);

    if (isTest || id.startsWith("test-")) return;

    try {
      await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  const openEnquiry = (enquiry: Enquiry) => {
    setSelected(enquiry);
    if (enquiry.status === "new") {
      updateStatus(enquiry.id, "read");
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesFilter = filter === "all" || e.status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      e.message.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const totalEnquiries = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const repliedCount = enquiries.filter((e) => e.status === "replied").length;

  return (
    <div className="space-y-4">
      {/* Mode indicator */}
      <div
        className={`text-sm px-4 py-2 rounded-xl ${isTest ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : "bg-green-50 text-green-700 border border-green-200"}`}
      >
        {isTest
          ? "🧪 TEST Mode: Showing sample enquiries for preview"
          : "🚀 LIVE Mode: Connected to database"}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Enquiries",
            value: totalEnquiries,
            color: "bg-brand-pink/10 text-brand-pink",
          },
          {
            label: "New",
            value: newCount,
            color: "bg-blue-100 text-blue-600",
          },
          {
            label: "Replied",
            value: repliedCount,
            color: "bg-green-100 text-green-600",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl p-4 text-center ${color}`}>
            <div className="font-black text-2xl">
              {loading ? <Spinner size={80} className="mx-auto" /> : value}
            </div>
            <div className="text-xs font-medium mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries..."
            className="input-field pl-9 bg-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                filter === s
                  ? "bg-brand-pink text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-5 py-3.5 text-left">Sender</th>
                <th className="px-5 py-3.5 text-left hidden md:table-cell">
                  Subject
                </th>
                <th className="px-5 py-3.5 text-left hidden lg:table-cell">
                  Message
                </th>
                <th className="px-5 py-3.5 text-left">Date</th>
                <th className="px-5 py-3.5 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <Spinner size={104} className="mx-auto" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-gray-400"
                  >
                    <div className="text-4xl mb-2">📭</div>
                    <p className="font-medium">No enquiries found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${enquiry.status === "new" ? "font-semibold" : ""}`}
                    onClick={() => openEnquiry(enquiry)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm shrink-0">
                          {enquiry.name[0]}
                        </div>
                        <div>
                          <div className="font-medium">{enquiry.name}</div>
                          <div className="text-xs text-gray-400 font-normal">
                            {enquiry.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-gray-600">
                      {enquiry.subject}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-gray-500 font-normal max-w-xs truncate">
                      {enquiry.message}
                    </td>
                    <td className="px-5 py-4 text-gray-500 font-normal text-xs">
                      {new Date(enquiry.created_at).toLocaleDateString(
                        "en-IN",
                        { day: "2-digit", month: "short", year: "numeric" },
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`badge text-xs capitalize ${STATUS_BADGE[enquiry.status] || "bg-gray-100 text-gray-600"}`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-pink/10 text-brand-pink font-black text-2xl flex items-center justify-center">
                    {selected.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selected.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(selected.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={15} className="text-brand-pink shrink-0" />
                  <span>{selected.email}</span>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={15} className="text-brand-pink shrink-0" />
                    <span>{selected.phone}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {selected.subject}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`badge text-xs capitalize ${STATUS_BADGE[selected.status] || "bg-gray-100 text-gray-600"}`}
                >
                  {selected.status}
                </span>
                {selected.status !== "replied" && (
                  <button
                    onClick={() => updateStatus(selected.id, "replied")}
                    className="text-xs font-semibold text-brand-green hover:underline"
                  >
                    Mark as replied
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="flex-1 btn-secondary text-sm justify-center py-2"
                >
                  <MessageCircle size={14} /> Reply
                </a>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex-1 btn-green text-sm justify-center py-2"
                  >
                    <Phone size={14} /> Call
                  </a>
                )}
                <button
                  onClick={() => deleteEnquiry(selected.id)}
                  className="px-3 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
