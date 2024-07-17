import { ICreateExitNote } from "../interfaces/exitNote/ICreateExitNote";
import { IListExitNote } from "../interfaces/exitNote/IListExitNote";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export async function getAllExiteNotes(orderBy: string, isAscending: boolean, skip: number = 0, take: number = 999,): Promise<IPagedResult<IListExitNote>>{
    try{
        const response = await api.get<IPagedResult<IListExitNote>>(`/api/ExitNote?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`);
        return response.data;
    } catch (error: any) {
		if (error.response?.data) {
			throw new Error(error.response.data); 
		} else {
			throw new Error("An error occurred while fetching exit notes.");
		}
	}
}

export async function createExitNote(props: ICreateExitNote): Promise<IListExitNote> {
    try{
        const response = await api.post<IListExitNote>("/api/ExitNote", props)
        return response.data;
    } catch (error: any) {
		if (error.response?.data) {
			throw new Error(error.response.data); 
		}
			throw new Error("An error occurred while creating exit note.");
	}
}

export async function getExitNoteById(id: number): Promise<IListExitNote> {
	try {
		const response = await api.get<IListExitNote>(`/api/ExitNote/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(error.response.data);
		}
		throw new Error("An error occurred while fecthing exit note."); 
	}
}