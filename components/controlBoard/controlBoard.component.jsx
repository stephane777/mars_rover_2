import React from "react";

import { WHITE, DARK_YELLOW, RED, DARK_ORANGE } from "../../constants/color";

import { GridControl } from "../gridControl";
import { Control } from "../control";
import { RoverControl } from "../roverControl";

const ControlBoard = () => {
	return (
		<>
			<div className="controlBoard-wrapper">
				<h1 className="heading">rovers control board</h1>
				<div className="control_heading">
					<div className="control_column">GRID</div>
					<div className="control_column">ROVERS</div>
					<div className="control_column">CONTROL</div>
				</div>
				<div className="control_board">
					<div className="control_column">
						<GridControl />
					</div>
					<div className="control_column">
						<RoverControl />
					</div>
					<div className="control_column flex_column">
						<Control />
					</div>
				</div>
			</div>
			<style jsx>
				{`
					.flex_column {
						flex-direction: column;
					}

					.control_board {
						display: flex;
						width: 120rem;
						flex-wrap: wrap;
					}
					.control_column {
						flex: 1;
						margin: 0 4rem;
						display: flex;
						justify-content: center;
						font-size: 2rem;
						font-weight: bold;
						color: ${DARK_ORANGE};
						flex-wrap: wrap;
					}
					.control_column:nth-child(1) {
						color: ${DARK_YELLOW};
					}
					.control_column:nth-child(2) {
						color: ${DARK_ORANGE};
					}
					.control_column:nth-child(3) {
						color: ${RED};
					}
					.control_heading {
						padding: 2rem;
						color: ${WHITE};
						min-width: 120rem;
						display: flex;
					}
					.heading {
						font-size: 4rem;
						font-weight: 700;
						text-transform: uppercase;
						background-image: linear-gradient(
							to right,
							${DARK_YELLOW},
							${DARK_ORANGE},
							${RED}
						);
						margin: 2rem 0 6rem 0;
						color: rgba(0, 0, 0, 0.2);
						background-clip: text;
						-webkit-background-clip: text;
					}

					.controlBoard-wrapper {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin: 3rem 0;
						width: 100%;
					}
					.column-label {
						display: flex;
						align-items: center;
					}
					.column-data {
						display: flex;
						justify-content: center;
					}

					@media only screen and (max-width: 576px) {
						.column-label {
							min-width: 8rem;
						}
						.column-data {
							min-width: 16rem;
						}
						.heading {
							font-size: 2rem;
						}
					}
					@media only screen and (max-width: 997px) {
						.control_board {
							display: flex;
							flex-direction: column;
							width: 60rem;
							flex-wrap: wrap;
						}
						.control_heading {
							display: none;
						}
						.column_control {
							margin: 0 10rem;
						}
					}
				`}
			</style>
		</>
	);
};

export { ControlBoard };
