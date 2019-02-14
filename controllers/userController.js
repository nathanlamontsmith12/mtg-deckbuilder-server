// ========== IMPORTS ==========
// Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");


// ========== AUTHENTICATION FUNCTIONS ==========

function logInSession (username, userId) {
	console.log("LOG IN SESSION");
	console.log("username: ", username);
	console.log("userId: ", userId);
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

		if (!foundUser) {
			throw Error("No such user in database")
		}

		if (bcrypt.compareSync(req.body.password, foundUser.password)) {
			logInSession(foundUser.username, foundUser._id);
			res.send({
				status: 200,
				data: foundUser._id
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


// create new user account
router.post("/", async (req, res)=>{
	try{

		const newUser = req.body;

		// hash the password
		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

		const createdUser = await User.create(newUser);

		logInSession(createdUser.username, createdUser._id);

		res.json({
			status: 200,
			data: createdUser._id
		})

	} catch (err) {
		console.log(err);
		res.send(err)
	}
})


// ========== USER ROUTES ==========

// Get information: 
router.get("/:id", async (req, res)=>{
	try {

		const foundUser = await User.findById(req.params.id);
		// const foundUser = await User.findById(req.body.userId)

		res.json({
			status: 200,
			data: foundUser
		})

	} catch (err) {
		console.log(err);
		res.send(err);
	}
})


//  ========== EXPORT ROUTER  ==========
module.exports = router;