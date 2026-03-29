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
    name: "Party Special Appalam",
    slug: "party-special-appalam",
    description: "Enjoy the festive crunch of Nanmai Party Special Appalam, a classic appalam papad made for family meals, celebrations, and generous serving bowls.",
    category: "appalam",
    price: 160,
    original_price: null,
    images: [],
    weight: "270g",
    stock: 50,
    is_active: true,
    is_featured: true,
    tags: ["festive", "bestseller"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-2",
    created_at: new Date().toISOString(),
    name: "Super Special Appalam",
    slug: "super-special-appalam",
    description: "Experience the authentic taste of tradition with Nanmai Super Special Appalam. Made for a rich, crisp bite and a beautifully golden finish.",
    category: "appalam",
    price: 148,
    original_price: null,
    images: [],
    weight: "250g",
    stock: 45,
    is_active: true,
    is_featured: true,
    tags: ["premium", "popular"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-3",
    created_at: new Date().toISOString(),
    name: "Dinner Special Appalam",
    slug: "dinner-special-appalam",
    description: "Nanmai Dinner Special Appalam is crafted to be the perfect mealtime companion, adding a light, crispy texture to everyday South Indian dinners.",
    category: "appalam",
    price: 120,
    original_price: null,
    images: [],
    weight: "200g",
    stock: 55,
    is_active: true,
    is_featured: false,
    tags: ["daily"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-4",
    created_at: new Date().toISOString(),
    name: "Extra Special Appalam",
    slug: "extra-special-appalam",
    description: "Nanmai Extra Special Appalam brings extra crunch, aroma, and satisfaction to every meal. Made for homes that love traditional taste with premium quality.",
    category: "appalam",
    price: 90,
    original_price: null,
    images: [],
    weight: "150g",
    stock: 40,
    is_active: true,
    is_featured: false,
    tags: ["premium"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-5",
    created_at: new Date().toISOString(),
    name: "Classic Appalam",
    slug: "classic-appalam",
    description: "Simple, crisp, and timeless, Nanmai Classic Appalam delivers the familiar flavor that South Indian families love. A pantry essential.",
    category: "appalam",
    price: 70,
    original_price: null,
    images: [],
    weight: "120g",
    stock: 60,
    is_active: true,
    is_featured: true,
    tags: ["classic", "bestseller"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-6",
    created_at: new Date().toISOString(),
    name: "Daily Dinner Appalam",
    slug: "daily-dinner-appalam",
    description: "Nanmai Daily Dinner Appalam is made for regular family meals, offering a quick, crunchy side that pairs beautifully with rice and curries.",
    category: "appalam",
    price: 59,
    original_price: null,
    images: [],
    weight: "100g",
    stock: 65,
    is_active: true,
    is_featured: false,
    tags: ["daily", "value"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-7",
    created_at: new Date().toISOString(),
    name: "Medium Appalam",
    slug: "medium-appalam",
    description: "Nanmai Medium Appalam offers the right balance of size, crunch, and convenience, making it perfect for everyday use.",
    category: "appalam",
    price: 48,
    original_price: null,
    images: [],
    weight: "80g",
    stock: 50,
    is_active: true,
    is_featured: false,
    tags: ["everyday"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-8",
    created_at: new Date().toISOString(),
    name: "Simply Appalam",
    slug: "simply-appalam",
    description: "Nanmai Simply Appalam is a light and easy choice for those who enjoy clean, honest flavor in smaller portions.",
    category: "appalam",
    price: 39,
    original_price: null,
    images: [],
    weight: "65g",
    stock: 55,
    is_active: true,
    is_featured: false,
    tags: ["simple", "affordable"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-9",
    created_at: new Date().toISOString(),
    name: "Crunchy Appalam",
    slug: "crunchy-appalam",
    description: "Nanmai Crunchy Appalam is made for snack lovers who want a bold crisp texture in every bite.",
    category: "appalam",
    price: 29,
    original_price: null,
    images: [],
    weight: "50g",
    stock: 70,
    is_active: true,
    is_featured: false,
    tags: ["snack", "crunchy"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-10",
    created_at: new Date().toISOString(),
    name: "Punjabi Pappad",
    slug: "punjabi-pappad",
    description: "Nanmai Punjabi Pappad brings a spiced North Indian touch to the Nanmai range, with a robust flavor and satisfying crunch.",
    category: "punjabi-pappad",
    price: 110,
    original_price: null,
    images: [],
    weight: "200g",
    stock: 40,
    is_active: true,
    is_featured: true,
    tags: ["spiced", "regional"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-11",
    created_at: new Date().toISOString(),
    name: "Punjabi Special Pappad",
    slug: "punjabi-special-pappad",
    description: "Nanmai Punjabi Special Pappad is a fuller, premium style regional papad with strong visual appeal and bold flavor.",
    category: "punjabi-pappad",
    price: 130,
    original_price: null,
    images: [],
    weight: "190g",
    stock: 35,
    is_active: true,
    is_featured: false,
    tags: ["premium", "regional"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-12",
    created_at: new Date().toISOString(),
    name: "Mini Appalam Snack Pack",
    slug: "mini-appalam-snack-pack",
    description: "This compact Nanmai snack pack is made for quick cravings, lunch boxes, and convenient retail display.",
    category: "appalam-snack-pack",
    price: 10,
    original_price: null,
    images: [],
    weight: "20g",
    stock: 100,
    is_active: true,
    is_featured: false,
    tags: ["snack", "budget"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-13",
    created_at: new Date().toISOString(),
    name: "Nanmai Appalam Chips",
    slug: "nanmai-appalam-chips",
    description: "Nanmai Appalam Chips offer a ready to enjoy twist on traditional appalam, bringing crisp texture and familiar flavor in a snack friendly format.",
    category: "appalam-chips",
    price: 45,
    original_price: null,
    images: [],
    weight: "100g",
    stock: 60,
    is_active: true,
    is_featured: true,
    tags: ["snack", "ready-to-eat"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-14",
    created_at: new Date().toISOString(),
    name: "Nanmai Special Appalam",
    slug: "nanmai-special-appalam",
    description: "Nanmai Special Appalam is a premium family pack created for larger servings and occasions that call for extra crunch.",
    category: "appalam",
    price: 170,
    original_price: null,
    images: [],
    weight: "225g",
    stock: 45,
    is_active: true,
    is_featured: true,
    tags: ["family", "premium"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-15",
    created_at: new Date().toISOString(),
    name: "Nanmai Dinner Appalam",
    slug: "nanmai-dinner-appalam",
    description: "Nanmai Dinner Appalam is designed as a reliable mealtime staple, adding a crisp finish to everyday South Indian plates.",
    category: "appalam",
    price: 138,
    original_price: null,
    images: [],
    weight: "185g",
    stock: 50,
    is_active: true,
    is_featured: false,
    tags: ["daily", "reliable"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-16",
    created_at: new Date().toISOString(),
    name: "Nanmai Extra Appalam",
    slug: "nanmai-extra-appalam",
    description: "Nanmai Extra Appalam is made for those who want more flavor, more crunch, and more serving value in one pack.",
    category: "appalam",
    price: 110,
    original_price: null,
    images: [],
    weight: "150g",
    stock: 45,
    is_active: true,
    is_featured: false,
    tags: ["extra", "value"],
    ingredients: null,
    nutritional_info: null,
  },
  {
    id: "test-17",
    created_at: new Date().toISOString(),
    name: "Nanmai Classic Appalam",
    slug: "nanmai-classic-appalam",
    description: "Nanmai Classic Appalam keeps things simple and authentic, delivering the familiar taste that makes appalam in Tamil cuisine so beloved.",
    category: "appalam",
    price: 90,
    original_price: null,
    images: [],
    weight: "120g",
    stock: 55,
    is_active: true,
    is_featured: false,
    tags: ["classic", "authentic"],
    ingredients: null,
    nutritional_info: null,
  },
];

const CATEGORIES = ["appalam", "punjabi-pappad", "appalam-snack-pack", "appalam-chips"];

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
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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
    setImagePreviews([]);
    setModal({ open: true, edit: null });
  };

  const openEdit = (p: Product) => {
    const { id, created_at, ...rest } = p;
    setForm(rest);
    setImagePreviews(p.images || []);
    setModal({ open: true, edit: p });
  };

  const closeModal = () => {
    setModal({ open: false, edit: null });
    setForm(EMPTY_FORM);
    setImagePreviews([]);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Please fill in required fields");
      return;
    }

    if (!form.images || form.images.length === 0) {
      toast.error("Please upload at least 1 product image");
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
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if we can add more images (max 4)
    if (imagePreviews.length >= 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    if (isTest) {
      // Create local URLs for preview
      const newUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      const remainingSlots = 4 - imagePreviews.length;
      const urlsToAdd = newUrls.slice(0, remainingSlots);
      setImagePreviews([...imagePreviews, ...urlsToAdd]);
      setForm((prev) => ({
        ...prev,
        images: [...imagePreviews, ...urlsToAdd],
      }));
      toast.success(`${urlsToAdd.length} image(s) selected (test mode)`);
    } else {
      setUploading(true);
      try {
        const newUrls: string[] = [];

        for (
          let i = 0;
          i < Math.min(files.length, 4 - imagePreviews.length);
          i++
        ) {
          const file = files[i];
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

          newUrls.push(urlData.publicUrl);
        }

        setImagePreviews([...imagePreviews, ...newUrls]);
        setForm((prev) => ({
          ...prev,
          images: [...imagePreviews, ...newUrls],
        }));
        toast.success(`${newUrls.length} image(s) uploaded successfully!`);
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

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setForm((prev) => ({ ...prev, images: newPreviews }));
    toast.success("Image removed");
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
                  Product Images (1-4) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded-xl bg-gray-100 overflow-hidden border-2 border-gray-200"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 bg-brand-pink/80 text-white text-[10px] text-center py-0.5 font-medium">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                  {imagePreviews.length < 4 && (
                    <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-brand-pink hover:bg-brand-pink/5 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      {uploading ? (
                        <Loader2
                          size={20}
                          className="text-gray-400 animate-spin"
                        />
                      ) : (
                        <>
                          <Upload size={20} className="text-gray-400" />
                          <span className="text-[10px] text-gray-400 mt-1">
                            {4 - imagePreviews.length} left
                          </span>
                        </>
                      )}
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Upload 1-4 images. First image will be the main product image.
                </p>
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
