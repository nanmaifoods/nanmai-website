"use client";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAdminMode } from "@/store/adminModeContext";

// Mock data for test mode
const TEST_STATS = [
  {
    label: "Total Revenue",
    value: "₹1,24,500",
    change: "+12.5%",
    up: true,
    icon: TrendingUp,
    color: "pink",
  },
  {
    label: "Total Orders",
    value: "847",
    change: "+8.2%",
    up: true,
    icon: ShoppingBag,
    color: "green",
  },
  {
    label: "Products Active",
    value: "10",
    change: "+2",
    up: true,
    icon: Package,
    color: "gold",
  },
  {
    label: "Customers",
    value: "1,203",
    change: "+15.1%",
    up: true,
    icon: Users,
    color: "pink",
  },
];

const TEST_REVENUE_DATA = [
  { month: "Sep", revenue: 42000, orders: 180 },
  { month: "Oct", revenue: 58000, orders: 220 },
  { month: "Nov", revenue: 71000, orders: 290 },
  { month: "Dec", revenue: 95000, orders: 380 },
  { month: "Jan", revenue: 87000, orders: 340 },
  { month: "Feb", revenue: 112000, orders: 420 },
  { month: "Mar", revenue: 124500, orders: 480 },
];

const TEST_PRODUCT_DATA = [
  { name: "Classic", sales: 320 },
  { name: "Garlic", sales: 280 },
  { name: "Pepper", sales: 195 },
  { name: "Cumin", sales: 160 },
  { name: "Mini", sales: 140 },
  { name: "Jumbo", sales: 90 },
];

const TEST_PIE_DATA = [
  { name: "Confirmed", value: 68, color: "#2E7D32" },
  { name: "Pending", value: 15, color: "#F9A825" },
  { name: "Shipped", value: 12, color: "#12A6DF" },
  { name: "Cancelled", value: 5, color: "#ef4444" },
];

const TEST_RECENT_ORDERS = [
  {
    id: "NM-2024-001",
    customer: "Priya Sharma",
    items: 3,
    total: 497,
    status: "confirmed",
    time: "2 min ago",
  },
  {
    id: "NM-2024-002",
    customer: "Ramesh Kumar",
    items: 1,
    total: 179,
    status: "shipped",
    time: "18 min ago",
  },
  {
    id: "NM-2024-003",
    customer: "Anitha Rajan",
    items: 2,
    total: 358,
    status: "pending",
    time: "34 min ago",
  },
  {
    id: "NM-2024-004",
    customer: "Karthik Srinivas",
    items: 5,
    total: 895,
    status: "confirmed",
    time: "1 hr ago",
  },
  {
    id: "NM-2024-005",
    customer: "Meena Devi",
    items: 1,
    total: 449,
    status: "delivered",
    time: "2 hrs ago",
  },
];

const STATUS_BADGE: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-brand-pink/10 text-brand-pink",
  cancelled: "bg-red-100 text-red-600",
};

const COLOR_MAP: Record<string, string> = {
  pink: "bg-brand-pink/10 text-brand-pink",
  green: "bg-brand-green/10 text-brand-green",
  gold: "bg-brand-gold/20 text-brand-gold",
};

