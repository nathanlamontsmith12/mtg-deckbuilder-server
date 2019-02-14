// ========== IMPORTS ==========
// Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Models
const User = require("../models/User");
const Card = require("../models/Card");
const Deck = require("../models/Deck");


// ========== DECK ROUTES ==========
// test: 
router.get("/", async (req, res) => {
	try {
		console.log("Deck", req.session);
		res.send("Deck Route /deck is working")
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


// create new deck: 
router.post("/", async (req, res)=>{

	try {
		const newDeck = {
			name: req.body.name,
			ownerId: req.body.userId,
			description_short: req.body.description_short,
			description_long: req.body.description_long
		}

		const createdDeck = await Deck.create(newDeck);

		const foundUser = await User.findById(req.body.userId);

		foundUser.decks.push(createdDeck);

		await foundUser.save()

		res.json({
			status: 200,
			data: createdDeck
		})
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})

//  ========== EXPORT ROUTER  ==========
module.exports = router;