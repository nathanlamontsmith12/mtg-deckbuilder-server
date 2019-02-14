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


		// ONLY add the cards to the Database if those cards are not already in there: 
		if (allCards.length > 0 ) {

			const allCards = await Card.find();

			let cardsToAddDB = cardsInput;

			const checkCardApidsDB = allCards.map((card) => {
				return card.apid
			});

			cardsToAddDB = cardsInput.filter((card) => {
				if (checkCardApidsDB.includes(card.apid)) {
					return false
				} else {
					return true 
				}
			})			
		}


		if (cardsToAddDB) {
			const newCards = await Card.create(cardsToAddDB); 
		}


		// find User: 
		const foundUser = await User.findById(req.body.userId);


		// Now, add the cards to the User's cardpool -- but only if they aren't there already: 
		// first, get an array of the APIDs: 
		const checkCardApidsUser = foundUser.cardpool.map((card)=>{
			return card.apid
		})

		const cardsToAddUser = cardsInput.filter((card)=>{
			if (checkCardApidsUser.includes(card.apid)){
				return false
			} else {
				return true
			}
		})

		if (cardsToAddUser) {
			cardsToAddUser.forEach( (card) => {
				foundUser.cardpool.push(card);
			} )

			const updatedUser = await foundUser.save();			
		}

		// send response: 
		res.send("OK");

	} catch (err) {
		console.log(err);
		res.send(err);
	}

})

//  ========== EXPORT ROUTER  ==========
module.exports = router;