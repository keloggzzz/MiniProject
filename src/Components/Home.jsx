import {DataContext} from "../App"; 
import { useState, useEffect, useContext } from "react";
import { getItems, deleteItem, addItem } from "../Services/ItemService";
import AddItemPopup from "./AddItem";

export default function Home() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const { order, setOrder } = useContext(DataContext);
  const loggedIn = sessionStorage.getItem("logged");


{/************************************************USED TO CHANGE DISPLAY FOR ADMIN***************************************************/}
    useEffect(() => {
    const role = sessionStorage.getItem("role");
    setIsAdmin(role === "1");
    }, []);

{/************************************************FETCH ITEMS***************************************************/}
  useEffect(() => {
    async function fetchData() {
      const fetchedItems = await getItems();
      console.log("Fetched in Home:", fetchedItems); // debug
      setItems(fetchedItems);
    }

    fetchData();
  }, []);

{/************************************************DELETE ITEM (ADMIN)***************************************************/}
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      await deleteItem(id);

      // Refresh items
      const updatedItems = await getItems();
      setItems(updatedItems);
      alert("Deleting item: "+selectedItem.name)
      setTimeout(window.location.reload(), 3000); //Screen immediately updates
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
    }else {
        alert("Failed to add item");
      }
    }

{/************************************************ADD TO ORDER (NORMAL USER)***************************************************/}
    function UserAddToOrder(item) {
      let temp = JSON.parse(sessionStorage.getItem("order")) || [];
      temp.push(item);
      sessionStorage.setItem("order", JSON.stringify(temp));
      alert("Item added to order. Order length is now: " + temp.length+"\n Final order limit is 3");
    }
    

    
{/************************************************UI DISPLAY***************************************************/}
  return (
    <div>
      <br />
      <div className="text-pink-500 text-left">Welcome to PixelPop! </div>
      <br />
      <h1 className="italic border-2 rounded-lg">Featured Items</h1>
      <h2 className="text-xl italic text-pink-500">
        These {items.length} items are currently available:
      </h2>
      <br />
    {/****************************ITEM LIST***********************************/}
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
                {!isAdmin && loggedIn === "1" &&( //must be logged in, must not be admin
                  <button
                    className="px-2 w-10 h-10 bg-pink-400 hover:bg-pink-500 rounded"
                    onClick={() => UserAddToOrder(item)}
                    title="Add to Order"
                  >
                    +
                  </button>
                )}
            {/************************************************ADMIN DELETE ITEM***************************************************/}
                {isAdmin && <button 
                  className="px-2 w-10 h-10 bg-red-400 hover:bg-red-500 rounded" 
                  onClick={() => handleDelete(selectedItem.id)}
                  title="Delete Item"
                  >
                    X
                  </button>}
              </div>
            </li>
          ))}
          </ul>
        </div>
    {/************************************************SHOW ITEM DESCRIPTIONS***************************************************/}
        <div className="justify-center items-center bg-pink-200 p-4 text-2xl">
          {selectedItem ? (
            <div>
              <p className="mb-4">{selectedItem.description}</p>
                  <div className="flex justify-center">
                    <img
                      src={selectedItem.picture || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} //uploaded image or placeholder
                      alt={selectedItem.name}
                      className="w-64 h-64 object-fill mb-1 border-2 border-pink-500/25 shadow-xl rounded-lg"
                    />
                  </div>
                <p className="mb-4 text-pink-500"> ${selectedItem.price}</p>
                <p className="mb-4">Rarity: {selectedItem.rarity}</p>
                <p className="mb-4">Quantity in Stock: {selectedItem.stock}</p>
            </div>
          ) : (
            <p>Hover over item to see details</p>
          )}
        </div>
      {/************************************************ADMIN ADD NEW ITEM POPUP***************************************************/}
        {isAdmin && (
            <div className="admin-controls">
                <button className="button" onClick={AdminAddPopup}>Add New Item</button>
            </div>
        )}
      </div>
      {showAddPopup && (
        <AddItemPopup onClose={() => setShowAddPopup(false)} onAdd={AdminAddItem} />
      )}
    </div>
  );
}                       
