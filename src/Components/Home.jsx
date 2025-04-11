import {DataContext} from "../App"; 
import { useState, useEffect, useContext } from "react";
import { getItems, deleteItem, addItem } from "../Services/ItemService";
import AddItemPopup from "./AddItem";

export default function Home() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

    useEffect(() => {
    const role = sessionStorage.getItem("role");
    setIsAdmin(role === "1");
    }, []);

  // Fetch items on component mount
  useEffect(() => {
    async function fetchData() {
      const fetchedItems = await getItems();
      console.log("Fetched in Home:", fetchedItems); // debug
      setItems(fetchedItems);
    }

    fetchData();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      // Call your deleteItem service here
      await deleteItem(id);
      // Refresh items
      const updatedItems = await getItems();
      setItems(updatedItems);
    }
  }
  
  function handleAdd() {
    setShowAddPopup(true);
  }

  async function handleAddItem(itemData) {
    const res = await addItem(itemData);
      if (res.success) {
      const updatedItems = await getItems();
      setItems(updatedItems);
    }else {
        alert("Failed to add item");
      }

  return (
    <div>
      <br />
      <div className="text-pink-500 text-left">Welcome to PixelPop! </div>
      <br />
      <h1 className="italic border-2 rounded-lg">Featured Items</h1>
      <h2 className="text-xl italic text-pink-500">
        These {items.length} items are currently trending:
      </h2>
      <br />

      <div
        id="grid"
        className="grid grid-cols-2 bg-pink-200 rounded-lg shadow-lg border-pink-400 border-3"
      >
        <div id="DisplayItems" className="border-r">
          <h2 className="underline">Items list:</h2>
          <ul className="grid grid-cols-1 gap-y-2 bg-pink-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="p-2 cursor-pointer hover:bg-pink-300 rounded"
                onMouseEnter={() => setSelectedItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-pink-200 p-4 text-2xl">
          {selectedItem ? (
            <div>
              {selectedItem.img && (
                <img
                  src={selectedItem.img}
                  alt={selectedItem.name}
                  className="w-48 h-48 object-contain mb-4"
                />
              )}
              <p>{selectedItem.description}</p>
              {isAdmin && <button className="button" onClick={() => handleDelete(item.id)}>Delete Item</button>}
            </div>
          ) : (
            <p>Hover over item to see details</p>
          )}
        </div>
        {isAdmin && (
            <div className="admin-controls">
                <button className="button" onClick={handleAdd}>Add New Item</button>
            </div>
        )}
      </div>
      {showAddPopup && (
        <AddItemPopup onClose={() => setShowAddPopup(false)} onAdd={handleAddItem} />
      )}
    </div>
  );
}                       
}