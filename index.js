const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
    res.send("TS143 WhatsApp Bot is LIVE 🚀");
});

// Webhook verification
app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "ts143_verify_123";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook verified ✔");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Receive messages
app.post("/webhook", (req, res) => {
    console.log("📩 FULL WEBHOOK DATA:");
    console.log(JSON.stringify(req.body, null, 2));

    // 🔥 extract message (IMPORTANT)
    const entry = req.body.entry;

    if (entry) {
        entry.forEach((e) => {
            const changes = e.changes;
            changes.forEach((c) => {
                const value = c.value;

                if (value.messages) {
                    console.log("💬 Message Received:", value.messages[0].text.body);
                }
            });
        });
    }

    res.sendStatus(200);
});

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
