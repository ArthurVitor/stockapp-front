import { useCallback, useState } from "react";
import IListInventory from "../lib/interfaces/inventory/IListInventory";

interface ProductQuantities {
  [key: number]: number;
}

export const useQuantityOfProductsInInventory = (inventories: IListInventory[]) => {
      const [productQuantities, setProductQuantities] = useState<ProductQuantities>({});

      const calculateProductQuantities = useCallback((productId: number, inventoryId: number) => {
        const selectedInventory = inventories.find(inventory => inventory.id === inventoryId);
        if (selectedInventory) {
          const totalQuantity = selectedInventory.batches
            .filter(batch => batch.productId === productId)
            .reduce((sum, batch) => sum + batch.quantity, 0);
          setProductQuantities(prevQuantities => ({
            ...prevQuantities,
            [inventoryId]: totalQuantity
          }));
        }
      }, [inventories]);
    
      return { productQuantities, calculateProductQuantities };
  };