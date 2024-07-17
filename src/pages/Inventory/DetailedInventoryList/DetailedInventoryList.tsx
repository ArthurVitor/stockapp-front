import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getInventoryById } from "../../../services/InventoryService";
import { DetailedView } from "../../../components/DetailedView/DetailedView";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";
import IListInventory from "../../../lib/interfaces/inventory/IListInventory";

export function DetailedInventoryList() {
	const { inventoryId } = useParams();
	const [inventory, setInventory] = useState<IListInventory>();
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("inventories");
		setActivatedTag("");
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const _inventory = await getInventoryById(Number(inventoryId));
				setInventory(_inventory);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [inventoryId]);

	return (
		<DetailedView
			title="Inventory"
			entity={inventory || {}}
			dependencies={[inventory?.batches || []]}
			dependenciesTitles={["Batches"]}
			keysBlackList={["batches"]}
		/>
	);
}
