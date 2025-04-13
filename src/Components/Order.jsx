import { useContext } from "react";
import { DataContext } from "../App";
import { addOrder } from "../Services/OrderService";

export default function YourOrder() {
  const { order, setOrder } = useContext(DataContext);
  const loggedIn = sessionStorage.getItem("logged");


  // Clear all items
  const clearOrder = () => {
    setOrder([]);
    sessionStorage.setItem("order", JSON.stringify([]));
  };

  // Remove a single item
  const removeItem = (indexToRemove) => {
    const updatedOrder = order.filter((_, index) => index !== indexToRemove);
    setOrder(updatedOrder);
    sessionStorage.setItem("order", JSON.stringify(updatedOrder));
  };

  const placeOrder = async () => {
    if (order.length > 3) {
      alert("You can only order up to 3 items.");
      return;
    }
  
    const userId = sessionStorage.getItem("userId");
    const itemIds = order.map(item => item.id);
    const [item1, item2, item3] = itemIds;
    console.log("Placing order for user ", userId)
    const res = await addOrder({ user_id:userId, item1, item2, item3 });
  
    if (res.success) {
      alert("Order placed!");
      setOrder([]);
      sessionStorage.setItem("order", JSON.stringify([]));
    } else {
      alert("Failed to place order.");
    }
  };

  if (loggedIn!=="1") {
    return (
      <div className="p-6">
        <h1 className="text-xl text-red-500">You must be logged in to view an order.</h1>
      </div>
    );
  } else{
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl text-pink-500 w-1/2">Your Order</h1>
      <br></br>
      {order.length === 0 ? (
        
        <p className="text-pink-500">You have not added any items to your order.</p>
      ) : (
        <div className="flex mt-5 justify-center items-center">
          <ul className="text-left bg-pink-100 p-4 rounded shadow-md w-80">
            {order.map((item, index) => (
              <li key={index} className="mb-2 border-b border-pink-300 pb-1 flex justify-between items-center">
                <span>{item.name}</span>
                <button
                  className="text-xs bg-red-300 hover:bg-red-400 text-white px-2 py-1 rounded"
                  onClick={() => removeItem(index)}
                  title="Remove Item"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {order.length > 0 && (
        <button
          onClick={clearOrder}
          className="text-xs mt-4 p-2 bg-red-300 hover:bg-red-400 text-white rounded"
        >
          Clear Order
        </button>
      )}
      {order.length > 0 && (
        <button
          onClick={placeOrder}
          className="text-xs mt-4 p-2 bg-green-300 hover:bg-green-400 text-white rounded"
        >
          Place Order
        </button>
      )}
    </div>
  );
}
}