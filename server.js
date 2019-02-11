// ===== APP SECURITY ===== 
require("dotenv").config();


// ===== RUN DATABASE FILE ===== 
require("./db/db");


// ===== IMPORT MODULES ===== 
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");


// ===== SET APP ===== 
const app = express();


// ===== SET PORT ===== 
const PORT = process.env.PORT;


// ===== SET UP SESSION ===== 
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))


// ===== "EARLY" MIDDLEWARE ===== 
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));


// ===== AUTH CONTROLLER & MIDDLEWARE =====
const authController = require("./controllers/authController");
app.use("/auth", authController);


// ===== OTHER CONTROLLERS ===== 
const cardController = require("./controllers/cardController");
app.use("/card", cardController);

const deckController = require("./controllers/deckController");
app.use("/deck", deckController);


// ===== OTHER MIDDLEWARE ===== 



// ===== RUN SERVER ===== 
app.listen(PORT, ()=>{
	console.log("Server is listening on port " + PORT);
})
