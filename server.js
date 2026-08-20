
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
        pageTitle: "AI Automation for SMEs in South Africa | SMK DIGITALS",
        pageDescription:
            "SMK DIGITALS provides AI automation solutions that help South African small and medium businesses improve efficiency, generate leads and grow.",
        canonicalPath: "/"
    });
});

// Services
app.get("/services", (req, res) => {
    res.render("services", {
        active: "services",
        pageTitle: "AI Automation Services for Businesses | SMK DIGITALS",
        pageDescription:
            "Explore AI automation, AI chatbots, business process automation and AI solutions designed to help SMEs improve efficiency and grow.",
        canonicalPath: "/services"
    });
});

// FAQ
app.get("/faq", (req, res) => {
    res.render("faq", {
        active: "faq",
        pageTitle: "AI Automation FAQ | SMK DIGITALS",
        pageDescription:
            "Find answers to common questions about AI automation, AI chatbots and AI solutions for small and medium businesses.",
        canonicalPath: "/faq"
    });
});

// Contact
app.get("/contact", (req, res) => {
    res.render("contact", {
        active: "contact",
        pageTitle: "Contact SMK DIGITALS | AI Automation Solutions",
        pageDescription:
            "Contact SMK DIGITALS to discuss AI automation, chatbots and business solutions for your company.",
        canonicalPath: "/contact"
    });
});

// Media Hub
app.get("/media-hub", (req, res) => {
    res.render("media-hub", {
        active: "media-hub",
        pageTitle: "AI Business Insights & Resources | SMK DIGITALS",
        pageDescription:
            "Explore AI insights, business tips and resources designed to help SMEs use artificial intelligence effectively.",
        canonicalPath: "/media-hub"
    });
});

// Contact form
app.post("/contact", contactController.sendContactEmail);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

