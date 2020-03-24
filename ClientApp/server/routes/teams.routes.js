const express = require('express');
const router = express.Router();
const teamsModel = require('../models/teams.model')

router.get('/', (req, res) => teamsModel.allTeams(res))

router.get('/:id', (req,res) => teamsModel.teamDetails(req,res))

module.exports = router
