
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true }, // e.g., 'post','like','connection_request','connection_accepted'
  data: { type: mongoose.Schema.Types.Mixed }, // payload such as { postId, connectionId }
  read: { type: Boolean, default: false, index: true },
  archived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: true }
});

// Compound index for common query patterns
NotificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);
