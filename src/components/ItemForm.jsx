import { useState } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
};

function ItemForm({ initialValues = EMPTY_FORM, onSubmit, submitLabel = "Save Item" }) {
  const [formData, setFormData] = useState({
    title: initialValues.title ?? "",
    description: initialValues.description ?? "",
    category: initialValues.category ?? "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await onSubmit(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl border p-6 shadow-sm">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
          placeholder="Enter title"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-semibold">
          Category
        </label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter category"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded border px-3 py-2"
          placeholder="Describe this item"
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="rounded bg-black px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {isSaving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default ItemForm;
