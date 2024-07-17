import { Box, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { OrderSelector } from "../OrderSelector/OrderSelector";
import "./SearchBar.css";
import IFilterBarProps from "../../lib/interfaces/props/IFilterBarProps";
import { useState } from "react";

export function SearchBar({
	orderOptions,
	onOptionChange,
	onDirectionChange,
	onSearchChange,
	onClick,
	buttonText,
}: Readonly<IFilterBarProps>) {
	const [isInvalid, setIsInvalid] = useState(false);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		if (onSearchChange) onSearchChange(searchTerm);

		if (searchTerm && isNaN(Number(searchTerm))) setIsInvalid(true);
		else setIsInvalid(false);
	};

	return (
		<Box className="filter-box">
			<InputGroup w="30%">
				<InputRightElement>
					<CiSearch color="#335C67" />
				</InputRightElement>
				<Input
					className="filter-input"
					placeholder="Search for id..."
					onChange={handleSearchChange}
					borderColor={isInvalid ? "red.500" : "gray.200"}
					_focus={{ borderColor: isInvalid ? "red.500" : "blue.500" }}
				/>
			</InputGroup>
			{onClick && (
				<Button marginLeft={"45%"} colorScheme="red" onClick={onClick}>
					{buttonText}
				</Button>
			)}
			<OrderSelector
				orderOptions={orderOptions}
				onOptionChange={onOptionChange}
				onDirectionChange={onDirectionChange}
			/>
		</Box>
	);
}
