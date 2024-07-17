import { useEffect, useState } from "react";
import IListBatch from "../../../lib/interfaces/batch/IListBatch";
import { deleteAllExpiredBatches, getAllPerishedBatches } from "../../../services/AdminService";
import { format } from "date-fns";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import { deleteBatchById, getExpiredBatchByid } from "../../../services/BatchService";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import Pagination from "../../../components/Pagination/Pagination";
import { ConfirmationModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

const orderOptions = ["Id", "Price", "Quantity", "Total Value"];

export function ExpiredBatchesPage() {
	const [expiredBatches, setExpiredBatches] = useState<IListBatch[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<{
		id: number | null;
		message: string;
		onConfirm: () => void;
	} | null>(null);

	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("adminRoute")
		setActivatedTag("listExpiredBatches")
	})

	const handleDeleteBatch = async (id: number) => {
		setModalContent({
			id,
			message: "Are you sure you want to delete this batch?",
			onConfirm: async () => {
				try {
					await deleteBatchById(id);
					setExpiredBatches((prevData) => prevData.filter((item) => item.id !== id));
				} catch (error) {
					setErrorMessage(parseErrorMessage(error));
				} finally {
					setIsModalOpen(false);
					setModalContent(null);
				}
			},
		});
		setIsModalOpen(true);
	};

	const handleDeleteAll = () => {
        setModalContent({
            id: null,
            message: "Are you sure you want to delete all batches?",
            onConfirm: async () => {
                try {
                    await deleteAllExpiredBatches();
                    setExpiredBatches([]);
                    setTotalRecords(0);
                } catch (error) {
                    setErrorMessage(parseErrorMessage(error));
                } finally {
                    setIsModalOpen(false);
                    setModalContent(null);
                }
            }
        });
        setIsModalOpen(true);
    };

	const onSearchChange = async (value: string) => {
		if (value === "") {
			setSkip(0);
			fetchExpiredBatches();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const batch = await getExpiredBatchByid(id);
					batch.formattedExpiryDate = batch.expiryDate
						? format(new Date(batch.expiryDate), "dd/MM/yyyy HH:mm:ss")
						: "N/A";
					setExpiredBatches(batch ? [batch] : []);
				} catch (error: any) {
					setExpiredBatches([]);
				}
			}
		}
	};

	const fetchExpiredBatches = async () => {
		try {
			const data = await getAllPerishedBatches(skip, take, orderOption, isAscending);
			const formattedData = data.records.map((item) => ({
				...item,
				formattedExpiryDate: item.expiryDate
					? format(new Date(item.expiryDate), "dd/MM/yyyy HH:mm:ss")
					: "N/A",
			}));
			setExpiredBatches(formattedData);
			setTotalRecords(data.totalRecords);
		} catch (error) {
			setErrorMessage(parseErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchExpiredBatches();
	}, [skip, take, orderOption, isAscending]);

	const handlePageChange = (newSkip: number) => {
		setSkip(newSkip);
	};

	const handleOrderSelect = (option: string) => {
		setOrderOption(option);
	};

	const handleDirectionSelect = (option: boolean) => {
		setIsAscending(option);
	};

	if (loading) return <Loading />;
	if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;

	return (
		<>
			<SearchBar
				searchMessage=""
				onSearchChange={onSearchChange}
				orderOptions={orderOptions}
				onDirectionChange={handleDirectionSelect}
				onOptionChange={handleOrderSelect}
				onClick={handleDeleteAll}
				buttonText="Delete all"
			/>
			<FlexibleTable
				data={expiredBatches}
				keysBlackList={["expiryDate"]}
				size={"lg"}
				variant={"striped"}
				bgColor="white"
				thColor="#F6F6F6"
				onClickIcon={handleDeleteBatch}
			/>
			<Pagination
				totalRecords={totalRecords}
				pageSize={take}
				onPageChange={handlePageChange}
				currentSkip={skip}
			/>
			{modalContent && (
				<ConfirmationModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onConfirm={modalContent.onConfirm}
					title="Confirm Deletion"
					message={modalContent.message}
				/>
			)}
		</>
	);
}
