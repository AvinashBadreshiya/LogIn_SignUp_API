require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = require('../models/userSchema')

const JWT_SECRET = process.env.JWT_SECRET;