import IListSubcategory from "../subcategory/IListSubcategory";

export interface IListProduct {
	id: number;
	name: string;
	category: number;
	perishable: boolean;
	subCategories: IListSubcategory[];
}
