import React, { createContext, useContext } from "react";
import { reducer } from "../reducer";

const MarsContext = createContext();

export const initialState = {
	grid: {
		height: 10,
		width: 10,
		cellSide: 4,
	},
	trackMission: { movements: [], currentRover: null },
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

export const ContextProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return (
		<MarsContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</MarsContext.Provider>
	);
};

export const useCustomContext = () => useContext(MarsContext);
