const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe("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");

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Cool Product" },
                        unit_amount: 1000, // $10.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "https://github.com/conrado44/conrado44.github.io",
            cancel_url: "https://github.com/conrado44/conrado44.github.io",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
