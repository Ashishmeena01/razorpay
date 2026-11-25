import "dotenv/config"
import express from "express";
import cookie from "cookie-parser"
import { allPayments, createOrder, getRazorpayKey, verifyOrder } from "./controller/payment.controller";
import connectDB from "./lib/db";
import cors from "cors";
import path from "node:path";
import bcrypt from "bcrypt"
await connectDB();

const app = express();
const allowedOrigins = (
    process.env.CORS_ORIGIN ||
    process.env.CLIENT_URL ||
    "http://localhost:3000,http://127.0.0.1:3000"
)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.get("/api/payment/get-key", getRazorpayKey);
app.post("/api/payment/create-order", createOrder);
app.post("/api/payment/verify", verifyOrder);
app.get("/api/payment/all-payments", allPayments);

// Keep the shorter route names working for existing clients.
app.get("/key", getRazorpayKey);
app.post("/create-order", createOrder);
app.post("/verify", verifyOrder);
app.get("/all-payments", allPayments);

app.use(express.static(path.join(__dirname, 'public')));






app.listen(3000,()=>console.log("server is listening on the port 3000"));