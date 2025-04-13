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


 async function getOrderById(id) {
  try{
  const res = await axios.get(host + "/orders/getOrder");
  return res.data.rows[0]; // assuming one order per id
} catch (error) {
  console.error("Error fetching order:", error);
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

async function addOrder(orderData) {
  try{
  const res = await axios.post(host + "/orders/addOrder", orderData);
  return res.data;
} catch (error) {
  console.error("Error adding order:", error);
  return false;
}
}

export { getOrders, deleteOrder, addOrder, getOrderById};