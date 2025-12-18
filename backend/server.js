import express from "express";
import dotenv from "dotenv";
// import profileRoutes from "./routes/profile.js";
import { connectDB } from "./config/db.js";
import AuthRoutes from "./routes/auth.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
// import { requireAuth } from "./middleware/requireAuth.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


// app.use(cors({
//   origin: process.env.CLIENT_URL,
 
// }));
app.use(express.json());
app.use(cookieParser());

// Connect database
connectDB();

// Test route
app.get("/test", (req, res) => {
   console.log("TEST route hit");
  res.json({ message: "Backend is working!" });
});

 console.log("backend chla", process.env.CLIENT_URL);
app.use('/auth',AuthRoutes );
// app.use('/profile', profileRoutes);
// app.get("/me", requireAuth, (req, res) => {
//   res.json({ user: req.user,
//     name: "bk"
//    });
// });








// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
