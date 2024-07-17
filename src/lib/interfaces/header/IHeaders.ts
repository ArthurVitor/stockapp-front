import { IHeaderKeys } from "./IHeaderKeys";

export interface IHeaders {
	product: IHeaderKeys[];
	parameters: IHeaderKeys[];
	subCategories: IHeaderKeys[];
	batches: IHeaderKeys[];
	inventories: IHeaderKeys[];
	entryNotes: IHeaderKeys[];
	exitNotes: IHeaderKeys[];
	transactions: IHeaderKeys[];
	overrides: IHeaderKeys[];
}
