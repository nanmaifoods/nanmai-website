"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Star,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useAdminMode } from "@/store/adminModeContext";
import { Product } from "@/types/database";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

const TEST_PRODUCTS: Product[] = [
  {
    id: "test-1",
    created_at: new Date().toISOString(),
    name: "Classic Appalam",
    slug: "classic-appalam",
    description: "The original crispy traditional South Indian papad.",
    category: "classic",
    price: 149,
    original_price: 199,
    images: [],
    weight: "200g",
    stock: 50,
    is_active: true,
    is_featured: true,
    tags: ["bestseller"],
    ingredients: "Urad Dal Flour, Salt, Black Pepper, Asafoetida",
    nutritional_info: null,
  },
  {
    id: "test-2",
    created_at: new Date().toISOString(),
    name: "Garlic Appalam",
    slug: "garlic-appalam",
    description:
      "Infused with the rich aroma of fresh garlic for bold flavour.",
    category: "flavoured",
    price: 179,
    original_price: 229,
    images: [],
    weight: "200g",
    stock: 40,
    is_active: true,
    is_featured: true,
    tags: ["popular"],
    ingredients: "Urad Dal Flour, Garlic Flakes, Salt",
    nutritional_info: null,
  },
  {
    id: "test-3",
    created_at: new Date().toISOString(),
    name: "Pepper Appalam",
    slug: "pepper-appalam",
    description: "Studded with coarsely ground black pepper for a spicy kick.",
    category: "flavoured",
    price: 179,
    original_price: 219,
    images: [],
    weight: "200g",
    stock: 35,
    is_active: true,
    is_featured: false,
    tags: ["spicy"],
    ingredients: "Urad Dal Flour, Black Pepper, Salt",
    nutritional_info: null,
  },
  {
    id: "test-4",
    created_at: new Date().toISOString(),
    name: "Cumin Appalam",
    slug: "cumin-appalam",
    description: "Fragrant with roasted cumin seeds, a family favourite.",
    category: "flavoured",
    price: 169,
    original_price: 209,
    images: [],
    weight: "200g",
    stock: 45,
    is_active: true,
    is_featured: false,
    tags: ["aromatic"],
    ingredients: "Urad Dal Flour, Cumin Seeds, Salt",
    nutritional_info: null,
  },
  {
    id: "test-5",
    created_at: new Date().toISOString(),
    name: "Mini Appalam",
    slug: "mini-appalam",
    description: "Bite-sized minis, perfect for snacking and party platters.",
    category: "mini",
    price: 129,
    original_price: 159,
    images: [],
    weight: "150g",
    stock: 60,
    is_active: true,
    is_featured: false,
    tags: ["snack"],
    ingredients: "Urad Dal Flour, Salt, Spices",
    nutritional_info: null,
  },
  {
    id: "test-6",
    created_at: new Date().toISOString(),
    name: "Jumbo Pack",
    slug: "jumbo-pack",
    description: "Our biggest pack – great value for large families.",
    category: "packs",
    price: 449,
    original_price: 599,
    images: [],
    weight: "1kg",
    stock: 20,
    is_active: true,
    is_featured: true,
    tags: ["value"],
    ingredients: "Urad Dal Flour, Salt, Spices",
    nutritional_info: null,
  },
  {
    id: "test-7",
    created_at: new Date().toISOString(),
    name: "Mixed Flavour Pack",
    slug: "mixed-flavour-pack",
    description: "Sample all our flavours in one convenient combo pack.",
    category: "packs",
    price: 349,
    original_price: 449,
    images: [],
    weight: "600g",
    stock: 30,
    is_active: true,
    is_featured: false,
    tags: ["combo"],
    ingredients: "Urad Dal Flour, Spices, Salt",
    nutritional_info: null,
  },
  {
    id: "test-8",
    created_at: new Date().toISOString(),
    name: "Chilli Appalam",
    slug: "chilli-appalam",
    description: "For the spice lovers – extra fiery red chilli infused papad.",
    category: "flavoured",
    price: 189,
    original_price: 229,
    images: [],
    weight: "200g",
    stock: 25,
    is_active: false,
    is_featured: false,
    tags: ["spicy", "new"],
    ingredients: "Urad Dal Flour, Red Chilli, Salt",
    nutritional_info: null,
  },
];

