const express = require('express');
const router = express.Router();
const hittingModel = require('../models/hitting.model')

router.post('/all', (req, res) => hittingModel.allHitting(req,res))

router.post('/ops', (req, res) => hittingModel.advStats(req,res))

router.post('/:id', (req,res) => hittingModel.teamHitting(req,res))

module.exports = router
