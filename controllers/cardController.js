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
		res.send("Card Route /card is working")
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;