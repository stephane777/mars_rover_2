import { reducer } from "./index";
import {
	moveForward,
	moveRight,
	moveLeft,
	startAnimation,
	setOrders,
	resetOrdersOrNextRover,
	reset,
	setMessage,
	resetMessage,
	runRover,
	loadMovements,
	updateGrid,
} from "../actions";
import { initialState } from "../store/ContextProvider";
import actions from "../constants/actions";

describe("test reducer", () => {
	const mockMovements = [
		{ position: [2, 4, 0], orders: "LMLMLMLMM" },
		{ position: [0, 2, 90], orders: "MMRMMRMRRM" },
	];

	const mockState = {
		grid: {
			height: 10,
			width: 10,
			cellSide: 4,
		},
		trackMission: { movements: mockMovements, currentRover: 0 },
		onMove: false,
		message: {
			type: "",
			content: "",
		},
		animation: "",
		orders: {
			string: "",
			step: 0,
		},
	};

	it("should populate the state with initialState", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});
	it("should move forward", () => {
		expect(
			reducer(mockState, {
				type: actions.MOVE_FORWARD,
			})
		).toEqual({
			...mockState,
			trackMission: {
				movements: [
					{ position: [2, 5, 0], orders: "LMLMLMLMM" },
					{ position: [0, 2, 90], orders: "MMRMMRMRRM" },
				],
				currentRover: 0,
			},
		});
	});
	it("should move right", () => {
		expect(
			reducer(mockState, {
				type: actions.MOVE_RIGHT,
			})
		).toEqual({
			...mockState,
			trackMission: {
				movements: [
					{ position: [2, 4, 90], orders: "LMLMLMLMM" },
					{ position: [0, 2, 90], orders: "MMRMMRMRRM" },
				],
				currentRover: 0,
			},
		});
	});
	it("should move left", () => {
		expect(
			reducer(mockState, {
				type: actions.MOVE_LEFT,
			})
		).toEqual({
			...mockState,
			trackMission: {
				movements: [
					{ position: [2, 4, -90], orders: "LMLMLMLMM" },
					{ position: [0, 2, 90], orders: "MMRMMRMRRM" },
				],
				currentRover: 0,
			},
		});
	});

	it("should LOAD the movements", () => {
		expect(
			reducer(initialState, {
				type: actions.LOAD_MOVEMENTS,
				movements: mockMovements,
			})
		).toEqual({
			...initialState,
			trackMission: {
				...initialState.trackMission,
				movements: [
					{ position: [2, 4, 0], orders: "LMLMLMLMM" },
					{ position: [0, 2, 90], orders: "MMRMMRMRRM" },
				],
			},
			message: {
				type: "success",
				content: "Movements successfully loaded",
			},
		});
	});

	it("should Run a rover", () => {
		expect(
			reducer(mockState, {
				type: actions.RUN_ROVER,
				currentRover: 0,
			})
		).toEqual({
			...mockState,
			trackMission: {
				...mockState.trackMission,
				currentRover: 0,
			},
			orders: {
				...mockState.orders,
				string: mockState.trackMission.movements[0].orders,
			},
			message: {
				type: "success",
				content: "Mission start !",
			},
		});
	});
	it("should update the Grid", () => {
		expect(
			reducer(initialState, {
				type: actions.UPDATE_GRID,
				height: 15,
				width: 20,
				cellSide: 2,
			})
		).toEqual({
			...initialState,
			grid: { ...initialState.grid, height: 15, width: 20, cellSide: 2 },
			position: [0, 0, 0],
			message: {
				type: "success",
				content: `Grid updated now ${20}*${15}`,
			},
		});
	});
});
