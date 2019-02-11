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


//  ========== EXPORT ROUTER  ==========
module.exports = router;