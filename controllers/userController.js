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


// create new user account
router.post("/", async (req, res)=>{
	try{

		const newUser = await User.create(req.body);
		console.log(newUser);

		req.session.loggedIn = true
		req.session.username = req.body.username
	
		res.json({
			status: 200,
			data: true
		})

	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;