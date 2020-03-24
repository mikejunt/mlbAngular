const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')

router.post('/login', (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined) { return res.send(({ success: false, msg: "Invalid input provided." })) }
    userModel.login(res, req.body)
})

router.post('/signup', (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined) { return res.send(({ success: false, msg: "Invalid input provided." })) }
    userModel.signup(res, req.body)
})

module.exports = router