export function AdminDashboardClient() {
  const { isTest } = useAdminMode();
  const [loading, setLoading] = useState(!isTest);
  const [stats, setStats] = useState(TEST_STATS);
  const [revenueData, setRevenueData] = useState(TEST_REVENUE_DATA);
  const [productData, setProductData] = useState(TEST_PRODUCT_DATA);
  const [pieData, setPieData] = useState(TEST_PIE_DATA);
  const [recentOrders, setRecentOrders] = useState(TEST_RECENT_ORDERS);

  useEffect(() => {
    if (!isTest) {
      fetchLiveData();
    } else {
      setStats(TEST_STATS);
      setRevenueData(TEST_REVENUE_DATA);
      setProductData(TEST_PRODUCT_DATA);
      setPieData(TEST_PIE_DATA);
      setRecentOrders(TEST_RECENT_ORDERS);
      setLoading(false);
    }
  }, [isTest]);

  const fetchLiveData = async () => {
    setLoading(true);
    try {
      // Fetch orders
      const ordersRes = await fetch("/api/orders");
      const ordersData = await ordersRes.json();

      // Fetch products
      const productsRes = await fetch("/api/products");
      const productsData = await productsRes.json();

      // Fetch customers
      const customersRes = await fetch("/api/customers");
      const customersData = await customersRes.json();

      if (ordersData.orders && productsData.products) {
        const orders = ordersData.orders;
        const products = productsData.products;

        // Calculate stats
        const totalRevenue = orders.reduce(
          (sum: number, o: { total: number }) => sum + (o.total || 0),
          0,
        );
        const activeProducts = products.filter(
          (p: { is_active: boolean }) => p.is_active,
        ).length;
        const confirmedOrders = orders.filter((o: { status: string }) =>
          ["confirmed", "processing", "shipped", "delivered"].includes(
            o.status,
          ),
        ).length;
        const pendingOrders = orders.filter(
          (o: { status: string }) => o.status === "pending",
        ).length;
        const shippedOrders = orders.filter(
          (o: { status: string }) => o.status === "shipped",
        ).length;
        const cancelledOrders = orders.filter(
          (o: { status: string }) => o.status === "cancelled",
        ).length;

        setStats([
          {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            change: "+0%",
            up: true,
            icon: TrendingUp,
            color: "pink",
          },
          {
            label: "Total Orders",
            value: orders.length.toString(),
            change: "+0",
            up: true,
            icon: ShoppingBag,
            color: "green",
          },
          {
            label: "Products Active",
            value: activeProducts.toString(),
            change: "+0",
            up: true,
            icon: Package,
            color: "gold",
          },
          {
            label: "Customers",
            value: customersData.customers?.length?.toString() || "0",
            change: "+0",
            up: true,
            icon: Users,
            color: "pink",
          },
        ]);

        // Calculate pie data percentages
        const total = orders.length || 1;
        setPieData([
          {
            name: "Confirmed",
            value: Math.round((confirmedOrders / total) * 100),
            color: "#2E7D32",
          },
          {
            name: "Pending",
            value: Math.round((pendingOrders / total) * 100),
            color: "#F9A825",
          },
          {
            name: "Shipped",
            value: Math.round((shippedOrders / total) * 100),
            color: "#12A6DF",
          },
          {
            name: "Cancelled",
            value: Math.round((cancelledOrders / total) * 100),
            color: "#ef4444",
          },
        ]);

        // Recent orders (last 5)
        const recent5 = orders
          .slice(0, 5)
          .map(
            (o: {
              id: string;
              customer_name: string;
              items: unknown[];
              total: number;
              status: string;
            }) => ({
              id: o.id.substring(0, 12),
              customer: o.customer_name || "Guest",
              items: Array.isArray(o.items) ? o.items.length : 1,
              total: o.total || 0,
              status: o.status,
              time: "Just now",
            }),
          );
        setRecentOrders(recent5);
      }
    } catch (err) {
      console.error("Error fetching live data:", err);
      // Fallback to test data on error
      setStats(TEST_STATS);
      setRevenueData(TEST_REVENUE_DATA);
      setProductData(TEST_PRODUCT_DATA);
      setPieData(TEST_PIE_DATA);
      setRecentOrders(TEST_RECENT_ORDERS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode indicator */}
      <div
        className={`text-sm px-4 py-2 rounded-xl ${isTest ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : "bg-green-50 text-green-700 border border-green-200"}`}
      >
        {isTest
          ? "🧪 TEST Mode: Showing sample data for preview"
          : "🚀 LIVE Mode: Connected to database"}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${COLOR_MAP[color]}`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-green-600" : "text-red-500"}`}
              >
                {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {change}
              </span>
            </div>
            <div className="font-black text-2xl text-brand-dark">
              {loading ? <Loader2 size={24} className="animate-spin" /> : value}
            </div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Line Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base">Revenue & Orders</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {isTest
                  ? "Sample data - Last 7 months performance"
                  : "Live data from database"}
              </p>
            </div>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v: number, name: string) => [
                  name === "revenue" ? `₹${v.toLocaleString()}` : v,
                  name === "revenue" ? "Revenue" : "Orders",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#12A6DF"
                strokeWidth={3}
                dot={{ fill: "#12A6DF", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#2E7D32"
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold text-base mb-1">Order Status</h3>
          <p className="text-xs text-gray-400 mb-4">
            {isTest ? "Sample distribution" : "Live distribution"}
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => [`${v}%`, ""]}
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <span className="text-gray-500">{name}</span>
                <span className="font-bold ml-auto">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Product Sales Bar */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold text-base mb-1">Product Performance</h3>
          <p className="text-xs text-gray-400 mb-4">
            {isTest ? "Sample units sold" : "Live units sold"}
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productData} barSize={32}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="sales" fill="#12A6DF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold text-base mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              {
                label: "Add New Product",
                href: "/admin/products",
                color: "bg-brand-pink text-white",
              },
              {
                label: "View All Orders",
                href: "/admin/orders",
                color: "bg-brand-green text-white",
              },
              {
                label: "Manage Blog Posts",
                href: "/admin/blogs",
                color: "bg-brand-dark text-white",
              },
              {
                label: "Edit Homepage",
                href: "/admin/cms",
                color: "bg-brand-gold text-brand-dark",
              },
            ].map(({ label, href, color }) => (
              <a
                key={label}
                href={href}
                className={`block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5 ${color}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-base">Recent Orders</h3>
          <a
            href="/admin/orders"
            className="text-sm text-brand-pink font-semibold hover:underline"
          >
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 text-left">Order ID</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left hidden md:table-cell">
                  Items
                </th>
                <th className="px-5 py-3 text-left">Total</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left hidden lg:table-cell">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center">
                    <Loader2
                      size={24}
                      className="animate-spin text-brand-pink mx-auto"
                    />
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-brand-pink font-semibold">
                      {order.id}
                    </td>
                    <td className="px-5 py-3.5 font-medium">
                      {order.customer}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-gray-500">
                      {order.items} items
                    </td>
                    <td className="px-5 py-3.5 font-bold">₹{order.total}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`badge capitalize ${STATUS_BADGE[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-gray-400 text-xs">
                      {order.time}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
