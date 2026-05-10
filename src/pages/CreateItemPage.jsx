import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { createItem } from "../services/items";

function CreateItemPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    const id = await createItem(formData);
    navigate(`/items/${id}`);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Create Item</h1>
      <ItemForm onSubmit={handleCreate} submitLabel="Create Item" />
    </section>
  );
}

export default CreateItemPage;
