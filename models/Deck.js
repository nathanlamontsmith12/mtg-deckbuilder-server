const mongoose = require("mongoose");
const Card = require("./Card");

const deckSchema = mongoose.Schema({
	name: {type: String, required: true},
	ownerId: {type: String, required: true},
	description_short: String,
	description_long: String,
	dtags: [String], // *
	cards: [Card.schema],
	copies: [{cardId: String, copies: Number}]	
})

const Deck = mongoose.model("decks", deckSchema);

module.exports = Deck;

// * Array of the tags for decks ("dtags") that a user has added to this card