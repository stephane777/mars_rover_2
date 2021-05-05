import React from "react";
import marsImg from "../../public/images/mars.jpg";
import { Rover } from "../rover";

import PropTypes from "prop-types";
import { useCustomContext } from "../../store/ContextProvider";

const Grid = () => {
	const {
		state: {
			trackMission,
			grid: { height, width, cellSide },
		},
	} = useCustomContext();

	return (
		<>
			<div className="grid_wrapper">
				<div className="grid">
					{trackMission.movements.length &&
						trackMission.movements.map((mvt, i) => (
							<Rover
								key={`${mvt.orders}${i}`}
								position={mvt.position}
								isActiveRover={trackMission.currentRover === i}
							/>
						))}
					<div className="cardinal_N cardinal">N</div>
					<div className="cardinal_S cardinal">S</div>
					<div className="cardinal_E cardinal">E</div>
					<div className="cardinal_W cardinal">W</div>
				</div>
			</div>
			<style jsx>
				{`
					.cardinal {
						position: absolute;
						transform: translate(-50%, -50%);
						color: rgba(0, 0, 0, 0.4);
						font-weight: bold;
					}
					.cardinal_N {
						top: ${cellSide / 2}rem;
						left: 50%;
						font-size: ${(cellSide * 2) / 3}rem;
					}
					.cardinal_S {
						bottom: -${cellSide === 4 ? 1 : 0.5}rem;
						left: 50%;
						font-size: ${(cellSide * 2) / 3}rem;
					}
					.cardinal_E {
						top: 50%;
						right: 0;
						font-size: ${(cellSide * 2) / 3}rem;
					}
					.cardinal_W {
						top: 50%;
						left: ${cellSide === 4 ? 2 : 1}rem;
						font-size: ${(cellSide * 2) / 3}rem;
					}
					.grid_wrapper {
						position: relative;
						box-sizing: content-box;
						background-image: url(${marsImg});
						display: flex;
						flex-direction: row-reverse;
						flex-wrap: wrap;
						width: ${width * cellSide}rem;
						height: ${height * cellSide}rem;
						margin: 3rem 0;
					}
					.grid {
						position: absolute;
						top: 0;
						left: 0;
						width: ${width * cellSide}rem;
						height: ${height * cellSide}rem;
						background-size: ${cellSide}rem ${cellSide}rem;
						background-image: linear-gradient(
								to right,
								#7d7d7d 1px,
								transparent 1px
							),
							linear-gradient(to bottom, #7d7d7d 1px, transparent 1px);
					}

					@media only screen and (max-width: 576px) {
						.grid_wrapper {
							height: 35rem;
							width: 35rem;
						}
						.grid {
							height: 35rem;
							width: 35rem;
							background-size: 3.5rem 3.5rem;
						}
					}
				`}
			</style>
		</>
	);
};
Grid.prototype = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	animation: PropTypes.string.isRequired,
};
export { Grid };
