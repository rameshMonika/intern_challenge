const express = require("express");
const cors = require("cors");

const app = express();


// CORS configuration
const allowedOrigins = [
  "http://localhost",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://34.124.103.42"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper
const roundToTwo = (num) => Math.round(num * 100) / 100;

// Main logic
function getMinimumCoins(targetAmount, denominations) {
  targetAmount = roundToTwo(targetAmount);
  const result = [];

  denominations.sort((a, b) => b - a);

  for (let coin of denominations) {
    coin = roundToTwo(coin);
    while (roundToTwo(targetAmount - coin) >= 0) {
      targetAmount = roundToTwo(targetAmount - coin);
      result.push(coin);
    }
  }

  if (targetAmount !== 0) {
    throw new Error("Target amount cannot be achieved with given denominations");
  }

  return result.sort((a, b) => a - b);
}

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/coins", (req, res) => {
  try {
    const { targetAmount, denominations } = req.body;

    console.log("Received:", { targetAmount, denominations });

    if (
      typeof targetAmount !== "number" ||
      isNaN(targetAmount) ||
      targetAmount < 0 ||
      targetAmount > 10000
    ) {
      return res.status(400).json({ error: "Invalid target amount" });
    }

    const coins = denominations
      .split(",")
      .map((c) => parseFloat(c.trim()))
      .filter((c) => !isNaN(c) && c > 0);

    if (coins.length === 0) {
      return res.status(400).json({ error: "No valid coin denominations provided" });
    }

    const result = getMinimumCoins(targetAmount, coins);
    res.json({ coins: result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Only start server if run directly
if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
}

// Export only the app (not the server)
module.exports = app;
