import { useState } from "react";

export default function AddItemPopup({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rarity: "",
    stock: "",
    picture: "",
  });
  {
    /************************************************HANDLE ALL INPUT CHANGES**************************************************/
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  {
    /********************************************HANDLE SUBMISSION**************************************************/
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.rarity ||
      !formData.stock
    ) {
      alert("Please fill out all fields. Picture may be left blank");
      return;
    }

    onAdd(formData); // Pass data back to Home
    onClose(); // Close the popup
  }

  {
    /************************************************UI DISPLAY***************************************************/
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-pink-500">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/****************************NAME***************************************/}
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/****************************DESC***************************************/}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/****************************PRICE***************************************/}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/****************************RARITY***************************************/}
          <select
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Rarity</option>
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Legendary">Legendary</option>
          </select>
          {/****************************STOCK AMOUNT***************************************/}
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/****************************PICTURE***************************************/}
          <input
            type="text"
            name="picture"
            placeholder="Enter a URL to a photo"
            value={formData.picture}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/****************************CANCEL & ADD BUTTONS***************************************/}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 rounded text-white"
              title="Cancel Add"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pink-500 px-4 py-2 rounded text-white"
              title="Add New Item"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}