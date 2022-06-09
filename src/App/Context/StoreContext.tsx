import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../Models/basket";

interface StoreContextValue{
    basket: Basket | null;
    setBasket :(basket:Basket) => void;
    removeItem:(productId:number, quantity:number)=> void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw Error('Oops - we do not seem to be inside the provider')
    }
    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>){
    const [basket,setBasket] = useState<Basket | null>(null);
    
    function removeItem(productId:number,quantity:number){
        if (!basket) return;
        //create new basket of items to manipulate the state
        const items = [...basket.items];
        // find the index of the item
        const itemIndex = items.findIndex(i => i.productId === productId);
        // returns either index for true or -1 for false
        if(itemIndex >= 0 ){
            // remove single item
            items[itemIndex].quantity -= quantity;
            // remove item if quantity hits 0 
            if (items[itemIndex].quantity === 0) items.splice(itemIndex,1);
            // update state, using ! to mitigate typescript error
            setBasket(prevState => {
                return{ ...prevState! , items}
            })
        }
    }
    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}