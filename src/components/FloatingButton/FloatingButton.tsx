import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import "./FloatingButton.css";
import { IFloatingButtonProps } from "../../lib/interfaces/props/IFloatingButtonProps";

export function FloatingButton({ setSelectedSideBarItem }: IFloatingButtonProps) {
	return (
		<>
			<Menu>
				<MenuButton
					size={"lg"}
					p={1}
					borderRadius={30}
					as={IconButton}
					icon={<CgProfile size={"100%"} />}
					bg={"#335C67"}
					color={"#E3E1E1"}
					_hover={{
						backgroundColor: "rgba(102, 179, 186, 0.5)",
						color: "white",
					}}
					_active={{
						backgroundColor: "#335C67",
					}}
				/>
				<MenuList boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)">
					<MenuItem className="menu-item">
						<Link to={"admin/expired-batches"} style={{ textDecoration: "none" }} onClick={() => setSelectedSideBarItem("")}>
							Admin Dashboard
						</Link>
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}
