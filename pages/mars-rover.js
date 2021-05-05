import React from "react";
import Head from "next/head";
import { useCustomContext } from "../store/ContextProvider";

import { Grid } from "../components/grid";
import { ControlBoard } from "../components/controlBoard";
import { Message } from "../components/message";
import {
	startAnimation,
	moveForward,
	moveLeft,
	moveRight,
	setOrders,
	resetOrdersOrNextRover,
	setMessage,
	resetMessage,
} from "../actions";

import { getDegree } from "../utils";
import background from "../public/images/sky_background.jpg";

export default function App() {
	const { state, dispatch } = useCustomContext();
	const {
		grid: { height },
		trackMission: { movements, currentRover },
		message,
		orders: { string, step },
		orders,
	} = state;

	React.useEffect(() => {
		if (string && string.length > step) {
			if (isNextMoveNotAllowed()) {
				handleRoverMovingAwayFromGrid();
				return;
			}

			dispatch(startAnimation({ move: string[step] }));
			setTimeout(() => {
				switch (string[step]) {
					case "M":
						dispatch(moveForward());
						break;
					case "L":
						dispatch(moveLeft());
						break;
					case "R":
						dispatch(moveRight());
						break;
				}

				setTimeout(() => {
					if (step < string.length - 1) {
						dispatch(setOrders({ orders: { string, step: step + 1 } }));
					}
					if (string.length === step + 1) {
						dispatch(
							resetOrdersOrNextRover({
								next: movements.length > currentRover + 1,
							})
						);
					}
				}, 400);
			}, 600);
		}
	}, [orders]);

	const handleRoverMovingAwayFromGrid = () => {
		dispatch(
			setMessage({
				message_type: "error",
				message_content: "Rover is moving away from grid !",
			})
		);
		setTimeout(() => {
			dispatch(resetMessage());
		}, 1500);
	};

	// check if the next move is inside the Grid
	const isNextMoveNotAllowed = () => {
		const position = [...movements[currentRover].position];
		let isRoverMovingAwayFromGrid = false;
		const currentMove = orders.string[orders.step];
		if (currentMove !== "M") return;
		const degree = getDegree(position[2]);

		// We only care about the move forward, R or L won't change position only orientation

		switch (degree) {
			case 0:
				if (position[1] + 1 > height - 1) isRoverMovingAwayFromGrid = true;
				break;
			case 180:
				if (position[1] - 1 < 0) isRoverMovingAwayFromGrid = true;
				break;
			case 90:
				if (position[0] + 1 > height - 1) isRoverMovingAwayFromGrid = true;
				break;
			case 270:
				if (position[0] - 1 < 0) isRoverMovingAwayFromGrid = true;
				break;
			default:
				isRoverMovingAwayFromGrid = false;
		}
		return isRoverMovingAwayFromGrid;
	};

	return (
		<>
			<div className="app">
				<Head>
					<title>Mars Rover 2</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<ControlBoard />
					<div className="message_wrapper">
						{message.type && (
							<Message type={message.type} content={message.content} />
						)}
					</div>
					<Grid />
				</main>
			</div>
			<style jsx>{`
				.message_wrapper {
					height: 3rem;
				}
				main {
					min-height: 80vh;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					align-items: center;
					margin: 0 auto;
					background-image: url(${background});
					background-position: center;
					background-size: cover;
				}
			`}</style>
		</>
	);
}
