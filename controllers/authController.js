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


// ========== AUTHENTICATION FUNCTIONS ==========

function logInSession (username) {
	req.session.loggedIn = true
	req.session.username = username
}

function logOutSession () {
	req.session.destroy();
	// Other code for log out? 
}


// ========== AUTHENTICATION ROUTES ==========

// test: 
router.get("/", async (req, res) => {
	try {
		console.log("Auth", req.session);
		res.send("Authentication Route /auth is working")
	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


// check on user (for Log In: )
router.post("/", async (req, res)=> {
	try {
		// check in DB

		// if ... 
		logInSession();

		// else ...
		logOutSession();
	} catch (err) {
		console.log(err);
		res.send(err);
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;