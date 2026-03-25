'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, Star } from 'lucide-react';

const INIT_PRODUCTS = [
  { id: '1', name: 'Classic Appalam',    category: 'classic',   price: 149, original_price: 199, stock: 50, is_active: true,  is_featured: true,  weight: '200g' },
  { id: '2', name: 'Garlic Appalam',     category: 'flavoured', price: 179, original_price: 229, stock: 40, is_active: true,  is_featured: true,  weight: '200g' },
  { id: '3', name: 'Pepper Appalam',     category: 'flavoured', price: 179, original_price: 219, stock: 35, is_active: true,  is_featured: false, weight: '200g' },
  { id: '4', name: 'Cumin Appalam',      category: 'flavoured', price: 169, original_price: 209, stock: 45, is_active: true,  is_featured: false, weight: '200g' },
  { id: '5', name: 'Mini Appalam',       category: 'mini',      price: 129, original_price: 159, stock: 60, is_active: true,  is_featured: false, weight: '150g' },
  { id: '6', name: 'Jumbo Pack',         category: 'packs',     price: 449, original_price: 599, stock: 20, is_active: true,  is_featured: true,  weight: '1kg'  },
  { id: '7', name: 'Mixed Flavour Pack', category: 'packs',     price: 349, original_price: 449, stock: 30, is_active: true,  is_featured: false, weight: '600g' },
  { id: '8', name: 'Chilli Appalam',     category: 'flavoured', price: 189, original_price: 229, stock: 25, is_active: false, is_featured: false, weight: '200g' },
];

type Product = typeof INIT_PRODUCTS[0];

const EMPTY: Omit<Product, 'id'> = { name: '', category: 'classic', price: 0, original_price: 0, stock: 0, is_active: true, is_featured: false, weight: '' };

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; edit: Product | null }>({ open: false, edit: null });
  const [form, setForm] = useState<Omit<Product, 'id'>>(EMPTY);

  const openNew  = () => { setForm(EMPTY); setModal({ open: true, edit: null }); };
  const openEdit = (p: Product) => { const { id, ...rest } = p; setForm(rest); setModal({ open: true, edit: p }); };
  const closeModal = () => setModal({ open: false, edit: null });

  const handleSave = () => {
    if (modal.edit) {
      setProducts(prev => prev.map(p => p.id === modal.edit!.id ? { ...form, id: modal.edit!.id } : p));
    } else {
      setProducts(prev => [...prev, { ...form, id: String(Date.now()) }]);
    }
    closeModal();
  };

  const toggleActive   = (id: string) => setProducts(prev => prev.map(p => p.id === id ? { ...p, is_active: !p.is_active } : p));
  const toggleFeatured = (id: string) => setProducts(prev => prev.map(p => p.id === id ? { ...p, is_featured: !p.is_featured } : p));
  const deleteProduct  = (id: string) => { if (confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id)); };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const upd = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-9 bg-white" />
        </div>
        <button onClick={openNew} className="btn-primary whitespace-nowrap">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtered.map(product => (
          <div key={product.id} className={`bg-white rounded-2xl shadow-card overflow-hidden transition-all ${!product.is_active ? 'opacity-60' : ''}`}>
            <div className="h-36 bg-gradient-to-br from-brand-cream to-white flex items-center justify-center text-5xl relative">
              🫓
              {product.is_featured && (
                <span className="absolute top-2 left-2 badge bg-brand-gold text-brand-dark text-xs">
                  <Star size={9} className="inline mr-0.5" />Featured
                </span>
              )}
              <span className={`absolute top-2 right-2 badge text-xs ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {product.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-gray-100 text-gray-600 text-xs capitalize">{product.category}</span>
                <span className="text-xs text-gray-400">{product.weight}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-brand-pink">₹{product.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{product.original_price}</span>
                </div>
                <span className={`text-xs font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(product)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-brand-pink/10 text-brand-pink text-xs font-semibold hover:bg-brand-pink hover:text-white transition-colors">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => toggleActive(product.id)} title={product.is_active ? 'Deactivate' : 'Activate'} className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                  {product.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => toggleFeatured(product.id)} title="Toggle Featured" className={`p-1.5 rounded-lg transition-colors ${product.is_featured ? 'bg-brand-gold/20 text-brand-gold' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                  <Star size={14} />
                </button>
                <button onClick={() => deleteProduct(product.id)} className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-base">{modal.edit ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">✕</button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name *</label>
                <input value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Classic Appalam" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => upd('category', e.target.value)} className="input-field">
                    {['classic','flavoured','mini','packs'].map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Weight</label>
                  <input value={form.weight} onChange={e => upd('weight', e.target.value)} placeholder="200g" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e => upd('price', Number(e.target.value))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Original (₹)</label>
                  <input type="number" value={form.original_price} onChange={e => upd('original_price', Number(e.target.value))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock</label>
                  <input type="number" value={form.stock} onChange={e => upd('stock', Number(e.target.value))} className="input-field" />
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => upd('is_active', e.target.checked)} className="w-4 h-4 accent-[#E91E8C]" />
                  <span className="text-sm font-medium">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={e => upd('is_featured', e.target.checked)} className="w-4 h-4 accent-[#F9A825]" />
                  <span className="text-sm font-medium">Featured</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={closeModal} className="flex-1 btn-secondary">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-primary justify-center">
                {modal.edit ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
