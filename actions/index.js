import actions from "../constants/actions";

export const moveForward = () => ({
	type: actions.MOVE_FORWARD,
});

export const moveRight = () => ({
	type: actions.MOVE_RIGHT,
});

export const moveLeft = () => ({
	type: actions.MOVE_LEFT,
});

export const startAnimation = (payload) => ({
	type: actions.START_ANIMATION,
	...payload,
});

export const setOrders = (payload) => ({
	type: actions.SET_ORDERS,
	...payload,
});

export const resetOrdersOrNextRover = (payload) => ({
	type: actions.RESET_ORDERS_OR_NEXT_ROVER,
	...payload,
});

export const reset = () => ({
	type: actions.RESET,
});

export const setMessage = (payload) => ({
	type: actions.SET_MESSAGE,
	...payload,
});

export const resetMessage = () => ({
	type: actions.RESET_MESSAGE,
});

export const runRover = (payload) => ({
	type: actions.RUN_ROVER,
	...payload,
});

export const loadMovements = (payload) => ({
	type: actions.LOAD_MOVEMENTS,
	...payload,
});

export const updateGrid = (payload) => ({
	type: actions.UPDATE_GRID,
	...payload,
});
