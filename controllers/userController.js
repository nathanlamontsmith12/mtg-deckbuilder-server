// ========== IMPORTS ==========
// Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");
const Card = require("../models/Card");
const Deck = require("../models/Deck");


// ========== USER ROUTES ==========

// test: 
router.get("/", async (req, res) => {
	try {
		console.log("User", req.session);
		res.send("User Route /user is working")
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;