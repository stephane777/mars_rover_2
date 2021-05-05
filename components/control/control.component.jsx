import React from "react";
import { useCustomContext } from "../../store/ContextProvider";
import { PRIMARY, GREY_LIGHT_1, WHITE } from "../../constants/color";
import { upload_csv, last_mission } from "../../constants/url";

import { runRover, reset, setMessage, loadMovements } from "../../actions";

const Control = () => {
	const [csvFile, setCsvFile] = React.useState(null);
	const {
		state: {
			onMove,
			trackMission: { movements },
		},
		dispatch,
	} = useCustomContext();

	React.useEffect(() => {
		csvFile && handleUpload();
	}, [csvFile]);

	const handleFileChange = (e) => {
		setCsvFile(e.target.files[0]);
	};
	const handleRunMission = async () => {
		dispatch(runRover({ currentRover: 0 }));
	};
	const handleReset = () => {
		dispatch(reset());
	};

	const handleLastMission = async () => {
		try {
			const result = await fetch(last_mission, {
				method: "POST",
			});
			const response = await result.json();

			dispatch(loadMovements({ movements: response }));
		} catch (e) {
			dispatch(
				setMessage({ message_type: "error", message_content: e.toString() })
			);
		}
	};
	const handleUpload = async () => {
		try {
			const result = await fetch(upload_csv, {
				method: "POST",
				body: csvFile,
			});
			const response = await result.json();

			dispatch(loadMovements({ movements: response }));
			setCsvFile(null);
		} catch (e) {
			dispatch(
				setMessage({ message_type: "error", message_content: e.toString() })
			);
		}
	};
	return (
		<>
			<div className="row">
				<label htmlFor="upload-file" className="button" disabled={onMove}>
					UPLOAD FILE
				</label>
				<input
					hidden
					id="upload-file"
					onChange={handleFileChange}
					accept=".csv"
					type="file"
				></input>
			</div>
			<div className="row">
				<button
					disabled={!movements.length || onMove}
					onClick={handleRunMission}
					className="button"
				>
					RUN MISSION
				</button>
			</div>
			<div className="row">
				<button
					className="button"
					disabled={onMove}
					onClick={handleLastMission}
				>
					Load last mission
				</button>
			</div>
			<div className="row">
				<button
					className="button"
					disabled={onMove || !movements.length}
					onClick={handleReset}
				>
					Reset Mission
				</button>
			</div>
			<style jsx>{`
				.row {
					display: flex;
					flex-direction: row;
					margin: 1rem 0;
					width: 100%;
				}

				.button {
					text-align: center;
					background-color: ${WHITE};
					padding: 0.6rem;
					width: 100%;
					outline: none;
					color: ${PRIMARY};
					text-transform: uppercase;
					border: 1px solid transparent;
					border-radius: 5px;
					font-size: 1.4rem;
					font-weight: bold;
					margin: 0 1rem;
				}
				.button:hover {
					border: 1px solid ${WHITE};
					cursor: pointer;
					background-color: ${PRIMARY};
					color: ${WHITE};
				}
				.button:active {
					transform: translate(0.2rem);
				}
				.button[disabled] {
					background-color: lightgrey;
					color: ${GREY_LIGHT_1};
					box-shadow: none;
					border-color: lightgrey;
					cursor: not-allowed;
				}
			`}</style>
		</>
	);
};
export { Control };
