require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 40000;

// Middleware
app.set("view engine", "ejs"); // Using EJS as the template engine
app.use(express.static("public")); // Serve static files from public folder
app.use(express.urlencoded({ extended: true })); // Parse form data

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Home Route
app.get("/", (req, res) => {
    res.render("index", { weatherData: null });
});

// Fetch Weather Data
app.post("/weather", async (req, res) => {
    const city = req.body.city;

    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        res.render("index", { weatherData: response.data });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.render("index", { weatherData: null });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

