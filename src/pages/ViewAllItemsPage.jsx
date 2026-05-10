import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchItems, removeItem } from "../services/items";

function ViewAllItemsPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const allItems = await fetchItems();
        setItems(allItems);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleDelete = async (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
    await removeItem(id);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">View All Items</h1>
        <Link to="/items/new" className="rounded bg-black px-4 py-2 text-white">
          New Item
        </Link>
      </div>

      {isLoading && <p>Loading items...</p>}

      {!isLoading && items.length === 0 && <p>No items found. Create your first item.</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mb-2 text-sm text-gray-500">{item.category || "Uncategorized"}</p>
            <p className="mb-4 line-clamp-3 text-sm text-gray-700">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              <Link to={`/items/${item.id}`} className="rounded border px-3 py-1 text-sm">
                View
              </Link>
              <Link to={`/items/${item.id}/edit`} className="rounded border px-3 py-1 text-sm">
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ViewAllItemsPage;
