// ========== IMPORTS ==========
// Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Models
const User = require("../models/User");
const Card = require("../models/Card");
const Deck = require("../models/Deck");


// ========== CARD ROUTES ==========
// test: 
router.get("/", async (req, res) => {
	try {
		console.log("Card", req.session);
		res.send("Card Route /card is working")
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})

router.post("/", async (req, res) => {

	try {

		const cardsInput = req.body.cardsToAdd.map( (card) => { 
			return ({data: card, apid: card.id, ownerId: req.body.userId})
		})

		const allCards = await Card.find();

		let cardsToAdd = cardsInput;


		if (allCards.length > 0 ) {

			const checkCardApids = allCards.map((card) => {
				return card.apid
			});

			cardsToAdd = cardsInput.filter((card) => {
				if (checkCardApids.includes(card.apid)) {
					return false
				} else {
					return true 
				}
			})			
		}


		if (cardsToAdd) {
			const newCards = await Card.create(cardsToAdd);

			const foundUser = await User.findById(req.body.userId);

			newCards.forEach( (card) => {
				foundUser.cardpool.push(card);
			} )

			const updatedUser = await foundUser.save();
		}

		res.send("OK");

	} catch (err) {
		console.log(err);
		res.send(err);
	}

})

//  ========== EXPORT ROUTER  ==========
module.exports = router;