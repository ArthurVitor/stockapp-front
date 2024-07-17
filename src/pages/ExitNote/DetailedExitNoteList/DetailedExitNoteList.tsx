import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetExitNoteById } from "../../../services/ExitNoteService";
import { DetailedView } from "../../../components/DetailedView/DetailedView";
import { IListExitNote } from "../../../lib/interfaces/exitNote/IListExitNote";

export function DetailedExitNoteList() {
	const { exitNoteId } = useParams();
	const [exitNote, setExitNote] = useState<IListExitNote>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const _exitNote = await GetExitNoteById(Number(exitNoteId));
				setExitNote(_exitNote);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [exitNoteId]);

	return (
		<DetailedView
			dependencies={[exitNote?.batches || []]}
			dependenciesTitles={["Batches"]}
			entity={exitNote || {}}
			keysBlackList={["batches"]}
			title="ExitNote"
		/>
	);
}
