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



// Add card route: 
router.post("/", async (req, res) => {

	try {

		const cardsInput = req.body.cardsToAdd.map( (card) => { 
			return ({data: card, apid: card.id, ownerId: req.body.userId})
		})

		const allCards = await Card.find();

		// ONLY add the cards to the Database if those cards are not already in there: 
		let cardsToAddDB = cardsInput;

		if (cardsToAddDB) {
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



// delete card from USER's stuff that has it: 
router.post("/remove", async (req, res)=>{
	try {

		const cardToRemoveId = req.body.cardToRemove._id;
		const foundUser = await User.findById(req.body.userId);

		console.log("USER: ", foundUser);
		console.log("CARDTOREMOVE ID: ", cardToRemoveId);

		// find all the places where the card could be on that USER: 

		// first, target the decks (in DB) that have card and belong to user, and remove the card, and save;
		// then, replace the old decks with the updated decks on the user (that have the card removed); 
		// THEN, remove the card from the user's cardpool, and save!


		const userDecksWithCard = req.body.cardToRemove.decks;
		console.log("User Decks: ", req.body.cardToRemove.decks);


		if (userDecksWithCard && userDecksWithCard.length > 0) {

			const deckIds = userDecksWithCard.map((deck) => {
				return deck.deckId
			})

			const updatedDecks = await Deck.update( {_id: {$in: [deckIds]}}, {$pull: {"deck.card": { _id: cardToRemoveId } }}, {new: true, multi: true});

			console.log("UPDATED DECKS: ", updatedDecks);
		
			
			// deck documents updated — now the data that lives on the user: 

			// cycle -- will be making changes to an array within the array we are cycling over, so we use a loop: 
			for (let k = 0; k < foundUser.decks.length; k++) {

				const thisDeck = foundUser.decks[k];

				// capture the current cards in current deck (foundUser.decks[k])
				const thisDecksCards = thisDeck.cards; 

				// filter 
				const filteredCards = thisDecksCards.filter((card)=>{
					if (card._id.toString() === cardToRemoveId) {
						return false
					} else {
						return true 
					}
				})

				// reassign the cards 
				thisDeck.cards = filteredCards;
			}
		}

		// Finally, we remove the card from the user's cardpool. This is comparatively simple:
		// make new array of filtered cards... 
		const newCardpool = foundUser.cardpool.filter((card)=>{
			// console.log(card._id);
			// console.log(cardToRemoveId);
			if (card._id.toString() === cardToRemoveId) {
				return false
			} else {
				return true
			}
		})

		// and reassign
		console.log("NEW CARDPOOL: ", newCardpool);
		foundUser.cardpool = newCardpool


		// WHEW -- now we just save the user: 
		const updatedUser = await foundUser.save();

		console.log("UPDATED USER: ", updatedUser);

		res.json({
			status: 200,
			data: {action: "updated decks in DB, and user"}
		})
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;

















