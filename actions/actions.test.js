import actions from "../constants/actions";

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
} from "./index";

const mockSetMessage = {
	message_type: "error",
	message_content: "Rover is moving away from grid !",
};
const mockSetOrders = { orders: { string: "LMLFFMM", step: 4 } };

const response = [
	{ position: [2, 4, 0], orders: "LMLMLMLMM" },
	{ position: [0, 2, 90], orders: "MMRMMRMRRM" },
];

const movkMovements = { movements: response };
const mockUpdateGrid = { height: 3, width: 5, cellSide: 4 };

describe("test the actions creator", () => {
	it("should create an action with moveForward", () => {
		expect(moveForward()).toEqual({
			type: actions.MOVE_FORWARD,
		});
	});
	it("should create an action with moveRight", () => {
		expect(moveRight()).toEqual({
			type: actions.MOVE_RIGHT,
		});
	});
	it("should create an action with moveLeft", () => {
		expect(moveLeft()).toEqual({
			type: actions.MOVE_LEFT,
		});
	});
	it("should create an action with startAnimation", () => {
		expect(startAnimation({ move: "M" })).toEqual({
			type: actions.START_ANIMATION,
			move: "M",
		});
	});
	it("should create an action with setOrders", () => {
		expect(setOrders(mockSetOrders)).toEqual({
			type: actions.SET_ORDERS,
			orders: {
				string: "LMLFFMM",
				step: 4,
			},
		});
	});
	it("should create an action with resetOrdersOrNextRover", () => {
		expect(resetOrdersOrNextRover({ next: true })).toEqual({
			type: actions.RESET_ORDERS_OR_NEXT_ROVER,
			next: true,
		});
	});
	it("should create an action with reset", () => {
		expect(reset()).toEqual({
			type: actions.RESET,
		});
	});
	it("should create an action with setMessage", () => {
		expect(setMessage(mockSetMessage)).toEqual({
			type: actions.SET_MESSAGE,
			message_type: "error",
			message_content: "Rover is moving away from grid !",
		});
	});
	it("should create an action with resetMessage", () => {
		expect(resetMessage()).toEqual({
			type: actions.RESET_MESSAGE,
		});
	});
	it("should create an action with runRover", () => {
		expect(runRover({ currentRover: 3 })).toEqual({
			type: actions.RUN_ROVER,
			currentRover: 3,
		});
	});
	it("should create an action with loadMovements", () => {
		expect(loadMovements(movkMovements)).toEqual({
			type: actions.LOAD_MOVEMENTS,
			movements: [
				{ position: [2, 4, 0], orders: "LMLMLMLMM" },
				{ position: [0, 2, 90], orders: "MMRMMRMRRM" },
			],
		});
	});
	it("should create an action with updateGrid", () => {
		expect(updateGrid(mockUpdateGrid)).toEqual({
			type: actions.UPDATE_GRID,
			height: 3,
			width: 5,
			cellSide: 4,
		});
	});
});
