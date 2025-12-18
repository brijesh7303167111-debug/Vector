import mongoose from "mongoose";
function canonicalPair(id1, id2) {
  const a = id1.toString();
  const b = id2.toString();
  if (a === b) throw new Error('same id');
  return a < b 
    ? { userA: mongoose.Types.ObjectId(a), userB: mongoose.Types.ObjectId(b) } 
    : { userA: mongoose.Types.ObjectId(b), userB: mongoose.Types.ObjectId(a) };
}
module.exports = canonicalPair;
