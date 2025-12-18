import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  followee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  createdAt: { type: Date, default: Date.now }
});

// prevent duplicates
FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });
// index for quick followers listing
FollowSchema.index({ followee: 1, createdAt: -1 });

module.exports = mongoose.model('Follow', FollowSchema);
