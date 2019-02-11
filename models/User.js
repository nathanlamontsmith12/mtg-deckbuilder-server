const mongoose = require("mongoose");
const Card = require("./Card");
const Deck = require("./Deck");

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	cardpool: [Card.schema],
	decks: [Deck.schema],
	faveCards: [String],  // * 
	hiddenCards: [String], // ** 
	admin: {type: Boolean, default: false},
	registered: Date
})

// * Array of card IDs
// ** Array of card IDs to keep in the user's cardpool, but remove from view 

const User = mongoose.model("users", userSchema);

module.exports = User;