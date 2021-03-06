const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
	data: {type: Object, required: true},
	apid: {type: String, required: true}, // *
	ctags: [String], // ** 
	ownerId: {type: String, required: true}, // ***
	decks: [{deckId: String, copies: Number}],
	fave: {type: Boolean, default: false},
	hide: {type: Boolean, default: false}
})

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;

// * ID that the API uses in reference to the card 
// ** Array of the tags for cards ("ctags") that a user has added to this card
// *** ID of the user in whose cardpool this card lives