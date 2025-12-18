
import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema({
  userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending', index: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  acceptedAt: Date
});

// Ensure canonical ordering on insert (userA < userB)
// Unique pair prevents duplicates
ConnectionSchema.index({ userA: 1, userB: 1 }, { unique: true });
ConnectionSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Connection', ConnectionSchema);
