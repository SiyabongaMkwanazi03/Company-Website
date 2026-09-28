
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


// Home
app.get("/", (req, res) => {
    res.render("index", {
        active: "home",
        pageTitle: "Technology Solutions, Software, AI & Automation | SMK Digitals",
        pageDescription:
            "SMK Digitals helps South African businesses solve problems, improve operations and grow through custom software, web development, AI, automation and digital solutions.",
        canonicalPath: "/"
    });
});

// Services
app.get("/services", (req, res) => {
    res.render("services", {
        active: "services",
        pageTitle: "Software, AI, Automation & Web Development | SMK Digitals",
        pageDescription:
            "Explore our custom software development, web development, AI solutions, business process automation, digital systems and technology consulting services.",
        canonicalPath: "/services"
    });
});

// FAQ
app.get("/faq", (req, res) => {
    res.render("faq", {
        active: "faq",
        pageTitle: "Technology Services FAQ | SMK Digitals",
        pageDescription:
            "Find answers to common questions about SMK Digitals' software development, web development, AI, automation, digital systems and technology consulting.",
        canonicalPath: "/faq"
    });
});

// Contact
app.get("/contact", (req, res) => {
    res.render("contact", {
        active: "contact",
        pageTitle: "Contact SMK Digitals | Technology Solutions",
        pageDescription:
            "Contact SMK Digitals to discuss your business needs and explore custom software, web development, AI, automation and digital technology solutions.",
        canonicalPath: "/contact"
    });
});


// Contact form
app.post("/contact", contactController.sendContactEmail);

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
