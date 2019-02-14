// ===== APP SECURITY ===== 
require("dotenv").config();


// ===== RUN DATABASE FILE ===== 
require("./db/db");


// ===== IMPORT MODULES ===== 
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cors = require("cors");


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


// ===== CORS ===== 
const corsOptions = {
  origin: HOST,
  credentials: true, 
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));


// ===== OTHER EARLY MIDDLEWARE ===== 
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// ===== USER / AUTHENTICATION CONTROLLER =====
const userController = require("./controllers/userController");
app.use("/user", userController);



// ===== OTHER CONTROLLERS ===== 

const cardController = require("./controllers/cardController");
app.use("/card", cardController);

const deckController = require("./controllers/deckController");
app.use("/deck", deckController);

const searchController = require("./controllers/searchController");
app.use("/search", searchController);



// ===== OTHER MIDDLEWARE ===== 



// ===== RUN SERVER ===== 
app.listen(PORT, ()=>{
	console.log("Server is listening on port " + PORT);
})
