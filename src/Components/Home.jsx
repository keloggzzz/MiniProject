import { DataContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { getItems, deleteItem, addItem, updateItem } from "../Services/ItemService";
import AddItemPopup from "./AddItem";

export default function Home() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { order, setOrder } = useContext(DataContext);
  const loggedIn = sessionStorage.getItem("logged");
  const [showEdit, setShowEdit] = useState(false); //toggle edits for admin

  {/************************************************USED TO CHANGE DISPLAY FOR ADMIN***************************************************/}
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setIsAdmin(role === "1");
  }, []);

  {/************************************************FETCH ITEMS***************************************************/}
  useEffect(() => {
    async function fetchData() {
      const fetchedItems = await getItems();
      console.log("Fetched in Home:", fetchedItems);
      setItems(fetchedItems);
    }

    fetchData();
  }, []);

  {/************************************************SET ITEM TO EDIT***************************************************/}
  useEffect(() => {
    if (selectedItem) {
      setEditItem({ ...selectedItem });
    }
  }, [selectedItem]);

  {/************************************************DELETE ITEM (ADMIN)***************************************************/}
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      await deleteItem(id);
      const updatedItems = await getItems();
      setItems(updatedItems);
      setSelectedItem(null);
      alert("Item deleted!");
    }
  }

  {/************************************************ADD NEW ITEM (ADMIN)***************************************************/}
  function AdminAddPopup() {
    setShowAddPopup(true);
  }

  async function AdminAddItem(itemData) {
    const res = await addItem(itemData);
    if (res.success) {
      const updatedItems = await getItems();
      setItems(updatedItems);
    } else {
      alert("Failed to add item");
    }
  }

  {/************************************************UPDATE ITEM (ADMIN)***************************************************/}
  async function AdminUpdate() {
    const res = await updateItem(editItem);
    if (res.success) {
      alert("Item updated successfully!");
      const updatedItems = await getItems();
      setItems(updatedItems);
      setShowEdit(false); // Exit edit mode
    } else {
      alert("Failed to update item.");
    }
  }

  {/************************************************ADD TO ORDER (NORMAL USER)***************************************************/}
  function UserAddToOrder(item) {
    let temp = JSON.parse(sessionStorage.getItem("order")) || [];
    if (temp.length >= 3) {
      alert("You can only add up to 3 items.");
      return;
    }
    temp.push(item);
    sessionStorage.setItem("order", JSON.stringify(temp));
    alert(`Item added to order. \nOrder length is now: ${temp.length}\nFinal order limit is 3`);
  }

  {/************************************************UI DISPLAY***************************************************/}
  return (
    <div>
      <br />
      <div className="text-pink-500 text-left">Welcome to PixelPop!</div>
      <br />
      <h1 className="italic border-2 rounded-lg">Featured Items</h1>
      <h2 className="text-xl italic text-pink-500">
        These {items.length} items are currently available:
      </h2>
      <br />

      {/****************************ITEM LIST, LEFT SIDE***********************************/}
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
                {/************************************************USER ADD TO ORDER***************************************************/}
                <div className="flex justify-between items-center">
                  <span>{item.name}</span>
                  {!isAdmin && loggedIn === "1" && ( //if not an admin and logged in...
                    <button
                      className="px-2 w-10 h-10 bg-pink-400 hover:bg-pink-500 rounded"
                      onClick={() => UserAddToOrder(item)}
                      title="Add to Order"
                    >
                      +
                    </button>
                  )}
                  {/************************************************ADMIN DELETE ITEM***************************************************/}
                  {isAdmin && ( //if an admin, can delete
                    <button
                      className="px-2 w-10 h-10 bg-red-400 hover:bg-red-500 rounded"
                      onClick={() => handleDelete(item.id)}
                      title="Delete Item"
                    >
                      X
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/************************************************SHOW ITEM DESCRIPTIONS, RIGHT SIDE***************************************************/}
        <div className="justify-center items-center bg-pink-200 p-4 text-2xl">
          {selectedItem ? (
            <div>
              {isAdmin ? ( //if admin, show deletion and update options
                <div>
                  {!showEdit ? ( //if showedit is false for admin, show the normal display
                    //************************************************NORMAL DISPLAY**************************************************//
                    <div>
                      <p className="mb-4">{selectedItem.description}</p>
                      <div className="flex justify-center">
                        <img
                          src={
                            selectedItem.picture ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          }
                          alt={selectedItem.name}
                          className="w-64 h-64 object-fill mb-1 border-2 border-pink-500/25 shadow-xl rounded-lg"
                        />
                      </div>
                      <p className="mb-4 text-pink-500"> ${selectedItem.price}</p>
                      <p className="mb-4">Rarity: {selectedItem.rarity}</p>
                      <p className="mb-4">Quantity in Stock: {selectedItem.stock}</p>

                      {/*********************UPDATE BUTTON********************/}
                      <button
                        className="button"
                        onClick={() => setShowEdit(true)}
                        title="Update Item Details"
                      >
                        Update Details
                      </button>
                    </div>
                  ) : (
                  //************************************************IF EDIT MODE IS TRUE, SHOW EDITABLE FIELDS**************************************************//
                    <div>
  
                      <label>Name:</label>
                      <input
                        className="border rounded px-2 py-1 mb-2 w-full"
                        value={editItem?.name || ""}
                        onChange={(e) =>
                          setEditItem({ ...editItem, name: e.target.value })
                        }
                      />

                      <label>Description:</label>
                      <textarea
                        className="border rounded px-2 py-1 mb-2 w-full"
                        value={editItem?.description || ""}
                        onChange={(e) =>
                          setEditItem({ ...editItem, description: e.target.value })
                        }
                      />

                    
                      <label>Price:</label>
                      <input
                        type="number"
                        className="border rounded px-2 py-1 mb-2 w-full"
                        value={editItem?.price || ""}
                        onChange={(e) =>
                          setEditItem({ ...editItem, price: e.target.value })
                        }
                      />


                      <label>Rarity:</label>
                      <select
                        name="rarity"
                        value={editItem?.rarity}
                        onChange={(e) =>
                          setEditItem({ ...editItem, rarity: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select Rarity</option>
                        <option value="Common">Common</option>
                        <option value="Rare">Rare</option>
                        <option value="Legendary">Legendary</option>
                      </select>


                      <label>Stock:</label>
                      <input
                        type="number"
                        className="border rounded px-2 py-1 mb-2 w-full"
                        value={editItem?.stock || ""}
                        onChange={(e) =>
                          setEditItem({ ...editItem, stock: e.target.value })
                        }
                      />


                      <label>Picture URL:</label>
                      <input
                        className="border rounded px-2 py-1 mb-4 w-full"
                        value={editItem?.picture || ""}
                        onChange={(e) =>
                          setEditItem({ ...editItem, picture: e.target.value })
                        }
                      />

            {/*************************SAVE BUTTON*******************************/}
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={AdminUpdate}
                        title="Save Changes to Item"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              ) : (
           //************************************************IF NOT AN ADMIN, SHOW REGULAR DISPLAY NO UPDATE BUTTON**************************************************//
                <div>
                  <p className="mb-4">{selectedItem.description}</p>
                  <div className="flex justify-center">
                    <img
                      src={
                        selectedItem.picture ||
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      }
                      alt={selectedItem.name}
                      className="w-64 h-64 object-fill mb-1 border-2 border-pink-500/25 shadow-xl rounded-lg"
                    />
                  </div>
                  <p className="mb-4 text-pink-500"> ${selectedItem.price}</p>
                  <p className="mb-4">Rarity: {selectedItem.rarity}</p>
                  <p className="mb-4">Quantity in Stock: {selectedItem.stock}</p>
                </div>
              )}
            </div>
          ) : (
            <p>Hover over item to see details</p>
          )}
        </div>
      </div>

      {/************************************************ADMIN ADD NEW ITEM POPUP***************************************************/}
      {isAdmin && (
        <div className="mt-4">
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded" 
            onClick={AdminAddPopup}
            title="Add a New Item to System"
          >
            Add New Item
          </button>
        </div>
      )}

      {showAddPopup && (
        <AddItemPopup onClose={() => setShowAddPopup(false)} onAdd={AdminAddItem} />
      )}
    </div>
  );
}