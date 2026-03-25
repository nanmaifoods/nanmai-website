"use client";
import { useState, useEffect } from "react";
import { Search, Eye, Download, Loader2 } from "lucide-react";
import { useAdminMode } from "@/store/adminModeContext";

const STATUS_OPTIONS = [
  "all",
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-brand-pink/10 text-brand-pink",
  cancelled: "bg-red-100 text-red-600",
  refunded: "bg-gray-100 text-gray-600",
};

// Mock data for test mode
const TEST_ORDERS = [
  {
    id: "test-1",
    order_number: "NM-2024-001",
    customer_name: "Priya Sharma",
    customer_email: "priya@email.com",
    customer_phone: "9876543210",
    total: 497,
    status: "confirmed",
    payment_status: "paid",
    created_at: new Date(Date.now() - 120000).toISOString(),
    items: [
      { product: { name: "Classic Appalam" }, quantity: 2 },
      { product: { name: "Garlic Appalam" }, quantity: 1 },
    ],
  },
  {
    id: "test-2",
    order_number: "NM-2024-002",
    customer_name: "Ramesh Kumar",
    customer_email: "ramesh@email.com",
    customer_phone: "9876543211",
    total: 179,
    status: "shipped",
    payment_status: "paid",
    created_at: new Date(Date.now() - 1080000).toISOString(),
    items: [{ product: { name: "Garlic Appalam" }, quantity: 1 }],
  },
  {
    id: "test-3",
    order_number: "NM-2024-003",
    customer_name: "Anitha Rajan",
    customer_email: "anitha@email.com",
    customer_phone: "9876543212",
    total: 358,
    status: "pending",
    payment_status: "paid",
    created_at: new Date(Date.now() - 2040000).toISOString(),
    items: [{ product: { name: "Pepper Appalam" }, quantity: 2 }],
  },
  {
    id: "test-4",
    order_number: "NM-2024-004",
    customer_name: "Karthik Srinivas",
    customer_email: "karthik@email.com",
    customer_phone: "9876543213",
    total: 895,
    status: "processing",
    payment_status: "paid",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    items: [
      { product: { name: "Jumbo Pack" }, quantity: 2 },
      { product: { name: "Mini Appalam" }, quantity: 1 },
    ],
  },
  {
    id: "test-5",
    order_number: "NM-2024-005",
    customer_name: "Meena Devi",
    customer_email: "meena@email.com",
    customer_phone: "9876543214",
    total: 449,
    status: "delivered",
    payment_status: "paid",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    items: [{ product: { name: "Jumbo Pack" }, quantity: 1 }],
  },
  {
    id: "test-6",
    order_number: "NM-2024-006",
    customer_name: "Suresh Babu",
    customer_email: "suresh@email.com",
    customer_phone: "9876543215",
    total: 149,
    status: "cancelled",
    payment_status: "refunded",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    items: [{ product: { name: "Classic Appalam" }, quantity: 1 }],
  },
];

export default function AdminOrdersPage() {
  const { isTest } = useAdminMode();
  const [orders, setOrders] = useState<typeof TEST_ORDERS>(TEST_ORDERS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof TEST_ORDERS)[0] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isTest) {
      fetchLiveOrders();
    } else {
      setOrders(TEST_ORDERS);
    }
  }, [isTest]);

  const fetchLiveOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (
      search &&
      !o.customer_name.toLowerCase().includes(search.toLowerCase()) &&
      !o.order_number.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const updateStatus = async (orderId: string, status: string) => {
    if (isTest) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
      if (selected?.id === orderId)
        setSelected((prev) => ({ ...prev, status }));
    } else {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (res.ok) {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
          );
          if (selected?.id === orderId)
            setSelected((prev) => ({ ...prev, status }));
        }
      } catch (err) {
        console.error("Error updating status:", err);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode indicator */}
      <div
        className={`text-sm px-4 py-2 rounded-xl ${isTest ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : "bg-green-50 text-green-700 border border-green-200"}`}
      >
        {isTest
          ? "🧪 TEST Mode: Showing sample orders for preview"
          : "🚀 LIVE Mode: Connected to database"}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="input-field pl-9 bg-white"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field bg-white max-w-[160px] capitalize"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s === "all" ? "All Status" : s}
            </option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm hover:border-brand-pink hover:text-brand-pink transition-colors">
          <Download size={14} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-5 py-3.5 text-left">Order</th>
                <th className="px-5 py-3.5 text-left">Customer</th>
                <th className="px-5 py-3.5 text-left hidden md:table-cell">
                  Date
                </th>
                <th className="px-5 py-3.5 text-left">Total</th>
                <th className="px-5 py-3.5 text-left">Status</th>
                <th className="px-5 py-3.5 text-left hidden lg:table-cell">
                  Payment
                </th>
                <th className="px-5 py-3.5 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Loader2
                      size={24}
                      className="animate-spin text-brand-pink mx-auto"
                    />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-gray-400"
                  >
                    <div className="text-4xl mb-2">📦</div>
                    <p className="font-medium">No orders found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="font-mono text-xs text-brand-pink font-semibold">
                        {order.order_number || order.id.substring(0, 12)}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {(order.items as Array<{ product?: { name: string } }>)
                          .length || 1}{" "}
                        items
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {order.customer_name || "Guest"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.customer_email || "N/A"}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-gray-500 text-xs">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 font-bold">₹{order.total}</td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`badge border-0 cursor-pointer capitalize focus:outline-none text-xs font-semibold py-1 px-2 rounded-full ${STATUS_BADGE[order.status] || "bg-gray-100 text-gray-600"}`}
                      >
                        {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-white text-brand-dark capitalize"
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span
                        className={`badge text-xs capitalize ${order.payment_status === "paid" ? "bg-green-100 text-green-700" : order.payment_status === "refunded" ? "bg-gray-100 text-gray-600" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelected(order)}
                        className="p-1.5 rounded-lg hover:bg-brand-pink/10 hover:text-brand-pink transition-colors text-gray-400"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <div className="font-bold text-base">
                  {selected.order_number || selected.id.substring(0, 12)}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(selected.created_at).toLocaleString("en-IN")}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Customer</p>
                  <p className="font-semibold text-sm">
                    {selected.customer_name || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selected.customer_email || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selected.customer_phone || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Order Status</p>
                  <span
                    className={`badge capitalize ${STATUS_BADGE[selected.status] || "bg-gray-100 text-gray-600"}`}
                  >
                    {selected.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">
                    Payment:{" "}
                    <span className="font-semibold capitalize">
                      {selected.payment_status}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Items Ordered</p>
                <div className="space-y-2">
                  {(
                    selected.items as Array<{
                      product?: { name: string };
                      quantity?: number;
                    }>
                  ).map(
                    (
                      item: { product?: { name: string }; quantity?: number },
                      i: number,
                    ) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 text-sm"
                      >
                        <span className="font-medium">
                          {item?.product?.name || "Product"}
                        </span>
                        <span className="text-gray-500">
                          ×{item?.quantity || 1}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center bg-brand-pink/5 rounded-2xl px-5 py-4">
                <span className="font-bold">Total Amount</span>
                <span className="font-black text-xl text-brand-pink">
                  ₹{selected.total}
                </span>
              </div>
              <div className="flex gap-2">
                {["confirmed", "processing", "shipped", "delivered"].map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`flex-1 py-2 px-2 rounded-xl text-xs font-semibold transition-all capitalize ${selected.status === s ? "bg-brand-pink text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
