import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js"
 


console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);


// Production Static Files
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// 🚀 Connect to Database and Start Server
const startServer = async () => {
	try {
		await connectDB(); // Ensure DB is connected before starting the server
		app.listen(PORT, () => {
			console.log("🚀 Server is running on http://localhost:" + PORT);
		});
	} catch (error) {
		console.error("🔥 Failed to start server:", error.message);
		process.exit(1); // Exit if DB connection fails
	}  
};
  
startServer();
