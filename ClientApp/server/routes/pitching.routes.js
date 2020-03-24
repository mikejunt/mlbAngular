const express = require('express');
const router = express.Router();
const pitchingModel = require('../models/pitching.model')

router.post('/all', (req, res) => pitchingModel.allPitching(req,res))

// router.post('/fip', (req,res) => pitchingModel.getFip(req,res))

router.post('/:id', (req,res) => pitchingModel.teamPitching(req,res))





module.exports = router
