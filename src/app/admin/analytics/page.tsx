'use client';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, ArrowUpRight } from 'lucide-react';

const MONTHLY = [
  { month: 'Jan', revenue: 52000,  orders: 210, customers: 185, avgOrder: 248 },
  { month: 'Feb', revenue: 63000,  orders: 245, customers: 210, avgOrder: 257 },
  { month: 'Mar', revenue: 71000,  orders: 290, customers: 248, avgOrder: 245 },
  { month: 'Apr', revenue: 68000,  orders: 275, customers: 230, avgOrder: 247 },
  { month: 'May', revenue: 82000,  orders: 320, customers: 271, avgOrder: 256 },
  { month: 'Jun', revenue: 95000,  orders: 370, customers: 305, avgOrder: 257 },
  { month: 'Jul', revenue: 89000,  orders: 355, customers: 290, avgOrder: 251 },
  { month: 'Aug', revenue: 104000, orders: 410, customers: 340, avgOrder: 254 },
  { month: 'Sep', revenue: 112000, orders: 435, customers: 360, avgOrder: 257 },
  { month: 'Oct', revenue: 98000,  orders: 390, customers: 315, avgOrder: 251 },
  { month: 'Nov', revenue: 118000, orders: 460, customers: 380, avgOrder: 257 },
  { month: 'Dec', revenue: 124500, orders: 485, customers: 400, avgOrder: 257 },
];

const CATEGORY_PIE = [
  { name: 'Flavoured', value: 42, color: '#E91E8C' },
  { name: 'Classic',   value: 28, color: '#2E7D32' },
  { name: 'Packs',     value: 18, color: '#F9A825' },
  { name: 'Mini',      value: 12, color: '#66BB6A' },
];

const CITY_DATA = [
  { city: 'Chennai',    orders: 180 },
  { city: 'Bangalore',  orders: 145 },
  { city: 'Hyderabad',  orders: 120 },
  { city: 'Coimbatore', orders: 95  },
  { city: 'Madurai',    orders: 78  },
  { city: 'Trichy',     orders: 65  },
  { city: 'Kochi',      orders: 55  },
];

const WEEKLY_ORDERS = [
  { day: 'Mon', orders: 42 },
  { day: 'Tue', orders: 58 },
  { day: 'Wed', orders: 71 },
  { day: 'Thu', orders: 49 },
  { day: 'Fri', orders: 88 },
  { day: 'Sat', orders: 102 },
  { day: 'Sun', orders: 75 },
];

export default function AdminAnalyticsPage() {
  const totalRevenue = MONTHLY.reduce((s, m) => s + m.revenue, 0);
  const totalOrders  = MONTHLY.reduce((s, m) => s + m.orders, 0);
  const avgOrderVal  = Math.round(totalRevenue / totalOrders);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Annual Revenue',   value: `₹${(totalRevenue/100000).toFixed(2)}L`, change: '+23.4%', up: true,  icon: TrendingUp },
          { label: 'Total Orders',     value: totalOrders.toLocaleString(),             change: '+18.2%', up: true,  icon: ShoppingBag },
          { label: 'Avg Order Value',  value: `₹${avgOrderVal}`,                        change: '+2.1%',  up: true,  icon: Package },
          { label: 'Return Rate',      value: '1.8%',                                   change: '-0.3%',  up: true,  icon: TrendingDown },
        ].map(({ label, value, change, up, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-brand-pink/10 flex items-center justify-center">
                <Icon size={16} className="text-brand-pink" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ml-auto ${up ? 'text-green-600' : 'text-red-500'}`}>
                <ArrowUpRight size={12} />{change}
              </span>
            </div>
            <div className="font-black text-2xl text-brand-dark">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Area Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold">Annual Revenue Trend</h3>
            <p className="text-xs text-gray-400 mt-0.5">Monthly revenue for current year</p>
          </div>
          <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none">
            <option>2024</option><option>2023</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={MONTHLY}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E91E8C" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#E91E8C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="revenue" stroke="#E91E8C" strokeWidth={3} fill="url(#rev)" dot={{ fill: '#E91E8C', r: 3 }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Orders */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold mb-1">Daily Orders This Week</h3>
          <p className="text-xs text-gray-400 mb-4">Orders breakdown by day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY_ORDERS} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="orders" fill="#2E7D32" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold mb-1">Sales by Category</h3>
          <p className="text-xs text-gray-400 mb-4">Percentage of total orders</p>
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={CATEGORY_PIE} innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {CATEGORY_PIE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ borderRadius: 10, border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {CATEGORY_PIE.map(({ name, value, color }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
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
          {CITY_DATA.map(({ city, orders }, i) => {
            const pct = Math.round((orders / CITY_DATA[0].orders) * 100);
            return (
              <div key={city} className="flex items-center gap-3">
                <span className="text-xs font-bold w-5 text-gray-400">{i+1}</span>
                <span className="text-sm font-medium w-28">{city}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-green transition-all duration-1000" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-bold w-12 text-right">{orders}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
