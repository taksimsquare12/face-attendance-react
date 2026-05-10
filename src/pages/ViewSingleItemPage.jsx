import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchItemById } from "../services/items";

function ViewSingleItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const fetchedItem = await fetchItemById(id);
        setItem(fetchedItem);
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [id]);

  if (isLoading) {
    return <section className="mx-auto max-w-4xl px-4 py-10">Loading item...</section>;
  }

  if (!item) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-3 text-2xl font-bold">Item not found</h1>
        <Link to="/items" className="rounded border px-4 py-2">
          Back to all items
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">{item.title}</h1>
      <p className="mb-5 text-sm text-gray-500">{item.category || "Uncategorized"}</p>
      <p className="mb-6 leading-7 text-gray-800">{item.description}</p>
      <div className="flex gap-3">
        <Link to={`/items/${item.id}/edit`} className="rounded bg-black px-4 py-2 text-white">
          Edit Item
        </Link>
        <Link to="/items" className="rounded border px-4 py-2">
          Back to all
        </Link>
      </div>
    </section>
  );
}

export default ViewSingleItemPage;
