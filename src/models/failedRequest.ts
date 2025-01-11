import mongoose from "mongoose";

const { Schema } = mongoose;

const failedRequestSchema = new Schema(
  {
    ip: { type: String, require: true },
    reason: { type: String, require: true },
  },

  { timestamps: true }
);

const FailedRequest = mongoose.model("failedRequest", failedRequestSchema);

export default FailedRequest;
