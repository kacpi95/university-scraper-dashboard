const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dataMock = {
	university: "AGH",
	programs: [
		{
			name: "Informatyka",
			degreeType: "I_stopnia",
			mode: "Stacjonarnie",
		},
	],
};

app.post("/scrape", (req, res) => {
	const { url } = req.body;

	console.log("Scrap", url);

	res.json(dataMock);
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
