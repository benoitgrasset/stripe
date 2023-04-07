import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import { items as storeItems } from "./items.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// https://dashboard.stripe.com/test/apikeys
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

app.listen(port, () => console.log(`Server listens on port ${port}`));

app.post("/create-checkout-session", async (req, res) => {
  console.log(`POST /create-checkout-session: ${res.statusCode}`);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.find((item) => item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
