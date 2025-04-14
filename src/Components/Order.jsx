import { useContext } from "react";
import { DataContext } from "../App";
import { addOrder } from "../Services/OrderService";

export default function YourOrder() {
  const { order, setOrder } = useContext(DataContext);
  const loggedIn = sessionStorage.getItem("logged");

{/***************************************CLEAR THE ORDER************************************************ */}
  const clearOrder = () => {
    setOrder([]);
    sessionStorage.setItem("order", JSON.stringify([]));
  };

{/************************************REMOVE SINGLE ITEM FROM ORDER************************************************ */}
  const removeItem = (indexToRemove) => {
    const updatedOrder = order.filter((_, index) => index !== indexToRemove);
    setOrder(updatedOrder);
    sessionStorage.setItem("order", JSON.stringify(updatedOrder));
  };

{/***************************************FIND ORDER TOTAL************************************************ */}

  const total = order.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
  //Iterate through each item.price of array "order" and add them together
    //Sum initially 0
    //Convert strings to float
    //Round to 2 decimal places

{/*************************************SAVE ORDER TO ORDERS TABLE************************************************ */}
  const placeOrder = async () => {
    if (order.length > 3) {
      alert("You can only order up to 3 items at a time.");
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

{/**************************************************UI DISPLAY****************************************************** */}

{/***************************************IF USER ISN'T LOGGED IN********************************************** */}
  if (loggedIn!=="1") {
    return (
      <div className="p-6">
        <h1 className="text-xl text-red-500">You must be logged in to view an order.</h1>
      </div>
    );
  } 
  else{

   {/***************************************IF USER IS LOGGED IN************************************************ */}
  return (
    //NO ITEMS YET
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl text-pink-500 w-1/2">Your Order</h1>
      <br></br>
      {order.length === 0 ? (
        
        <p className="text-pink-500">You have not added any items to your order.</p>
      ) : 
      //ITEMS ADDED
      (
        <div className="flex mt-5 justify-center items-center">
          <ul className="text-left bg-pink-100 p-4 rounded shadow-md w-80">
            
          {/***********************************DISPLAY THE ITEMS***************************/}
            {order.map((item, index) => (
              <li key={index} className="mb-2 border-b border-pink-300 pb-1 flex justify-between items-center">
                <span>{item.name}</span> 

                {/***********************************REMOVE AN ITEM***************************/}
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
      {/***********************************SHOW TOTAL***************************/}
      <p className="mt-4 text-lg font-semibold text-pink-600">
        Order Total: ${total}
      </p>
      {/***********************************CLEAR ORDER***************************/}
      {order.length > 0 && (
        <button
          onClick={clearOrder}
          className="text-xs mt-4 p-2 bg-red-300 hover:bg-red-400 text-white rounded"
        >
          Clear Order
        </button>
      )}
      {/***********************************PLACE ORDER***************************/}
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