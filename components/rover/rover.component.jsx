import React from "react";
import rover from "../../public/images/rover.png";
import { useCustomContext } from "../../store/ContextProvider";

const Rover = ({ position, isActiveRover }) => {
	const {
		state: {
			animation,
			grid: { height, cellSide },
		},
	} = useCustomContext();

	const getTransformProperty = () => {
		const degree = position[2];

		if (isActiveRover && animation.length > 0) {
			const move = animation;
			if (move === "M")
				return `rotate(${degree}deg) translateY(-${cellSide}rem)`;
			if (["R", "L"].includes(move)) {
				return move === "R"
					? `rotate(${degree + 90}deg)`
					: `rotate(${degree - 90}deg)`;
			}
		} else {
			return `rotate(${degree}deg)`;
		}
	};

	const getTopCssProperty = () => {
		// offsetTop help to center the rover regarding cellSide
		const offsetTop = cellSide === 4 ? 3 : 1.5;
		return (
			(position && height * cellSide - offsetTop - position[1] * cellSide) ||
			height * cellSide - offsetTop
		);
	};

	const getLeftCssProperty = () => {
		const offsetLeft = cellSide === 4 ? 1 : 0.5;
		return (position && offsetLeft + position[0] * cellSide) || offsetLeft;
	};
	const getRoverSideCssProperty = () => {
		return cellSide === 4 ? "2" : "1";
	};
	return (
		<>
			<img src={rover} alt="rover"></img>
			<style jsx>{`
				img {
					position: absolute;
					top: ${getTopCssProperty()}rem;
					left: ${getLeftCssProperty()}rem;
					width: ${getRoverSideCssProperty()}rem;
					height: ${getRoverSideCssProperty()}rem;
					transition: 0.4s;
					transform: ${getTransformProperty()};
				}
				@media only screen and (max-width: 576px) {
					img {
						top: ${(position && 32 - position[1] * 3.5) || 32}rem;
						left: ${(position && 1 + position[0] * 3.5) || 1}rem;
					}
				}
			`}</style>
		</>
	);
};
export { Rover };
