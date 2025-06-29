const request = require("supertest");
const app = require("../server");

describe("POST /api/coins", () => {
  it("returns valid coins summing to 6.75 with 1, 0.5, 0.25", async () => {
    const res = await request(app)
      .post("/api/coins")
      .send({ targetAmount: 6.75, denominations: "1, 0.5, 0.25" });

    expect(res.statusCode).toBe(200);
    const coins = res.body.coins;

    // Check that all coins are valid
    coins.forEach((coin) => {
      expect([1, 0.5, 0.25]).toContain(coin);
    });

    // Check the sum
    const sum = coins.reduce((a, b) => a + b, 0);
    expect(Math.round(sum * 100) / 100).toBe(6.75);
  });

  it("rejects invalid targetAmount", async () => {
    const res = await request(app)
      .post("/api/coins")
      .send({ targetAmount: -5, denominations: "1,0.5" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid target amount");
  });

  it("rejects invalid denominations", async () => {
    const res = await request(app)
      .post("/api/coins")
      .send({ targetAmount: 5, denominations: "abc, xyz" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("No valid coin denominations provided");
  });

  it("throws error if amount cannot be achieved", async () => {
    const res = await request(app)
      .post("/api/coins")
      .send({ targetAmount: 1, denominations: "0.3" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe(
      "Target amount cannot be achieved with given denominations"
    );
  });
});
