import { Loading } from "../../../components/Loading/Loading";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import Pagination from "../../../components/Pagination/Pagination";
import { useListOverride } from "../../../hooks/useListOverride";
import { reverseTransaction } from "../../../services/AdminService";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { ConfirmationModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

export function ReverseTransactionsPage() {
	const {
		overrides,
		loading,
		totalRecords,
		skip,
		take,
		orderOptions,
		errorMessage,
		onSearchChange,
		handlePageChange,
		handleOrderSelect,
		handleDirectionSelect,
	} = useListOverride();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedOverrideId, setSelectedOverrideId] = useState<number | null>(null);
	const toast = useToast();

	const handleReverseTransaction = (overrideId: number) => {
		setSelectedOverrideId(overrideId);
		onOpen();
	};

	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("adminRoute");
		setActivatedTag("reverseTransaction");
	});

	const confirmReverseTransaction = async () => {
		if (selectedOverrideId !== null) {
			try {
				await reverseTransaction(selectedOverrideId);
				toast({
					title: "Reversed transaction.",
					description: "The transaction was successfully reversed.",
					status: "success",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
			} catch (error) {
				toast({
					title: "An error has occured.",
					description: parseErrorMessage(error),
					status: "error",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
			}
			onClose();
		}
	};

	if (loading) return <Loading />;
	if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;
	return (
		<>
			<SearchBar
				onSearchChange={onSearchChange}
				orderOptions={orderOptions}
				onOptionChange={handleOrderSelect}
				onDirectionChange={handleDirectionSelect}
			/>
			<FlexibleTable
				data={overrides}
				keysBlackList={["generationTime"]}
				size={"lg"}
				variant={"striped"}
				bgColor="white"
				thColor="#F6F6F6"
				onClickIcon={handleReverseTransaction}
				icon="Reverse"
			/>
			<Pagination
				totalRecords={totalRecords}
				pageSize={take}
				onPageChange={handlePageChange}
				currentSkip={skip}
			/>
			<ConfirmationModal
				isOpen={isOpen}
				onClose={onClose}
				onConfirm={confirmReverseTransaction}
				title="Confirm Reverse Transaction"
				message="Are you sure you want to reverse the transaction that caused this override?"
			/>
		</>
	);
}
