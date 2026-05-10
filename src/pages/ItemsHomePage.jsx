import { Link } from "react-router-dom";

function ItemsHomePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Home</h1>
      <p className="mb-6 text-gray-700">
        Manage your Firestore items with create, list, single view, edit, and delete operations.
      </p>
      <div className="flex gap-3">
        <Link to="/items/new" className="rounded bg-black px-4 py-2 text-white">
          Create Item
        </Link>
        <Link to="/items" className="rounded border px-4 py-2">
          View All Items
        </Link>
      </div>
    </section>
  );
}

export default ItemsHomePage;
