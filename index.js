const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
    res.send("TS143 WhatsApp AI Bot is LIVE 🚀");
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

// Receive messages (MAIN BOT)
app.post("/webhook", async (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));

    const entry = req.body.entry;

    if (entry) {
        for (let e of entry) {
            for (let c of e.changes) {
                const value = c.value;

                if (value.messages) {
                    const msg = value.messages[0];
                    const from = msg.from;

                    let text = "";
                    if (msg.text) {
                        text = msg.text.body.toLowerCase();
                    }

                    let reply = "";

                    // 🟢 Institute
                    if (
                        text.includes("admission") ||
                        text.includes("course") ||
                        text.includes("student")
                    ) {
                        reply = "📚 آپ نے TS143 Institute select کیا ہے۔";
                    }

                    // 🟢 Construction
                    else if (
                        text.includes("work") ||
                        text.includes("project") ||
                        text.includes("construction")
                    ) {
                        reply = "🏗 آپ نے Construction Company select کیا ہے۔";
                    }

                    // 🟢 Default
                    else {
                        reply =
                            "👋 Welcome!\n1️⃣ Institute\n2️⃣ Construction";
                    }

                    // 🔥 SEND MESSAGE (IMPORTANT PART)
                    await axios.post(
    "https://graph.facebook.com/v19.0/1006656262540650/messages",
    {
        messaging_product: "whatsapp",
        to: from,
        text: { body: reply }
    },
    {
        headers: {
            Authorization: "Bearer EAANxnOC1uT4BRdRmyovRkG0ZAUPJFdeiSeu2zY8qcOZCqOqxZBFdIQYM0g2aPopQhINddJDwqseiRk2jzZAZCcLyn5sKNHmkcq1opNR7eDHAGbQ5VHwv1KBtbpWeEE7lJz0QYLeELrl7w5aabGP1rZAklyPLoc962qu7vWVbH6xMZAm8BnaoANwlaruAWSjcPETTgZDZD",
            "Content-Type": "application/json"
        }
    }
);
                }
            }
        }
    }

    res.sendStatus(200);
});

// Server start
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("✅ Server LIVE on port " + PORT);
});
