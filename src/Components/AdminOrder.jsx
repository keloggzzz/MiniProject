import { useEffect, useState } from "react";
import { getOrders } from "../Services/OrderService";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);

  {/************************************************SHOW  ALL ORDERS***************************************************/}
  useEffect(() => {
    async function fetchOrders() {
      const res = await getOrders();
      setOrders(res);
    }
    fetchOrders();
  }, []);

{/************************************************UI DISPLAY***************************************************/}
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Admin Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
        {/************************************************SHOW ORDER***************************************************/}
          {orders.map((order, index) => (
            <div
              key={order.id || index}
              className="bg-white border border-pink-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-pink-700">Order #{order.id}</h2>
                
                <span className="text-sm text-gray-500">{new Date(order.purchase_date).toLocaleDateString()}</span>
              </div>
              <p className="text-left ml-30 text-sm text-gray-700 mb-1"><strong>Ordered By: </strong> {order.firstname} {order.lastname}</p>
              <p className="text-left ml-35 text-sm text-gray-700 mb-1"><strong>User ID:</strong> {order.user_id}</p>
              <p className="text-left ml-35 text-sm text-gray-700 mb-2">
                <strong>Items:</strong>{" "}
                {[order.item1_name, order.item2_name, order.item3_name].filter(Boolean).join(", ")} {/*******FILTER PREVENTS NULLS FROM SHOWING****/}
              </p>
              <p className="text-left ml-35 text-sm text-gray-700 mb-4"><strong>Total:</strong> ${order.total_price}</p>
              <div className="flex gap-3">
              {/***************************************CONFIRM ORDER*************************************************/}
                <button
                  onClick={() => alert("Order confirmed")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Confirm
                </button>
              {/********************************************DENY ORDER*************************************************/}
                <button
                  onClick={() => alert("Order denied")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}