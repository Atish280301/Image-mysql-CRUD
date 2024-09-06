// backend/index.js
import express from "express";
import cors from "cors";
import mysql from "mysql";
import UserRouter from "./routes/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'dist')));

const pool = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 10000,
    host: "biyazspeduczy8759y5p-mysql.services.clever-cloud.com",
    user: "utd1gwfhpw4dkd2o",
    password: "JuJOx67qi1PnouTTLNiB",
    database: "biyazspeduczy8759y5p",
    port: "3306",
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("My SQL Database Connected!");
        connection.release();
    }
});
app.use((req, res, next) => {
    req.db = pool;
    next();
});

app.use("/product", UserRouter);
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(8081, () => {
    console.log("Server Connected!");
});
