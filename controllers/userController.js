// ========== IMPORTS ==========
// Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");


// ========== AUTHENTICATION FUNCTIONS ==========

function logInSession (username) {
	console.log("LOG IN SESSION: ", username);
}

function logOutSession () {
	console.log("LOG OUT SESSION");
}


// ========== AUTHENTICATION ROUTES ==========

// check on user (for Log In: )
router.post("/login", async (req, res)=> {
	try {

		console.log(req.body);

		// check in DB
		const foundUser = await User.findOne({
			username: req.body.username
		})

		if (foundUser.password === req.body.password) {
			logInSession(foundUser.username);
			res.send({
				status: 200,
				data: true
			})
		} else {
			logOutSession();
			res.send({
				status: 200,
				data: false
			})
		}

	} catch (err) {
		logOutSession();
		console.log(err);
		res.send(err);
	}
})


// ========== USER CRUD ROUTES ==========

// create new user account
router.post("/", async (req, res)=>{
	try{

		const newUser = await User.create(req.body);
		console.log(newUser);

		logInSession(req.body.username);
	
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