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

// update deck: 
router.patch("/edit/:id", async (req, res) => {

	try {

		const update = {
			ownerId: req.body.userId,
			name: req.body.name,
			description_short: req.body.description_short,
			description_long: req.body.description_long
		}

		console.log("UPDATE: ", update);

		// update deck in DB: 
		const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, update, {new: true} );

		console.log("UPDATED DECK: ", updatedDeck);

		// update on User: 

		const foundUser = await User.findById(req.body.userId);

		console.log("FOUND USER: ", foundUser);

		const targetIndex = foundUser.decks.findIndex((deck)=>{
			if (deck._id.toString() === req.params.id) {
				return true
			} else {
				return false 
			}
		})

		foundUser.decks.splice(targetIndex, 1, updatedDeck);

		const updatedUser = await foundUser.save();

		console.log("UPDATED USER: ", updatedUser);

		res.json({
			status: 200,
			data: {action: "Updated Deck, user with Deck"}
		})
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;


