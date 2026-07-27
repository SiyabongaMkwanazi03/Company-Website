const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { active: "home", pageTitle: "Home - SMK DIGITALS" });
});

app.get("/services", (req, res) => {
    res.render("services", { active: "services", pageTitle: "Services - SMK DIGITALS" });
});

app.get("/faq", (req, res) => {
    res.render("faq", { active: "faq", pageTitle: "FAQ - SMK DIGITALS" });
});

app.get("/contact", (req, res) => {
    res.render("contact", { active: "contact", pageTitle: "Contact - SMK DIGITALS" });
});

app.get("/media-hub", (req, res) => {
    res.render("media-hub", { active: "media-hub", pageTitle: "Media Hub - SMK DIGITALS" });
});

app.post("/contact", (req, res) => {
    console.log(req.body);
    res.send("Thank you! Your message has been received.");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});