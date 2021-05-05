import React from "react";
import { useCustomContext } from "../../store/ContextProvider";
import {
	WHITE,
	PRIMARY,
	GREY_DARK_3,
	GREY_LIGHT_1,
} from "../../constants/color";
import { updateGrid, setMessage, resetMessage } from "../../actions";

const GridControl = () => {
	const [gridWidth, setGridWidth] = React.useState(10);
	const [gridHeight, setGridHeight] = React.useState(10);
	const {
		state: {
			onMove,
			grid: { width, height, cellSide },
		},
		dispatch,
	} = useCustomContext();

	const handleUpdateGrid = (e) => {
		e.preventDefault();

		if (gridWidth > 40 && cellSide === 4) {
			dispatch(
				updateGrid({ height: gridHeight, width: gridWidth, cellSide: 2 })
			);
		} else if (gridWidth <= 40 && cellSide < 4) {
			dispatch(
				updateGrid({ height: gridHeight, width: gridWidth, cellSide: 4 })
			);
		} else {
			dispatch(
				updateGrid({
					height: gridHeight,
					width: gridWidth,
					cellSide,
				})
			);
		}
	};
	const handleChangeWidth = (e) => {
		e.preventDefault();
		const { value } = e.target;
		if (value >= 10 && value <= 50) {
			setGridWidth(+value);
		} else {
			dispatch(
				setMessage({
					message_type: "error",
					message_content: "width should be between 10 and 50 included !",
				})
			);
			setTimeout(() => {
				dispatch(resetMessage());
			}, 1500);
		}
	};
	const handleChangeHeight = (e) => {
		e.preventDefault();
		const { value } = e.target;
		if (value >= 10 && value <= 50) {
			setGridHeight(+value);
		} else {
			dispatch(
				setMessage({
					message_type: "error",
					message_content: "height should be between 10 and 50 included !",
				})
			);
			setTimeout(() => {
				dispatch(resetMessage());
			}, 1500);
		}
	};
	return (
		<>
			<form
				className="grid_form"
				onSubmit={handleUpdateGrid}
				autoComplete="off"
			>
				<div className="row">
					<div className="column-label">Current Grid:</div>
					<div className="column-data">
						<span>{width}</span>&nbsp;*&nbsp;<span>{height}</span>
					</div>
				</div>
				<div className="row ">
					<div className="column-label">
						<label htmlFor="gridWidth" className="label">
							Grid Width:
						</label>
					</div>
					<div className="column-data ">
						<input
							type="number"
							id="gridWidth"
							onChange={handleChangeWidth}
							value={gridWidth}
							disabled={onMove}
						/>
					</div>
				</div>
				<div className="row ">
					<div className="column-label ">
						<label htmlFor="gridWidth" className="label">
							Grid Height:
						</label>
					</div>
					<div className="column-data ">
						<input
							type="number"
							id="gridHeight"
							onChange={handleChangeHeight}
							value={gridHeight}
							disabled={onMove}
						/>
					</div>
				</div>
				<div className="row ">
					<button
						disabled={onMove || (height == gridHeight && width === gridWidth)}
						className="button"
					>
						Update Grid
					</button>
				</div>
			</form>
			<style jsx>{`
				.row {
					display: flex;
					flex-direction: row;
					margin: 1rem 0;
					width: 100%;
				}
				.grid_form {
					display: flex;
					flex-direction: column;
					width: 100%;
					font-size: 1.4rem;
					color: ${WHITE};
				}
				.column-label {
					display: flex;
					align-items: center;
					margin: 0 1rem;
				}
				.column-data {
					display: flex;
					justify-content: center;
					margin: 0 1rem;
				}
				.label {
					font-size: 1.4rem;
					color: ${WHITE};
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
				input {
					text-transform: uppercase;
					font-size: 1.4rem;
					padding: 0.6rem;

					border: 1px solid ${GREY_DARK_3};
					text-align: center;
					width: 100%;
				}
				form .column-label {
					flex: 1;
				}
				form .column-data {
					flex: 2;
				}
			`}</style>
		</>
	);
};
export { GridControl };
