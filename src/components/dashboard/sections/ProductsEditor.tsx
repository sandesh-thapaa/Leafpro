"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { Plus, Trash2, Sparkles } from "lucide-react";
import type { ProductItem } from "@/types/tenant";

interface ProductsEditorProps {
  products: ProductItem[];
  onChange: (products: ProductItem[]) => void;
}

export function ProductsEditor({ products, onChange }: ProductsEditorProps) {
  const add = () =>
    onChange([
      ...products,
      { title: "", description: "", imageUrl: "", price: "", isPopular: false, order: products.length },
    ]);

  const remove = (index: number) =>
    onChange(products.filter((_, i) => i !== index));

  const update = (index: number, field: keyof ProductItem, value: string | boolean | number) =>
    onChange(products.map((p, i) => (i === index ? { ...p, [field]: value } : p)));

  return (
    <div className="space-y-3">
      {products.length === 0 ? (
        <div className="text-center py-8 text-ink-faint">
          <Sparkles className="h-6 w-6 mx-auto mb-2" />
          <p className="text-sm">No products yet.</p>
        </div>
      ) : (
        products.map((product, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded bg-bone border border-paper-dark"
          >
            <div className="flex-1 grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <Input
                  label="Product Title"
                  value={product.title}
                  onChange={(e) => update(index, "title", e.target.value)}
                  placeholder="Product name"
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  value={product.description}
                  onChange={(e) => update(index, "description", e.target.value)}
                  placeholder="Describe this product"
                  rows={2}
                />
              </div>
              <div className="sm:col-span-2">
                <ImageUpload
                  label="Product Image"
                  value={product.imageUrl}
                  onChange={(url) => update(index, "imageUrl", url)}
                />
              </div>
              <Input
                label="Price (optional)"
                value={product.price}
                onChange={(e) => update(index, "price", e.target.value)}
                placeholder="NPR 1,000"
              />
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.isPopular}
                    onChange={(e) => update(index, "isPopular", e.target.checked)}
                    className="rounded border-paper-dark text-coral focus:ring-coral/30"
                  />
                  <span className="text-sm text-ink-mute">Popular</span>
                </label>
              </div>
            </div>
            <button
              onClick={() => remove(index)}
              className="mt-6 p-2 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
              aria-label="Remove product"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))
      )}
      <button
        onClick={add}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:text-coral/80 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Product
      </button>
    </div>
  );
}
