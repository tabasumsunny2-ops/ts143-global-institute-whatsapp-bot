const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
    res.send("TS143 WhatsApp Bot is LIVE 🚀");
});

// Webhook route (future WhatsApp integration)
app.post("/webhook", (req, res) => {
    console.log("Incoming message:", req.body);

    res.json({
        status: "success",
        reply: "Welcome to TS143 Global Institute!"
    });
});

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
