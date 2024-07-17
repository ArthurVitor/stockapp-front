import { ICreateEntryNote } from "../interfaces/entryNote/ICreateEntryNote";
import { IListEntryNote } from "../interfaces/entryNote/IListEntryNote";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export async function getAllEntryNotes(orderBy: string, isAscending: boolean, skip: number = 0, take: number = 999, ): Promise<IPagedResult<IListEntryNote>> {
    try{
        const response = await api.get<IPagedResult<IListEntryNote>>(`api/EntryNote?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`)
        return response.data;
    } catch (error: any) {
		if (error.response?.data) {
            throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching entry notes.");
		}
	}
}

export async function createEntryNote(props: ICreateEntryNote): Promise<IListEntryNote>{
    try{
        const response = await api.post<IListEntryNote>("api/EntryNote", props)
        return response.data
    } catch (error: any) {
		if (error.response?.data) {
            throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while creating entry note.");
		}
	}
}

export async function getEntryNoteByid(id: number) : Promise<IListEntryNote> {
    try {
        const response = await api.get<IListEntryNote>(`api/EntryNote/${id}`); 
        return response.data;  
    } catch (error: any) {
        if(error.response?.data){
            throw new Error(JSON.stringify(error.response.data));
        } else {
            throw new Error("An error occurred while fetching entry note.")
        }
    }
}