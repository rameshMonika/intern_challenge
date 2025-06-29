import React, { useState } from "react";

function App() {
  const [targetAmount, setTargetAmount] = useState("");
  const [denominations, setDenominations] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  // for local use
  const backendUrl = "http://localhost:5000"; // Change this to your backend URL if needed
  // for production use
  // const backendUrl = "http://34.126.137.168 ; 
  
  const handleSubmit = async () => {
    setError("");
    setResult([]);

    const parsedAmount = parseFloat(targetAmount);
    if (isNaN(parsedAmount) || parsedAmount < 0 || parsedAmount > 10000) {
      setError("Please enter a valid target amount between 0 and 10,000");
      return;
    }

    if (!denominations.trim()) {
      setError("Please enter at least one denomination");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/coins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetAmount: parsedAmount,
          denominations: denominations,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.coins);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Minimum Coins Calculator</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>Target Amount:&nbsp;</label>
        <input
          type="number"
          step="0.01"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Coin Denominations (comma separated):&nbsp;</label>
        <input
          type="text"
          placeholder="e.g. 0.01,0.05,0.1"
          value={denominations}
          onChange={(e) => setDenominations(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Calculate Minimum Coins</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p>{JSON.stringify(result)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
