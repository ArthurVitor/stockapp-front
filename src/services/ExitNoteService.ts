import { ICreateExitNote } from "../lib/interfaces/exitNote/ICreateExitNote";
import { IListExitNote } from "../lib/interfaces/exitNote/IListExitNote";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { createExitNote, getAllExiteNotes, getExitNoteById } from "../lib/requests/ExitNoteRequest";

export async function GetAllExitNotes(skip: number = 0, take: number = 999, orderBy: string = "id", isAscending: boolean = true): Promise<IPagedResult<IListExitNote>> {
    try{
        const response = await getAllExiteNotes(orderBy, isAscending, skip, take, );
        return response
    } catch (error) {
        console.error("Error while fetching exit notes.", error)
        throw(error);
    }
}

export async function CreateExitNote(props: ICreateExitNote): Promise<IListExitNote> {
    try {
        const response = await createExitNote(props);
        return response
    } catch(error){
        console.error(error)
        throw(error)
    }
}

export async function GetExitNoteById(id: number): Promise<IListExitNote> {
    try {
        const response = await getExitNoteById(id);
        return response;
    } catch(error) {
        console.error(error);
        throw(error); 
    }
}