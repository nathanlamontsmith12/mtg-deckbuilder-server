// ========== IMPORTS ==========
// Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const request = require("superagent");

// Models
const User = require("../models/User");
const Card = require("../models/Card");
const Deck = require("../models/Deck");


// ========== SEARCH ROUTES ==========
router.post("/cards/name", async (req, res) => {
	try {

		const url = "https://api.magicthegathering.io/v1/cards?name=" + req.body.name.toString()

		const cards = await request
			.get(url)
			.set("accept", "json")

		res.json({
        	status: 200,
        	data: cards
      	});

	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;