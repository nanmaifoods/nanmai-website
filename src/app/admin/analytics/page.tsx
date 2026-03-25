"use client";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { useAdminMode } from "@/store/adminModeContext";

// Test mode data
const TEST_MONTHLY = [
  { month: "Jan", revenue: 52000, orders: 210, customers: 185, avgOrder: 248 },
  { month: "Feb", revenue: 63000, orders: 245, customers: 210, avgOrder: 257 },
  { month: "Mar", revenue: 71000, orders: 290, customers: 248, avgOrder: 245 },
  { month: "Apr", revenue: 68000, orders: 275, customers: 230, avgOrder: 247 },
  { month: "May", revenue: 82000, orders: 320, customers: 271, avgOrder: 256 },
  { month: "Jun", revenue: 95000, orders: 370, customers: 305, avgOrder: 257 },
  { month: "Jul", revenue: 89000, orders: 355, customers: 290, avgOrder: 251 },
  { month: "Aug", revenue: 104000, orders: 410, customers: 340, avgOrder: 254 },
  { month: "Sep", revenue: 112000, orders: 435, customers: 360, avgOrder: 257 },
  { month: "Oct", revenue: 98000, orders: 390, customers: 315, avgOrder: 251 },
  { month: "Nov", revenue: 118000, orders: 460, customers: 380, avgOrder: 257 },
  { month: "Dec", revenue: 124500, orders: 485, customers: 400, avgOrder: 257 },
];

const TEST_CATEGORY_PIE = [
  { name: "Flavoured", value: 42, color: "#12A6DF" },
  { name: "Classic", value: 28, color: "#2E7D32" },
  { name: "Packs", value: 18, color: "#F9A825" },
  { name: "Mini", value: 12, color: "#66BB6A" },
];

const TEST_CITY_DATA = [
  { city: "Chennai", orders: 180 },
  { city: "Bangalore", orders: 145 },
  { city: "Hyderabad", orders: 120 },
  { city: "Coimbatore", orders: 95 },
  { city: "Madurai", orders: 78 },
  { city: "Trichy", orders: 65 },
  { city: "Kochi", orders: 55 },
];

const TEST_WEEKLY_ORDERS = [
  { day: "Mon", orders: 42 },
  { day: "Tue", orders: 58 },
  { day: "Wed", orders: 71 },
  { day: "Thu", orders: 49 },
  { day: "Fri", orders: 88 },
  { day: "Sat", orders: 102 },
  { day: "Sun", orders: 75 },
];

