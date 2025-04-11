import { useState } from "react";

export default function AddItemPopup({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rarity: "",
    stock: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.rarity || !formData.stock) {
      alert("Please fill out all fields.");
      return;
    }

    onAdd(formData); // Pass data back to Home
    onClose();       // Close the popup
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-pink-500">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            >
            <option value="">Select Rarity</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="legendary">Legendary</option>
          </select>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-400 px-4 py-2 rounded text-white">
              Cancel
            </button>
            <button type="submit" className="bg-pink-500 px-4 py-2 rounded text-white">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}