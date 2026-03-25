'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Calendar, Clock } from 'lucide-react';

const INIT_BLOGS = [
  { id: '1', title: 'Health Benefits of Eating Appalam',           slug: 'health-benefits-of-appalam',          category: 'Health',            is_published: true,  date: 'Mar 10, 2025', readTime: 4,  views: 1240, cover: '🌿' },
  { id: '2', title: 'Traditional South Indian Cooking Tips',       slug: 'traditional-south-indian-cooking',    category: 'Recipes',           is_published: true,  date: 'Mar 5, 2025',  readTime: 6,  views: 890,  cover: '🍲' },
  { id: '3', title: 'How Our Appalam Is Made',                     slug: 'how-appalam-is-made',                 category: 'Behind The Scenes', is_published: true,  date: 'Feb 28, 2025', readTime: 5,  views: 2100, cover: '🏭' },
  { id: '4', title: '5 Best Ways to Cook Your Appalam',            slug: 'best-ways-to-cook-appalam',           category: 'How-To',            is_published: true,  date: 'Feb 20, 2025', readTime: 5,  views: 3400, cover: '🔥' },
  { id: '5', title: 'The History of Papad in Indian Cuisine',      slug: 'papad-in-indian-cuisine-history',     category: 'Culture',           is_published: true,  date: 'Feb 12, 2025', readTime: 7,  views: 760,  cover: '📜' },
  { id: '6', title: 'Creative Appalam Recipes Beyond the Side Dish', slug: 'appalam-recipes-beyond-the-side-dish', category: 'Recipes',        is_published: false, date: 'Feb 5, 2025',  readTime: 6,  views: 450,  cover: '👨‍🍳' },
];

type Blog = typeof INIT_BLOGS[0];

const EMPTY_BLOG = { title: '', slug: '', category: 'General', content: '', excerpt: '', is_published: false, readTime: 5, cover: '📝' };

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(INIT_BLOGS);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; edit: Blog | null }>({ open: false, edit: null });
  const [form, setForm] = useState<typeof EMPTY_BLOG>(EMPTY_BLOG);

  const openNew  = () => { setForm(EMPTY_BLOG); setModal({ open: true, edit: null }); };
  const openEdit = (b: Blog) => {
    setForm({ title: b.title, slug: b.slug, category: b.category, content: '', excerpt: '', is_published: b.is_published, readTime: b.readTime, cover: b.cover });
    setModal({ open: true, edit: b });
  };
  const closeModal = () => setModal({ open: false, edit: null });

  const handleSave = () => {
    if (modal.edit) {
      setBlogs(prev => prev.map(b => b.id === modal.edit!.id ? { ...b, ...form } : b));
    } else {
      setBlogs(prev => [...prev, {
        id: String(Date.now()), ...form,
        date: new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
        views: 0,
      }]);
    }
    closeModal();
  };

  const togglePublish = (id: string) => setBlogs(prev => prev.map(b => b.id === id ? { ...b, is_published: !b.is_published } : b));
  const deleteBlog = (id: string) => { if (confirm('Delete this blog post?')) setBlogs(prev => prev.filter(b => b.id !== id)); };

  const filtered = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const CATEGORIES = ['Health', 'Recipes', 'Behind The Scenes', 'How-To', 'Culture', 'General'];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blog posts..." className="input-field pl-9 bg-white" />
        </div>
        <button onClick={openNew} className="btn-primary whitespace-nowrap">
          <Plus size={16} /> New Blog Post
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Posts',   value: blogs.length,                              color: 'bg-brand-pink/10 text-brand-pink'  },
          { label: 'Published',     value: blogs.filter(b => b.is_published).length,  color: 'bg-brand-green/10 text-brand-green' },
          { label: 'Total Views',   value: blogs.reduce((s, b) => s + b.views, 0).toLocaleString(), color: 'bg-brand-gold/20 text-brand-gold' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl p-4 text-center ${color}`}>
            <div className="font-black text-2xl">{value}</div>
            <div className="text-xs font-medium mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-5 py-3.5 text-left">Post</th>
              <th className="px-5 py-3.5 text-left hidden md:table-cell">Category</th>
              <th className="px-5 py-3.5 text-left hidden lg:table-cell">Date</th>
              <th className="px-5 py-3.5 text-left hidden lg:table-cell">Views</th>
              <th className="px-5 py-3.5 text-left">Status</th>
              <th className="px-5 py-3.5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(blog => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{blog.cover}</span>
                    <div>
                      <div className="font-semibold text-sm line-clamp-1 max-w-[200px]">{blog.title}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10}/>{blog.readTime} min read</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="badge bg-brand-pink/10 text-brand-pink text-xs">{blog.category}</span>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">
                  <div className="flex items-center gap-1"><Calendar size={11}/>{blog.date}</div>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell font-medium">{blog.views.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <span className={`badge text-xs ${blog.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {blog.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(blog)} className="p-1.5 rounded-lg hover:bg-brand-pink/10 hover:text-brand-pink transition-colors text-gray-400"><Pencil size={14}/></button>
                    <button onClick={() => togglePublish(blog.id)} title={blog.is_published ? 'Unpublish' : 'Publish'} className="p-1.5 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors text-gray-400">
                      {blog.is_published ? <EyeOff size={14}/> : <Eye size={14}/>}
                    </button>
                    <button onClick={() => deleteBlog(blog.id)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📝</div>
            <p>No blog posts found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-base">{modal.edit ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">✕</button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                <input value={form.title} onChange={e => upd('title', e.target.value)} placeholder="Blog post title..." className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => upd('category', e.target.value)} className="input-field">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Read Time (min)</label>
                  <input type="number" value={form.readTime} onChange={e => upd('readTime', Number(e.target.value))} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Excerpt / Summary *</label>
                <textarea value={form.excerpt} onChange={e => upd('excerpt', e.target.value)} rows={2} placeholder="Short description for the blog listing..." className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Content * <span className="text-xs text-gray-400">(Markdown supported)</span>
                </label>
                <textarea value={form.content} onChange={e => upd('content', e.target.value)} rows={10}
                  placeholder="## Introduction&#10;&#10;Write your full blog post here. Use ## for headings, **bold** for emphasis, - for bullet points."
                  className="input-field resize-none font-mono text-sm" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={e => upd('is_published', e.target.checked)} className="w-4 h-4 accent-[#2E7D32]" />
                <span className="text-sm font-medium">Publish immediately</span>
              </label>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={closeModal} className="flex-1 btn-secondary">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-primary justify-center">
                {modal.edit ? 'Save Changes' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