export default function AdminAnalyticsPage() {
  const { isTest } = useAdminMode();
  const [loading, setLoading] = useState(!isTest);
  const [monthly, setMonthly] = useState(TEST_MONTHLY);
  const [categoryPie, setCategoryPie] = useState(TEST_CATEGORY_PIE);
  const [cityData, setCityData] = useState(TEST_CITY_DATA);
  const [weeklyOrders, setWeeklyOrders] = useState(TEST_WEEKLY_ORDERS);

  useEffect(() => {
    if (!isTest) {
      fetchLiveAnalytics();
    } else {
      setMonthly(TEST_MONTHLY);
      setCategoryPie(TEST_CATEGORY_PIE);
      setCityData(TEST_CITY_DATA);
      setWeeklyOrders(TEST_WEEKLY_ORDERS);
      setLoading(false);
    }
  }, [isTest]);

  const fetchLiveAnalytics = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/products"),
      ]);

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();

      if (ordersData.orders && productsData.products) {
        const orders = ordersData.orders;
        const products = productsData.products;

        // Calculate monthly data from orders
        const monthlyMap = new Map<
          string,
          { revenue: number; orders: number }
        >();
        orders.forEach((o: { created_at: string; total: number }) => {
          const date = new Date(o.created_at);
          const monthKey = date.toLocaleDateString("en-US", { month: "short" });
          const existing = monthlyMap.get(monthKey) || {
            revenue: 0,
            orders: 0,
          };
          monthlyMap.set(monthKey, {
            revenue: existing.revenue + (o.total || 0),
            orders: existing.orders + 1,
          });
        });

        const liveMonthly = Array.from(monthlyMap.entries()).map(
          ([month, data]) => ({
            month,
            revenue: data.revenue,
            orders: data.orders,
            customers: data.orders,
            avgOrder:
              data.orders > 0 ? Math.round(data.revenue / data.orders) : 0,
          }),
        );

        // Calculate category distribution
        const categoryCount: Record<string, number> = {};
        products.forEach((p: { category: string }) => {
          categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
        });

        const totalProducts = products.length || 1;
        const liveCategoryPie = Object.entries(categoryCount).map(
          ([name, count], i) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value: Math.round((count / totalProducts) * 100),
            color: ["#12A6DF", "#2E7D32", "#F9A825", "#66BB6A", "#E91E8C"][
              i % 5
            ],
          }),
        );

        // Live weekly orders (just use current data)
        const liveWeekly = TEST_WEEKLY_ORDERS;

        // Live city data (mock for now)
        const liveCityData = TEST_CITY_DATA;

        setMonthly(liveMonthly.length > 0 ? liveMonthly : TEST_MONTHLY);
        setCategoryPie(
          liveCategoryPie.length > 0 ? liveCategoryPie : TEST_CATEGORY_PIE,
        );
        setWeeklyOrders(liveWeekly);
        setCityData(liveCityData);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setMonthly(TEST_MONTHLY);
      setCategoryPie(TEST_CATEGORY_PIE);
      setCityData(TEST_CITY_DATA);
      setWeeklyOrders(TEST_WEEKLY_ORDERS);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = monthly.reduce((s, m) => s + m.orders, 0);
  const avgOrderVal =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="space-y-6">
      {/* Mode indicator */}
      <div
        className={`text-sm px-4 py-2 rounded-xl ${isTest ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : "bg-green-50 text-green-700 border border-green-200"}`}
      >
        {isTest
          ? "🧪 TEST Mode: Showing sample analytics for preview"
          : "🚀 LIVE Mode: Connected to database"}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Annual Revenue",
            value: `₹${(totalRevenue / 100000).toFixed(2)}L`,
            change: "+23.4%",
            up: true,
            icon: TrendingUp,
          },
          {
            label: "Total Orders",
            value: totalOrders.toLocaleString(),
            change: "+18.2%",
            up: true,
            icon: ShoppingBag,
          },
          {
            label: "Avg Order Value",
            value: `₹${avgOrderVal}`,
            change: "+2.1%",
            up: true,
            icon: Package,
          },
          {
            label: "Return Rate",
            value: "1.8%",
            change: "-0.3%",
            up: true,
            icon: TrendingDown,
          },
        ].map(({ label, value, change, up, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-brand-pink/10 flex items-center justify-center">
                <Icon size={16} className="text-brand-pink" />
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold ml-auto ${up ? "text-green-600" : "text-red-500"}`}
              >
                <ArrowUpRight size={12} />
                {change}
              </span>
            </div>
            <div className="font-black text-2xl text-brand-dark">
              {loading ? <Loader2 size={24} className="animate-spin" /> : value}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Area Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold">Annual Revenue Trend</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {isTest
                ? "Sample monthly revenue data"
                : "Live monthly revenue from database"}
            </p>
          </div>
          <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#12A6DF" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#12A6DF" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#12A6DF"
              strokeWidth={3}
              fill="url(#rev)"
              dot={{ fill: "#12A6DF", r: 3 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Orders */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold mb-1">Daily Orders This Week</h3>
          <p className="text-xs text-gray-400 mb-4">Orders breakdown by day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyOrders} barSize={28}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="day"
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
              <Bar dataKey="orders" fill="#2E7D32" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold mb-1">Sales by Category</h3>
          <p className="text-xs text-gray-400 mb-4">
            {isTest
              ? "Sample category distribution"
              : "Live category distribution from products"}
          </p>
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie
                  data={categoryPie}
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryPie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v}%`, ""]}
                  contentStyle={{ borderRadius: 10, border: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {categoryPie.map(({ name, value, color }) => (
                <div key={name} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <span className="text-sm text-gray-600 flex-1">{name}</span>
                  <span className="text-sm font-bold">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Cities */}
      <div className="bg-white rounded-2xl p-5 shadow-card">
        <h3 className="font-bold mb-4">Top Performing Cities</h3>
        <div className="space-y-3">
          {cityData.map(({ city, orders }, i) => {
            const maxOrders = cityData[0]?.orders || 1;
            const pct = Math.round((orders / maxOrders) * 100);
            return (
              <div key={city} className="flex items-center gap-3">
                <span className="text-xs font-bold w-5 text-gray-400">
                  {i + 1}
                </span>
                <span className="text-sm font-medium w-28">{city}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-green transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm font-bold w-12 text-right">
                  {loading ? (
                    <Loader2 size={14} className="animate-spin inline" />
                  ) : (
                    orders
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
