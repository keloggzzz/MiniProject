import { useEffect, useState } from "react";
import { getOrders } from "../Services/OrderService";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await getOrders();
      setOrders(res);
    }
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-pink-500 mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={order.id || index}
              className="border p-4 rounded bg-pink-100 shadow"
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>User ID:</strong> {order.user_id}</p>
              <p>
                <strong>Items:</strong>{" "}
                {[order.item1, order.item2, order.item3].filter(Boolean).join(", ")}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => alert("Order confirmed")}
                  className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded text-white"
                >
                  Confirm
                </button>
                <button
                  onClick={() => alert("Order denied")}
                  className="bg-red-400 hover:bg-red-500 px-4 py-1 rounded text-white"
                >
                  Deny
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}