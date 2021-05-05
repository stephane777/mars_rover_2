export const getDegree = (degree) => {
	const deg = degree % 360;
	return deg >= 0 ? deg : deg + 360;
};

export const getCardinal = (degree) => {
	switch (getDegree(degree)) {
		case 0:
			return "North";

		case 90:
			return "East";

		case 180:
			return "South";

		case 270:
			return "West";

		default:
			return "North";
	}
};
