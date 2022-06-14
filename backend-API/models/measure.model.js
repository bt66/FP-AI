const mongoose = require("mongoose");
// const SensorResult = mongoose.model(
//     "MeasureResult",
//     new mongoose.Schema({
//         deviceId: String,
//         // temperature: Number,
//         // humadity: Number
//     })
// )

const SensorResult = new mongoose.Schema({
        deviceId: {type: String, default: null},
        temperature: {type: Number},
        humadity: {type: Number},
    },
    { timestamps: true }
    );

module.exports = mongoose.model("measure_result", SensorResult)