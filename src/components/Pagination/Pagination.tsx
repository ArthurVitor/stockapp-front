import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { GrNext, GrPrevious } from "react-icons/gr";
import IPaginationProps from "../../lib/interfaces/props/IPaginationProps";

const Pagination = ({
	totalRecords,
	pageSize,
	onPageChange,
	currentSkip,
}: Readonly<IPaginationProps>) => {
	const totalPages = Math.ceil(totalRecords / pageSize);
	const currentPage = Math.floor(currentSkip / pageSize) + 1;
	const maxVisiblePages = 3;

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentSkip + pageSize);
		}
	};

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentSkip - pageSize);
		}
	};

	const handlePageChange = (page: number) => {
		onPageChange((page - 1) * pageSize);
	};

	const renderPageButtons = () => {
		const buttons = [];

		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage < maxVisiblePages - 1) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		buttons.push(
			<Button
				key="previous"
				leftIcon={<GrPrevious />}
				onClick={handlePrevious}
				disabled={currentPage === 1}
			>
				Previous
			</Button>
		);

		if (startPage > 1) {
			buttons.push(
				<Button
					key={1}
					variant={currentPage === 1 ? "solid" : "outline"}
					onClick={() => handlePageChange(1)}
				>
					1
				</Button>
			);

			if (startPage > 2) {
				buttons.push(
					<Text key="start-ellipsis" mx={2} alignSelf="center">
						...
					</Text>
				);
			}
		}

		for (let page = startPage; page <= endPage; page++) {
			buttons.push(
				<Button
					key={page}
					variant={page === currentPage ? "solid" : "outline"}
					onClick={() => handlePageChange(page)}
				>
					{page}
				</Button>
			);
		}

		if (endPage < totalPages - 1) {
			buttons.push(
				<Text key="ellipsis" mx={2} alignSelf="center">
					...
				</Text>
			);
		}

		if (endPage < totalPages) {
			buttons.push(
				<Button
					key={totalPages}
					variant={totalPages === currentPage ? "solid" : "outline"}
					onClick={() => handlePageChange(totalPages)}
				>
					{totalPages}
				</Button>
			);
		}

		buttons.push(
			<Button
				key="next"
				rightIcon={<GrNext />}
				onClick={handleNext}
				disabled={currentPage === totalPages}
			>
				Next
			</Button>
		);

		return buttons;
	};

	return (
		<Box m={3} justifyContent="center" alignItems="center" display="flex">
			<ButtonGroup>{renderPageButtons()}</ButtonGroup>
		</Box>
	);
};

export default Pagination;