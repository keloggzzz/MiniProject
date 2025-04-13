import axios from "axios";
const host = "http://localhost:3000";

async function getOrders() {
  try {
    const res = await axios.get(host + "/orders/orders");
    return res.data.rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function deleteOrder(id) {
  try {
    const res = await axios.delete(host + "/orders/delOrder", 
    { params: { id } });
    return res.data.ans === "Successfully Deleted";
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
}

// Later you could also add an "addOrder" function here

export { getOrders, deleteOrder };