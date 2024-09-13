import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url'

import blogPosts from "./routes/blogPosts.routes.js";

const app = express();

dotenv.config();

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({
    limit: "50mb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));

app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/blogs", blogPosts);

const PORT = process.env.PORT || 6000;
const DB_CONNECTION = process.env.DATABASE_URL;

console.log("Starting the server...");

if (!DB_CONNECTION) {
    console.error("DATABASE_URL is not defined in the .env file.");
    process.exit(1);
}

mongoose.connect(DB_CONNECTION)
    .then(() => {
        console.log("Connected to MongoDB successfully.");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running at: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
