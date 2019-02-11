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
	// other code 
}

function logOutSession () {
	console.log("LOG OUT SESSION");
	// other code 
}


// ========== AUTHENTICATION ROUTES ==========

// check on user (for Log In: )
router.post("/login", async (req, res)=> {

// const password = req.body.password;
// const hashedPW = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// bcrypt.compareSync(req.body.password, foundUser.password)

	try {

		// check in DB
		const foundUser = await User.findOne({
			username: req.body.username
		})

		if (bcrypt.compareSync(req.body.password, foundUser.password)) {
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

		const newUser = req.body;

		// HASH that password
		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

		const createdUser = await User.create(req.body);

		console.log("new user: ", createdUser);

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