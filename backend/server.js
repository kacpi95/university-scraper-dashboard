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

		const title = $("title").text();

		res.json({
			success: true,
			title,
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
