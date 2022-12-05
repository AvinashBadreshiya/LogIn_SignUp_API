const express = require('express')
const router = express.Router()
const userInfoController = require('../controller/userInfoController')

router.post('/signUp', userInfoController.createUser)
router.post('/logIn', userInfoController.userLogin)

module.exports = router;