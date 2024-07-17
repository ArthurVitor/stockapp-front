export default interface IListBatch {
    id: number, 
    expiryDate?: Date | null,
    formattedExpiryDate?: string; 
    price: number, 
    quantity: number, 
    totalValue: number, 
    productId: number, 
    entryNoteId: number, 
    inventoryId: number
};