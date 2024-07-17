import { IListExitNoteBatch } from "../exitNoteBatch/IListExitNoteBatch";
export interface IListExitNote {
	id: number;
	quantity: number;
	productId: number;
	inventoryId: number;
	batches: IListExitNoteBatch[];
}
