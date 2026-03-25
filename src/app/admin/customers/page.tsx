'use client';
import { useState } from 'react';
import { Search, Mail, Phone, MapPin, TrendingUp } from 'lucide-react';

const CUSTOMERS = [
  { id: '1', name: 'Priya Sharma',     email: 'priya@example.com',   phone: '9876543210', city: 'Chennai',    orders: 8,  spent: 3240, lastOrder: 'Mar 12, 2025', since: 'Jan 2024' },
  { id: '2', name: 'Ramesh Kumar',     email: 'ramesh@example.com',  phone: '9876543211', city: 'Bangalore',  orders: 5,  spent: 1890, lastOrder: 'Mar 11, 2025', since: 'Apr 2024' },
  { id: '3', name: 'Anitha Rajan',     email: 'anitha@example.com',  phone: '9876543212', city: 'Madurai',    orders: 12, spent: 5100, lastOrder: 'Mar 10, 2025', since: 'Nov 2023' },
  { id: '4', name: 'Karthik Srinivas', email: 'karthik@example.com', phone: '9876543213', city: 'Hyderabad',  orders: 3,  spent: 895,  lastOrder: 'Mar 9, 2025',  since: 'Feb 2025' },
  { id: '5', name: 'Meena Devi',       email: 'meena@example.com',   phone: '9876543214', city: 'Coimbatore', orders: 20, spent: 9200, lastOrder: 'Mar 8, 2025',  since: 'Aug 2023' },
  { id: '6', name: 'Suresh Babu',      email: 'suresh@example.com',  phone: '9876543215', city: 'Trichy',     orders: 4,  spent: 1480, lastOrder: 'Mar 7, 2025',  since: 'Jun 2024' },
  { id: '7', name: 'Kavitha Nair',     email: 'kavitha@example.com', phone: '9876543216', city: 'Kochi',      orders: 7,  spent: 2890, lastOrder: 'Mar 6, 2025',  since: 'Mar 2024' },
  { id: '8', name: 'Vijay Kumar',      email: 'vijay@example.com',   phone: '9876543217', city: 'Chennai',    orders: 15, spent: 6750, lastOrder: 'Mar 5, 2025',  since: 'Dec 2023' },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof CUSTOMERS[0] | null>(null);

  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const totalCustomers = CUSTOMERS.length;
  const totalRevenue   = CUSTOMERS.reduce((s, c) => s + c.spent, 0);
  const avgSpend       = Math.round(totalRevenue / totalCustomers);
  const repeatBuyers   = CUSTOMERS.filter(c => c.orders > 1).length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: totalCustomers,           color: 'bg-brand-pink/10 text-brand-pink'  },
          { label: 'Total Revenue',   value: `₹${(totalRevenue/1000).toFixed(1)}k`, color: 'bg-brand-green/10 text-brand-green' },
          { label: 'Avg. Spend',      value: `₹${avgSpend}`,           color: 'bg-brand-gold/20 text-brand-gold'  },
          { label: 'Repeat Buyers',   value: `${repeatBuyers}`,        color: 'bg-blue-100 text-blue-600'         },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl p-4 text-center ${color}`}>
            <div className="font-black text-2xl">{value}</div>
            <div className="text-xs font-medium mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="input-field pl-9 bg-white" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-5 py-3.5 text-left">Customer</th>
                <th className="px-5 py-3.5 text-left hidden md:table-cell">City</th>
                <th className="px-5 py-3.5 text-left">Orders</th>
                <th className="px-5 py-3.5 text-left">Total Spent</th>
                <th className="px-5 py-3.5 text-left hidden lg:table-cell">Last Order</th>
                <th className="px-5 py-3.5 text-left hidden lg:table-cell">Customer Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelected(customer)}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-pink/10 text-brand-pink font-bold flex items-center justify-center text-sm shrink-0">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-gray-400">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-gray-500">
                    <div className="flex items-center gap-1"><MapPin size={11}/>{customer.city}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">{customer.orders}</span>
                      {customer.orders >= 10 && <span className="badge bg-brand-green/10 text-brand-green text-xs">Loyal</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-brand-pink">₹{customer.spent.toLocaleString()}</td>
                  <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">{customer.lastOrder}</td>
                  <td className="px-5 py-4 hidden lg:table-cell text-gray-400 text-xs">{customer.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-pink/10 text-brand-pink font-black text-2xl flex items-center justify-center">{selected.name[0]}</div>
                  <div>
                    <h3 className="font-bold text-lg">{selected.name}</h3>
                    <p className="text-gray-400 text-sm">Customer since {selected.since}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">✕</button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Orders',     value: selected.orders        },
                  { label: 'Total Spent', value: `₹${selected.spent.toLocaleString()}` },
                  { label: 'Avg Order',  value: `₹${Math.round(selected.spent / selected.orders)}` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-3 text-center">
                    <div className="font-black text-lg">{value}</div>
                    <div className="text-xs text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { Icon: Mail,  label: selected.email   },
                  { Icon: Phone, label: selected.phone   },
                  { Icon: MapPin,label: selected.city    },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-gray-600">
                    <Icon size={15} className="text-brand-pink shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <a href={`mailto:${selected.email}`} className="flex-1 btn-secondary text-sm justify-center py-2">
                  <Mail size={14}/> Email
                </a>
                <a href={`tel:${selected.phone}`} className="flex-1 btn-green text-sm justify-center py-2">
                  <Phone size={14}/> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
