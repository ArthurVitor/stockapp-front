import { Item } from "../sideBar/ItemSideBar";

export interface SidebarItemProps {
	item: Item;
	selectedItem: string | null;
	handleItemClick: (item: string) => void;
}
