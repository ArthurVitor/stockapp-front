export default interface IReallocateBatch {
    SenderInventoryId: number, 
    RecipientInventoryId: number, 
    ProductId: number, 
    Quantity: number, 
    ExpiryDate: string, 
    Price: number
}