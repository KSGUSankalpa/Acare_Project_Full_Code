const mongoose = require("mongoose");

const AmbulanceSchema = new mongoose.Schema({
  Ambulance_no: { type: String, required: true, unique: true },
  hospitalId: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }, // Field to indicate if ambulance is available
  // Add any other fields if necessary
});

module.exports = mongoose.model("Ambulance", AmbulanceSchema);
