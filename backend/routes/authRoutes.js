const { logInUser, signUpUser } = require("../controllers/user");

const express =  require("express");


const router = express.Router();

// Register User
router.post("/register", signUpUser);

// Login User
router.post("/login", logInUser);

module.exports =  router;
