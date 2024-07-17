import { IListExitNote } from "../exitNote/IListExitNote"
import { IListEntryNote } from "../entryNote/IListEntryNote"

export default interface IlIstTransactions {
    id: number, 
    transactionType: string, 
    description: string, 
    quantity: number, 
    inventoryId: number,
    nodeId: number
    entryNoteDetails?: IListEntryNote,
    exitNoteDetails?: IListExitNote
};