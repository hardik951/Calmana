const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    specialization: { type: String, required: true },
    license: { type: String, required: true },

    aadhaar: {
      type: String,
      required: true,
      match: /^[0-9]{12}$/,
    },

    aadhaarImage: { type: String, required: true },
    licenseImage: { type: String, required: true },

    role: { type: String, default: "doctor" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
