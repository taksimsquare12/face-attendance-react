import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { fetchItemById, updateItem } from "../services/items";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleUpdate = async (formData) => {
    await updateItem(id, formData);
    navigate(`/items/${id}`);
  };

  if (isLoading) {
    return <section className="mx-auto max-w-4xl px-4 py-10">Loading item...</section>;
  }

  if (!item) {
    return <section className="mx-auto max-w-4xl px-4 py-10">Item not found.</section>;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Edit Item</h1>
      <ItemForm initialValues={item} onSubmit={handleUpdate} submitLabel="Update Item" />
    </section>
  );
}

export default EditItemPage;
