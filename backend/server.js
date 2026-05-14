const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/scrape", async (req, res) => {
	const { url } = req.body;

	if (!url || !/^https?:\/\//.test(url)) {
		return res.status(400).json({
			success: false,
			error: "Invalid URL",
		});
	}

	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);

		const programs = [];

		$('section[class^="kierunki-studiow-item--"]').each((i, el) => {
			const name = $(el).find("h3").text().trim();

			const degreeRaw = $(el).find(".poziom-ksztalcenia").text().trim();

			let degreeType = "UNKNOWN";

			if (degreeRaw.includes("I stopień")) {
				degreeType = "I_STOPNIA";
			} else if (degreeRaw.includes("II stopień")) {
				degreeType = "II_STOPNIA";
			} else if (degreeRaw.includes("jednolite")) {
				degreeType = "JEDNOLITE";
			}

			let studyMode = "UNKNOWN";

			$(el)
				.find(".ks-icon")
				.each((_, icon) => {
					const title = $(icon).attr("title");

					if (title?.includes("stacjonarny")) {
						studyMode = "STACJONARNE";
					}

					if (title?.includes("niestacjonarny")) {
						studyMode = "NIESTACJONARNE";
					}
				});

			const description = $(el).find(".field-content").first().text().trim();

			programs.push({
				name,
				degreeType,
				studyMode,
				description,
			});
		});

		res.json({
			success: true,
			programs,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Failed",
		});
	}
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
