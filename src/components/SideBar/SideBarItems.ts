import { RiShoppingCart2Line, RiShoppingCart2Fill, RiStackLine, RiStackFill } from "react-icons/ri";
import { PiTagLight, PiTagFill } from "react-icons/pi";
import { BsBox2, BsBox2Fill } from "react-icons/bs";
import {
	MdOutlineNoteAdd,
	MdNoteAdd,
	MdShoppingCartCheckout,
	MdShoppingCart,
} from "react-icons/md";
import { IoExit, IoExitOutline, IoListOutline, IoListSharp } from "react-icons/io5";
import { BiSolidMessage, BiMessage } from "react-icons/bi";
import { Item } from "../../lib/interfaces/sideBar/ItemSideBar";

export const items: Item[] = [
	{ name: "products", label: "Products", icons: [RiShoppingCart2Line, RiShoppingCart2Fill] },
	{ name: "subcategories", label: "Subcategories", icons: [PiTagLight, PiTagFill] },
	{ name: "batches", label: "Batches", icons: [BsBox2, BsBox2Fill] },
	{ name: "inventories", label: "Inventories", icons: [RiStackLine, RiStackFill] },
	{ name: "entry-notes", label: "Entry Notes", icons: [MdOutlineNoteAdd, MdNoteAdd] },
	{ name: "exit-notes", label: "Exit notes", icons: [IoExitOutline, IoExit] },
	{ name: "parameters", label: "Parameters", icons: [IoListOutline, IoListSharp] },
	{ name: "transactions", label: "Transactions", icons: [MdShoppingCartCheckout, MdShoppingCart] },
	{ name: "overrides", label: "Overrides", icons: [BiMessage, BiSolidMessage] },
];
