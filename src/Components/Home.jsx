import {DataContext} from "../App"; 
import {items} from "../Model/items.json"
import {useState, useContext} from "react";

export default function Home(){
    const{itemlist, logStatus}=useContext(DataContext);
    const[items, setItem]=useState(itemlist);
    const[length, setLength]=useState(itemlist.length);

    const [selectedItem, setSelectedItem] = useState(null); //state for item currently hovered over



return(
      <div>
                <h1 className="text-3xl">PixelPop Shop</h1>
                <h2 className="text-2xl text-pink-500">There are currently {length} items available:</h2>
                <br></br>
       

            <div id="grid" className="grid grid-cols-2 bg-pink-200 rounded-lg shadow border border-pink-400 border-3" >
                <div id="DisplayItems" className="border-r">
                    <h2 className= "underline">Items list:</h2>
                    <ul className="grid grid-cols-1 gap-y-2 bg-pink-200">
                        {items.map((item) => (
                            <li key={item.id} 
                            className="p-2 cursor-pointer hover:bg-pink-300 rounded"
                            onMouseEnter={() => setSelectedItem(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className=" bg-pink-200 p-4 text-2xl">
                        {selectedItem?(
                            <div>
                                <img src={selectedItem.img}></img>
                                <br></br>
                                <p>{selectedItem.desc} </p>
                                
                            </div>



                        ): (<p>Hover over item to see details</p>)}
                    
                    </div>
            </div>
        </div>                         
                                        
);
}
