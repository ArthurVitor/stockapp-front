import IListBatch from "../batch/IListBatch";

export default interface IListInventory {
	id: number;
	name: string;
	batches: IListBatch[];
	batchesCount?: number | null;
}
