const mongoose = require("mongoose");
const Card = require("./Card");
const Deck = require("./Deck");

const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	cardpool: [Card.schema],
	decks: [Deck.schema],
	faveCards: [String],  // * 
	hiddenCards: [String], // ** 
	admin: {type: Boolean, default: false},
	registered: {type: Date, required: true}
})

// * Array of card IDs
// ** Array of card IDs to keep in the user's cardpool, but remove from view 

const User = mongoose.model("users", userSchema);

module.exports = User;