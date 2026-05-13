const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/scrape", async (req, res) => {
	const { url } = req.body;

	try {
		const response = await axios.get(url);

		const $ = cheerio.load(response.data);

		const programs = [];

		$('section[class^="kierunki-studiow-item--"]').each((i, el) => {
			const name = $(el).find("h3").text().trim();

			programs.push({
				name,
			});
		});

		res.json({
			success: true,
			programs,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			error: "Failed",
		});
	}
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
