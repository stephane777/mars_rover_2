import { initialState } from "../store/ContextProvider";

export const reducer = (state = initialState, action) => {
	const getDegree = (degree) => {
		const deg = degree % 360;
		return deg >= 0 ? deg : deg + 360;
	};

	const getNewPosition = (pos) => {
		const new_pos = pos.map((axis, i) => {
			// Grid x direction
			const degree = getDegree(pos[2]);
			if (!i) {
				return degree === 90 ? axis + 1 : degree === 270 ? axis - 1 : axis;
				// Grid y direction
			} else if (i === 1) {
				return degree === 0 ? axis + 1 : degree === 180 ? axis - 1 : axis;
			} else {
				return axis;
			}
		});

		return new_pos;
	};

	switch (action.type) {
		case "MOVE_FORWARD":
			return {
				...state,
				animation: "",
				trackMission: {
					...state.trackMission,
					movements: state.trackMission.movements.map((mvt, i) => {
						if (i === state.trackMission.currentRover) {
							return {
								...mvt,
								position: getNewPosition(mvt.position),
							};
						} else return mvt;
					}),
				},
			};
		case "MOVE_RIGHT":
			return {
				...state,
				animation: "",
				trackMission: {
					...state.trackMission,
					movements: state.trackMission.movements.map((mvt, i) => {
						if (i === state.trackMission.currentRover) {
							return {
								...mvt,
								position: [...mvt.position.slice(0, 2), mvt.position[2] + 90],
							};
						} else return mvt;
					}),
				},
			};
		case "MOVE_LEFT":
			return {
				...state,
				animation: "",
				trackMission: {
					...state.trackMission,
					movements: state.trackMission.movements.map((mvt, i) => {
						if (i === state.trackMission.currentRover) {
							return {
								...mvt,
								position: [...mvt.position.slice(0, 2), mvt.position[2] - 90],
							};
						} else return mvt;
					}),
				},
			};
		case "LOAD_MOVEMENTS":
			return {
				...state,
				trackMission: {
					...state.trackMission,
					movements: action.movements,
				},
				message: {
					type: "success",
					content: "Movements successfully loaded",
				},
			};
		case "RUN_ROVER":
			return {
				...state,
				trackMission: {
					...state.trackMission,
					currentRover: action.currentRover,
				},
				orders: {
					...state.orders,
					string: state.trackMission.movements[action.currentRover].orders,
				},
				message: {
					type: "success",
					content: "Mission start !",
				},
			};
		case "UPDATE_GRID":
			return {
				...state,
				position: [0, 0, 0],
				grid: {
					height: action.height,
					width: action.width,
					cellSide: action.cellSide,
				},
				message: {
					type: "success",
					content: `Grid updated now ${action.width}*${action.height}`,
				},
			};

		case "SET_MESSAGE":
			return {
				...state,
				message: {
					type: action.message_type,
					content: action.message_content,
				},
				orders: {
					string: "",
					step: 0,
				},
			};
		case "RESET_MESSAGE":
			return {
				...state,
				message: { type: "", content: "" },
			};
		case "START_ANIMATION":
			return {
				...state,
				onMove: true,
				animation: action.move,
			};
		case "SET_ORDERS":
			return {
				...state,
				orders: {
					string: action.orders.string,
					step: action.orders.step,
				},
			};
		case "RESET_ORDERS_OR_NEXT_ROVER":
			return {
				...state,
				onMove: false,
				trackMission: {
					...state.trackMission,
					currentRover: action.next ? state.trackMission.currentRover + 1 : "",
				},
				orders: {
					string: action.next
						? state.trackMission.movements[state.trackMission.currentRover + 1]
								.orders
						: "",
					step: 0,
				},
				message: {
					type: action.next ? "" : "success",
					content: action.next
						? ""
						: "Congratulations mission to mars was a success !",
				},
			};
		case "RESET":
			return {
				...state,
				grid: {
					width: 10,
					height: 10,
					cellSide: 4,
				},
				trackMission: {
					movements: [],
					currentRover: null,
				},
				message: {
					type: "info",
					content: "Reset mission successful !",
				},
			};
		default:
			return state;
	}
};
