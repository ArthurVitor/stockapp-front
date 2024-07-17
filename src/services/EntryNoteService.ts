import { ICreateEntryNote } from "../lib/interfaces/entryNote/ICreateEntryNote";
import { IListEntryNote } from "../lib/interfaces/entryNote/IListEntryNote";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { createEntryNote, getAllEntryNotes, getEntryNoteByid } from "../lib/requests/EntryNoteRequests";

export async function GetAllEntryNotes(skip: number = 0, take: number = 999, orderBy: string = "id", isAscending: boolean = true): Promise<IPagedResult<IListEntryNote>> {
    try{
        const response = await getAllEntryNotes(orderBy, isAscending, skip, take,);
        return response;
    }
    catch(error){
        console.log(error); 
        throw(error);
    }
}

export async function CreateEntryNote(props: ICreateEntryNote): Promise<IListEntryNote> {
    try{
        const response = await createEntryNote(props);
        return response;
    }
    catch (error){
        console.error(error)
        throw(error)
    }
}

export async function GetEntryNoteById(id: number): Promise<IListEntryNote> {
    try {
        const response = await getEntryNoteByid(id); 
        return response;
    } catch(error) {
        console.error("Error in GetEntryNoteById from Entrynote service:", error);
        throw(error); 
    }
}