const CATEGORIES = ["classic", "flavoured", "mini", "packs"];

type ProductForm = Omit<Product, "id" | "created_at">;

const EMPTY_FORM: ProductForm = {
  name: "",
  slug: "",
  description: "",
  category: "classic",
  price: 0,
  original_price: null,
  images: [],
  weight: "",
  stock: 0,
  is_active: true,
  is_featured: false,
  tags: [],
  ingredients: null,
  nutritional_info: null,
};

export default function AdminProductsPage() {
  const { isTest, mode } = useAdminMode();
  const [products, setProducts] = useState<Product[]>(TEST_PRODUCTS);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; edit: Product | null }>({
    open: false,
    edit: null,
  });
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch products from Supabase in live mode
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?active=false"); // Get all for admin
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isTest) {
      fetchProducts();
    } else {
      setProducts(TEST_PRODUCTS);
    }
  }, [isTest, fetchProducts]);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setImagePreview(null);
    setModal({ open: true, edit: null });
  };

  const openEdit = (p: Product) => {
    const { id, created_at, ...rest } = p;
    setForm(rest);
    setImagePreview(p.images?.[0] || null);
    setModal({ open: true, edit: p });
  };

  const closeModal = () => {
    setModal({ open: false, edit: null });
    setForm(EMPTY_FORM);
    setImagePreview(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Please fill in required fields");
      return;
    }

    setLoading(true);
    try {
      if (isTest) {
        // Test mode - just update local state
        if (modal.edit) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === modal.edit!.id
                ? { ...form, id: modal.edit!.id, created_at: p.created_at }
                : p,
            ),
          );
          toast.success("Product updated (test mode)");
        } else {
          const newProduct: Product = {
            ...form,
            id: `test-${Date.now()}`,
            created_at: new Date().toISOString(),
          };
          setProducts((prev) => [...prev, newProduct]);
          toast.success("Product added (test mode)");
        }
      } else {
        // Live mode - call API
        const url = modal.edit
          ? `/api/products/${modal.edit.id}`
          : "/api/products";
        const method = modal.edit ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to save product");
        }

        toast.success(
          `Product ${modal.edit ? "updated" : "created"} successfully!`,
        );
        fetchProducts();
      }
      closeModal();
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to save product",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    if (isTest) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p)),
      );
      toast.success(
        `Product ${!product.is_active ? "activated" : "deactivated"} (test mode)`,
      );
    } else {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_active: !product.is_active }),
        });

        if (!res.ok) {
          throw new Error("Failed to update");
        }

        fetchProducts();
        toast.success(
          `Product ${!product.is_active ? "activated" : "deactivated"}`,
        );
      } catch (err) {
        toast.error("Failed to update product");
      }
    }
  };

  const toggleFeatured = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    if (isTest) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, is_featured: !p.is_featured } : p,
        ),
      );
      toast.success(
        `Product ${!product.is_featured ? "featured" : "unfeatured"} (test mode)`,
      );
    } else {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_featured: !product.is_featured }),
        });

        if (!res.ok) {
          throw new Error("Failed to update");
        }

        fetchProducts();
        toast.success(
          `Product ${!product.is_featured ? "featured" : "unfeatured"}`,
        );
      } catch (err) {
        toast.error("Failed to update product");
      }
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product? This action cannot be undone.")) return;

    if (isTest) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted (test mode)");
    } else {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete");
        }

        fetchProducts();
        toast.success("Product deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isTest) {
      // Create a local URL for preview
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      toast.success("Image selected (test mode)");
    } else {
      setUploading(true);
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        setImagePreview(urlData.publicUrl);
        setForm((prev) => ({ ...prev, images: [urlData.publicUrl] }));
        toast.success("Image uploaded successfully!");
      } catch (err) {
        console.error("Upload error:", err);
        toast.error(
          "Failed to upload image. Make sure you have created a storage bucket named 'product-images' in Supabase.",
        );
      } finally {
        setUploading(false);
      }
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const upd = (k: keyof ProductForm, v: unknown) =>
    setForm((f) => ({ ...f, [k]: v }));

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
            placeholder="Search products..."
            className="input-field pl-9 bg-white"
          />
        </div>
        {loading && <Loader2 className="animate-spin text-brand-pink" />}
        <button
          onClick={openNew}
          className="btn-primary whitespace-nowrap"
          disabled={loading}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Mode indicator */}
      <div
        className={`text-sm px-4 py-2 rounded-xl ${isTest ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : "bg-green-50 text-green-700 border border-green-200"}`}
      >
        {isTest
          ? "🧪 Test Mode: Changes are local only and won't be saved to the database."
          : "🚀 Live Mode: Connected to Supabase database. Changes are permanent."}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-2xl shadow-card overflow-hidden transition-all ${!product.is_active ? "opacity-60" : ""}`}
          >
            <div className="h-36 bg-gradient-to-br from-brand-cream to-white flex items-center justify-center text-5xl relative">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                "🫓"
              )}
              {product.is_featured && (
                <span className="absolute top-2 left-2 badge bg-brand-gold text-brand-dark text-xs">
                  <Star size={9} className="inline mr-0.5" />
                  Featured
                </span>
              )}
              <span
                className={`absolute top-2 right-2 badge text-xs ${product.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
              >
                {product.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-gray-100 text-gray-600 text-xs capitalize">
                  {product.category}
                </span>
                <span className="text-xs text-gray-400">{product.weight}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-brand-pink">
                    ₹{product.price}
                  </span>
                  {product.original_price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.original_price}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${product.stock < 10 ? "text-red-500" : "text-green-600"}`}
                >
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => openEdit(product)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-brand-pink/10 text-brand-pink text-xs font-semibold hover:bg-brand-pink hover:text-white transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => toggleActive(product.id)}
                  title={product.is_active ? "Deactivate" : "Activate"}
                  className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  {product.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => toggleFeatured(product.id)}
                  title="Toggle Featured"
                  className={`p-1.5 rounded-lg transition-colors ${product.is_featured ? "bg-brand-gold/20 text-brand-gold" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                >
                  <Star size={14} />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-base">
                {modal.edit ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Product Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={32} className="text-gray-400" />
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <span
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${uploading ? "bg-gray-100 text-gray-400" : "bg-brand-pink text-white hover:bg-opacity-90"} transition-colors`}
                    >
                      {uploading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Upload size={16} />
                      )}
                      {uploading ? "Uploading..." : "Upload Image"}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Product Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => upd("name", e.target.value)}
                  placeholder="Classic Appalam"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => upd("description", e.target.value)}
                  placeholder="Describe the product..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

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
                      <option key={c} value={c} className="capitalize">
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Weight
                  </label>
                  <input
                    value={form.weight}
                    onChange={(e) => upd("weight", e.target.value)}
                    placeholder="200g"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => upd("price", Number(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Original (₹)
                  </label>
                  <input
                    type="number"
                    value={form.original_price || ""}
                    onChange={(e) =>
                      upd(
                        "original_price",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => upd("stock", Number(e.target.value))}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Ingredients
                </label>
                <input
                  value={form.ingredients || ""}
                  onChange={(e) => upd("ingredients", e.target.value || null)}
                  placeholder="Urad Dal Flour, Salt, Spices..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tags (comma-separated)
                </label>
                <input
                  value={form.tags?.join(", ") || ""}
                  onChange={(e) =>
                    upd(
                      "tags",
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    )
                  }
                  placeholder="bestseller, popular, spicy"
                  className="input-field"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => upd("is_active", e.target.checked)}
                    className="w-4 h-4 accent-[#12A6DF]"
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => upd("is_featured", e.target.checked)}
                    className="w-4 h-4 accent-[#F9A825]"
                  />
                  <span className="text-sm font-medium">Featured</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={closeModal} className="flex-1 btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 btn-primary justify-center"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                {modal.edit ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
