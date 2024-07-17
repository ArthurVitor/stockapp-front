import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import './OrderSelector.css';
import { LuArrowDownUp, LuArrowUpDown } from "react-icons/lu";
import { useState } from "react";
import IFilterSelectorProps from "../../lib/interfaces/props/IFilterSelectorProps";

export function OrderSelector({ orderOptions, onOptionChange, onDirectionChange }: Readonly<IFilterSelectorProps>) {
	const [isAscending, setIsAscending] = useState<boolean>(true);

	const handleAscendingChange = () => {
		setIsAscending(!isAscending);

		if(onDirectionChange){
			onDirectionChange(isAscending);
		}
	}

	return (
		<Menu>
			<Flex>
				<MenuButton as={Button} className="menu-button" borderRightRadius={0}>
					Order
				</MenuButton>
				<Button className="menu-button" borderLeftRadius={0} onClick={handleAscendingChange}>
					{ isAscending ? <LuArrowDownUp /> : <LuArrowUpDown /> }
				</Button>
			</Flex>
			<MenuList boxShadow="0px 4px 6px rgba(0, 0, 0, 0.2)">
				{orderOptions.map((orderOption) => (
					<MenuItem className= "menu-item" key={orderOption} onClick={() => onOptionChange ? onOptionChange(orderOption.trim().replaceAll(" ", "").toLowerCase()) : null}>
						{orderOption}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}
