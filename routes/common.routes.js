const express = require('express');
const app = express.Router();
const commonController = require("../controllers/common.controller");

app
    .post('/submitForm', commonController.submitForm)
    .post('/getVehicleType', commonController.getVehicleType)
    .post('/getVehicleModels', commonController.getVehicleModels)

module.exports = app;