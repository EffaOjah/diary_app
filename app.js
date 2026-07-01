require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require('./config/db');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Diary API is running...");
});


/*
========================
GET ALL DIARY ENTRIES
========================
*/
app.get("/entries", (req, res) => {

    const sql = "SELECT * FROM diary_entries ORDER BY created_at DESC";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});