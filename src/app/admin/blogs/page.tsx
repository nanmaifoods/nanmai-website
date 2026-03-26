"use client";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Calendar,
  Clock,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  is_published: boolean;
  read_time: number;
  views: number;
  created_at: string;
}

const EMPTY_BLOG = {
  title: "",
  slug: "",
  category: "General",
  content: "",
  excerpt: "",
  is_published: false,
  read_time: 5,
  cover_image: "",
  tags: [] as string[],
};

const CATEGORIES = [
  "Health",
  "Recipes",
  "Behind The Scenes",
  "How-To",
  "Culture",
  "General",
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ open: boolean; edit: Blog | null }>({
    open: false,
    edit: null,
  });
  const [form, setForm] = useState<typeof EMPTY_BLOG>(EMPTY_BLOG);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Check if form has unsaved changes
  const hasUnsavedChanges = () => {
    const initialForm = modal.edit
      ? {
          title: modal.edit.title,
          slug: modal.edit.slug,
          category: modal.edit.category,
          content: modal.edit.content || "",
          excerpt: modal.edit.excerpt || "",
          is_published: modal.edit.is_published,
          read_time: modal.edit.read_time || 5,
          cover_image: modal.edit.cover_image || "",
          tags: modal.edit.tags || [],
        }
      : EMPTY_BLOG;
    return JSON.stringify(form) !== JSON.stringify(initialForm);
  };

  // Fetch blogs from Supabase
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?published=false");
      const data = await res.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openNew = () => {
    setForm(EMPTY_BLOG);
    setModal({ open: true, edit: null });
  };

  const openEdit = (b: Blog) => {
    setForm({
      title: b.title,
      slug: b.slug,
      category: b.category,
      content: b.content || "",
      excerpt: b.excerpt || "",
      is_published: b.is_published,
      read_time: b.read_time || 5,
      cover_image: b.cover_image || "",
      tags: b.tags || [],
    });
    setModal({ open: true, edit: b });
  };

  const closeModal = () => setModal({ open: false, edit: null });

  // Handle close with unsaved changes check
  const handleCloseModal = () => {
    if (hasUnsavedChanges()) {
      setShowDiscardDialog(true);
    } else {
      closeModal();
    }
  };

  // Save as draft and close
  const saveAsDraft = async () => {
    setForm((f) => ({ ...f, is_published: false }));
    await handleSave(true);
  };

  // Updated handleSave to support draft mode
  const handleSave = async (asDraft = false) => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      const url = modal.edit ? `/api/blogs/${modal.edit.id}` : "/api/blogs";
      const method = modal.edit ? "PUT" : "POST";

      // For new blogs, regenerate slug from title. For edits, keep existing slug.
      const payload = {
        ...form,
        ...(asDraft ? { is_published: false } : {}),
        ...(modal.edit ? {} : { regenerate_slug: true }), // Only regenerate slug for new blogs
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          asDraft
            ? "Saved as draft!"
            : modal.edit
              ? "Blog updated!"
              : "Blog created!",
        );
        setShowDiscardDialog(false);
        closeModal();
        fetchBlogs();
      } else {
        toast.error(data.error || "Failed to save blog");
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blog-images");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setForm((f) => ({ ...f, cover_image: data.url }));
        toast.success("Image uploaded!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Toggle publish status
  const togglePublish = async (blog: Blog) => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !blog.is_published }),
      });

      if (res.ok) {
        toast.success(
          blog.is_published ? "Blog unpublished" : "Blog published!",
        );
        fetchBlogs();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Delete blog
  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("Blog deleted!");
        fetchBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm((f) => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()),
  );

  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
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
            placeholder="Search blog posts..."
            className="input-field pl-9 bg-white"
          />
        </div>
        <button onClick={openNew} className="btn-primary whitespace-nowrap">
          <Plus size={16} /> New Blog Post
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Posts",
            value: blogs.length,
            color: "bg-brand-pink/10 text-brand-pink",
          },
          {
            label: "Published",
            value: blogs.filter((b) => b.is_published).length,
            color: "bg-brand-green/10 text-brand-green",
          },
          {
            label: "Total Views",
            value: blogs
              .reduce((s, b) => s + (b.views || 0), 0)
              .toLocaleString(),
            color: "bg-brand-gold/20 text-brand-gold",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl p-4 text-center ${color}`}>
            <div className="font-black text-2xl">{value}</div>
            <div className="text-xs font-medium mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <Loader2
              size={32}
              className="animate-spin text-brand-pink mx-auto mb-4"
            />
            <p className="text-gray-500">Loading blogs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📝</div>
            <p>No blog posts found</p>
            <button onClick={openNew} className="btn-primary mt-4">
              <Plus size={16} /> Create First Blog
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-5 py-3.5 text-left">Post</th>
                <th className="px-5 py-3.5 text-left hidden md:table-cell">
                  Category
                </th>
                <th className="px-5 py-3.5 text-left hidden lg:table-cell">
                  Date
                </th>
                <th className="px-5 py-3.5 text-left hidden lg:table-cell">
                  Views
                </th>
                <th className="px-5 py-3.5 text-left">Status</th>
                <th className="px-5 py-3.5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {blog.cover_image ? (
                        <img
                          src={blog.cover_image}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="w-12 h-12 rounded-xl bg-brand-pink/10 flex items-center justify-center text-2xl">
                          📝
                        </span>
                      )}
                      <div>
                        <div className="font-semibold text-sm line-clamp-1 max-w-[200px]">
                          {blog.title}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock size={10} />
                          {blog.read_time || 5} min read
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="badge bg-brand-pink/10 text-brand-pink text-xs">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(blog.created_at)}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell font-medium">
                    {(blog.views || 0).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`badge text-xs ${blog.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      <a
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-400"
                        title="View"
                      >
                        <Eye size={14} />
                      </a>
                      <button
                        onClick={() => openEdit(blog)}
                        className="p-1.5 rounded-lg hover:bg-brand-pink/10 hover:text-brand-pink transition-colors text-gray-400"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => togglePublish(blog)}
                        title={blog.is_published ? "Unpublish" : "Publish"}
                        className="p-1.5 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors text-gray-400"
                      >
                        {blog.is_published ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <h3 className="font-bold text-base">
                {modal.edit ? "Edit Blog Post" : "Create New Blog Post"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={formRef}
              className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0 scroll-smooth"
            >
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Cover Image
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    {form.cover_image ? (
                      <div className="relative">
                        <img
                          src={form.cover_image}
                          alt="Cover"
                          className="w-full h-40 object-cover rounded-xl"
                        />
                        <button
                          onClick={() =>
                            setForm((f) => ({ ...f, cover_image: "" }))
                          }
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-200 rounded-xl h-40 flex items-center justify-center text-gray-400">
                        <ImageIcon size={32} />
                        <span className="ml-2">No image selected</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="btn-secondary text-sm"
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />{" "}
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={14} /> Upload Image
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400 text-center">Max 5MB</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => upd("title", e.target.value)}
                  placeholder="Blog post title..."
                  className="input-field"
                />
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => upd("category", e.target.value)}
                    className="input-field"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Read Time (min)
                  </label>
                  <input
                    type="number"
                    value={form.read_time}
                    onChange={(e) => upd("read_time", Number(e.target.value))}
                    className="input-field"
                    min={1}
                    max={60}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tags
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge bg-brand-pink/10 text-brand-pink flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    placeholder="Add a tag..."
                    className="input-field flex-1"
                  />
                  <button onClick={addTag} className="btn-secondary">
                    Add
                  </button>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Excerpt / Summary *
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => upd("excerpt", e.target.value)}
                  rows={2}
                  placeholder="Short description shown in blog listing cards..."
                  className="input-field resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Content *{" "}
                  <span className="text-xs text-gray-400">
                    (Markdown supported)
                  </span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => upd("content", e.target.value)}
                  rows={12}
                  placeholder="## Introduction&#10;&#10;Write your full blog post here.&#10;&#10;## Section Heading&#10;&#10;- Point 1&#10;- Point 2"
                  className="input-field resize-none font-mono text-sm"
                />
              </div>

              {/* Publish */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => upd("is_published", e.target.checked)}
                  className="w-4 h-4 accent-[#2E7D32]"
                />
                <span className="text-sm font-medium">
                  Publish immediately (visible to users)
                </span>
              </label>
            </div>

            {/* Fixed Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={handleCloseModal}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex-1 btn-primary justify-center"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving...
                  </>
                ) : modal.edit ? (
                  "Save Changes"
                ) : (
                  "Create Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Dialog */}
      {showDiscardDialog && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowDiscardDialog(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Unsaved Changes</h3>
              <p className="text-gray-500 text-sm mb-6">
                You have unsaved changes. What would you like to do?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDiscardDialog(false);
                    closeModal();
                  }}
                  className="flex-1 btn-secondary"
                >
                  Discard
                </button>
                <button
                  onClick={saveAsDraft}
                  disabled={saving}
                  className="flex-1 btn-secondary bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
