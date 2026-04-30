const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
    res.send("TS143 WhatsApp Bot is LIVE 🚀");
});

// Webhook verification (IMPORTANT for Meta)
app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "ts143_verify_123"; // 👈 same token Meta میں بھی ڈالنا ہے

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        console.log("Webhook verified");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Receive WhatsApp messages
app.post("/webhook", (req, res) => {
    console.log("Incoming message:", JSON.stringify(req.body, null, 2));

    res.sendStatus(200);
});

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
