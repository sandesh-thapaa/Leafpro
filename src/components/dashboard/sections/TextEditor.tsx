"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Plus, Trash2 } from "lucide-react";
import type { CustomTextSection } from "@/types/tenant";

interface TextEditorProps {
  texts: CustomTextSection[];
  onChange: (texts: CustomTextSection[]) => void;
}

export function TextEditor({ texts, onChange }: TextEditorProps) {
  const add = () =>
    onChange([
      ...texts,
      { title: "", content: "", order: texts.length },
    ]);

  const remove = (index: number) =>
    onChange(texts.filter((_, i) => i !== index));

  const update = (index: number, field: keyof CustomTextSection, value: string) =>
    onChange(texts.map((t, i) => (i === index ? { ...t, [field]: value } : t)));

  if (texts.length === 0) {
    return (
      <div className="text-center py-8 text-ink-faint">
        <p className="text-sm mb-3">No custom text blocks yet.</p>
        <button
          onClick={add}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:text-coral/80 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Text Block
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {texts.map((text, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-4 rounded bg-bone border border-paper-dark"
        >
          <div className="flex-1 space-y-3">
            <Input
              label="Heading"
              value={text.title}
              onChange={(e) => update(index, "title", e.target.value)}
              placeholder="Section heading (optional)"
            />
            <Textarea
              label="Content"
              value={text.content}
              onChange={(e) => update(index, "content", e.target.value)}
              placeholder="Write your content here..."
              rows={4}
            />
          </div>
          <button
            onClick={() => remove(index)}
            className="mt-6 p-2 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
            aria-label="Remove text block"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:text-coral/80 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Text Block
      </button>
    </div>
  );
}
