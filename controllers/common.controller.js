const asyncHandler = require("../middleware/async");
const CommonService = require("../models/common.model")
const commonService = new CommonService();


exports.submitForm = asyncHandler(async (req, res, next) => {
    const response = await commonService.submitForm(req.body)
    return res.json(response);
});
exports.getVehicleType = asyncHandler(async (req, res, next) => {
    const response = await commonService.getVehicleType(req.body)
    return res.json(response);
});
exports.getVehicleModels = asyncHandler(async (req, res, next) => {
    const response = await commonService.getVehicleModels(req.body)
    return res.json(response);
});

