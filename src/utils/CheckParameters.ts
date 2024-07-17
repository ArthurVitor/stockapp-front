import { NoteTypeEnum } from "../lib/enums/NoteTypeEnum";
import { getParametersByInventoryIdAndProductId } from "../services/ParametersService";

export default async function IsParametersViolated(
	noteType: string,
	productId: number,
	inventoryId: number,
	quantity: number,
	quantityAvaliableInventory: number
) {
	const parameter = await getParametersByInventoryIdAndProductId(inventoryId, productId);
	if (!parameter) return false;

	if (noteType === NoteTypeEnum.ENTRY) {
		return quantityAvaliableInventory + quantity > parameter.maximumAmount;
	}

	return quantityAvaliableInventory - quantity < parameter.minimumAmount;
}
