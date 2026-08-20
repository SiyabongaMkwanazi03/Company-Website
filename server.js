const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const contactController = require("./controllers/contactController.js");

const app = express();
const PORT = process.env.PORT || 3001;

// View engine
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sitemap
app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

// Robots.txt
app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(__dirname, "public", "robots.txt"));
});

// Routes
app.get("/", (req, res) => {
    res.render("index", {
        active: "home",
        pageTitle: "Home - SMK DIGITALS"
    });
});

app.get("/services", (req, res) => {
    res.render("services", {
        active: "services",
        pageTitle: "Services - SMK DIGITALS"
    });
});

app.get("/faq", (req, res) => {
    res.render("faq", {
        active: "faq",
        pageTitle: "FAQ - SMK DIGITALS"
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        active: "contact",
        pageTitle: "Contact - SMK DIGITALS"
    });
});

app.get("/media-hub", (req, res) => {
    res.render("media-hub", {
        active: "media-hub",
        pageTitle: "Media Hub - SMK DIGITALS"
    });
});

// Contact form
app.post("/contact", contactController.sendContactEmail);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});