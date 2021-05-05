import React from "react";
import { getCardinal } from "../../utils";
import { useCustomContext } from "../../store/ContextProvider";
import { WHITE, DARK_ORANGE, RED } from "../../constants/color";

const RoverControl = () => {
	const {
		state: {
			trackMission: { movements, currentRover },
			orders: { step },
		},
	} = useCustomContext();

	const activeRoverWithActiveStep = (orders, index) => {
		if (index === currentRover) {
			return orders.split("").map((order, i) =>
				i === step ? (
					<span key={i} style={{ color: WHITE }}>
						{order}
					</span>
				) : (
					<span key={i}>{order}</span>
				)
			);
		} else return orders;
	};
	return (
		<>
			<div className="row">
				<div className="rover_column num">Num</div>
				<div className="rover_column orders">Orders</div>
				<div className="rover_column direction">Direction</div>
				<div className="rover_column position">Position</div>
			</div>

			{movements.length > 0 &&
				movements.map((mvt, i) => (
					<div key={i} className={`row ${i === currentRover ? "active" : ""}`}>
						<div className="rover_column num">{i + 1}</div>
						<div className="rover_column orders">
							{activeRoverWithActiveStep(mvt.orders, i)}
						</div>
						<div className="rover_column direction">
							{getCardinal(mvt.position[2])}
						</div>
						<div className="rover_column position">{`X:${mvt.position[0]} Y:${mvt.position[1]}`}</div>
					</div>
				))}

			<style jsx>{`
				.row {
					display: flex;
					flex-direction: row;
					margin: 1rem 0;
					width: 100%;
					color: ${WHITE};
					font-size: 1.4rem;
					font-weight: normal;
				}
				.active {
					color: ${DARK_ORANGE};
				}
				.rover_column {
					display: flex;
					margin-right: 1rem;
					justify-content: flex-start;
					margin-right: 1rem;
					text-transform: uppercase;
					font-weight: bold;
				}

				.num {
					flex: 1;
				}
				.direction,
				.position {
					flex: 2;
				}
				.current_move {
					color: ${RED} !important;
				}
				.orders {
					flex: 4;
				}

				.label {
					font-size: 1.4rem;
					color: ${WHITE};
				}
			`}</style>
		</>
	);
};
export { RoverControl };
