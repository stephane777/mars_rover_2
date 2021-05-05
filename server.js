const express = require("express");
const next = require("next");
const fs = require("fs");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.post("/api/upload_csv", (req, res) => {
		return processFile(req, res);
	});
	server.post("/api/last_mission", (_, res) => readFile(res));
	server.all("*", (req, res) => handle(req, res));

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> server is listening on http://localhost:${port}`);
	});
});

const processFile = (req, res) => {
	try {
		let writeStream = fs.createWriteStream(
			"./public/assets/file/orders_to_rovers.csv"
		);
		req.pipe(writeStream);
		req.on("end", () => readFile(res));
	} catch (e) {
		console.log(`processFile`);
		console.log(e);
	}
};

const readFile = (res) => {
	try {
		fs.readFile(
			"./public/assets/file/orders_to_rovers.csv",
			"utf8",
			(err, data) => {
				if (data) {
					res.send(formatMovement(data));
				} else {
					console.log(err);
				}
			}
		);
	} catch (e) {
		console.log(`readFile`);
		console.log(e);
	}
};

const formatMovement = (data) => {
	const roverOrders = data.trim().split("\n");
	return roverOrders.map((mvt, i) => {
		const [pos, ord] = mvt.split("|");
		const position = pos
			.split(" ")
			.map((value, i) =>
				i === 2 ? getDegreeFromCardinal(value) : Number(value)
			);
		const orders = ord
			.toUpperCase()
			.split("")
			.filter((order, i) => /[MLR]/.test(order))
			.join("");
		return {
			position,
			orders,
		};
	});
};

const getDegreeFromCardinal = (cardinal) => {
	const cardinalToDegree = {
		N: 0,
		E: 90,
		W: 270,
		S: 180,
	};
	return cardinalToDegree[cardinal];
};
