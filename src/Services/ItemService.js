import axios from "axios";

const host = "http://localhost:3000";

// Get all items
async function getItems() { 
    try {
      console.log("Making database call for items"); // debug
      const res = await axios.get(host + "/items/items", {
        withCredentials: true
      });
  
      let list = res.data.rows.map((tmp) => ({
        id: tmp.id,
        name: tmp.name,
        description: tmp.description,
        price: tmp.price,
        rarity: tmp.rarity,
        stock: tmp.stock,
        img: tmp.img // if you want to display an image
      }));
  
      console.log("All items:", list);
      return list;
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
}

// Get a single item by ID
async function getItem(id) {
  try {
    const res = await axios.get(host + "/items/getItem", {
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": host,
        "Access-Control-Allow-Headers": "Origin, X-Requested-With",
      },
      withCredentials: true,
    });

    let list=[];
    res.data.rows.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      rarity: item.rarity,
      stock: item.stock
    }));

    console.log("Single item:", list);
    return list[0] || null;
  } catch (error) {
    console.error("Error fetching item:", error);
    return null;
  }
}

// Delete an item by ID
async function deleteItem(id) {
  try {
    const res = await axios.get(host + "/items/deleteItem", {
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": host,
        "Access-Control-Allow-Headers": "Origin, X-Requested-With",
      },
      withCredentials: true,
    });

    console.log(res.data.ans);
    return res.data.ans === "Successfully Deleted";
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
}

async function addItem(item) {
    try {
      const res = await axios.post(host + "/items/addItem",item);
      return res.data;
    } catch (error) {
      console.error("Error adding item:", error);
      return null;
    }
  }

export { getItems, getItem, deleteItem, addItem };