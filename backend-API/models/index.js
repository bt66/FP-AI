const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.MeasureResult = require("./measure.model");
module.exports = db;