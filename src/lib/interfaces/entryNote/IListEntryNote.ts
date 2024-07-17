export interface IListEntryNote{
    id: number,
    noteGenerationTime: Date,
    formattedNoteGenerationTime?: string,
    expiryDate?: Date | null,
    formattedExpiryDate?: string,
    price: number,
    quantity: number,
    totalValue: number,
    productId: number,
    inventoryId: number
}