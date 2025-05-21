import React, { useEffect, useState } from "react";

export default function HealthBattery() {
  const [health, setHealth] = useState(1);
  const [tokenUsage, setTokenUsage] = useState(0);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [memoryCap, setMemoryCap] = useState(1000);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/health");
        const data = await res.json();
        setHealth(data.health ?? 1);
        setTokenUsage(data.tokenUsage ?? 0);
        setMaxTokens(data.maxTokens ?? 4096);
        setMemoryUsage(data.memoryUsage ?? 0);
        setMemoryCap(data.memoryCap ?? 1000);
      } catch {
        setHealth(0);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  let color = "#4caf50";
  if (health < 0.5) color = "#ffeb3b";
  if (health < 0.2) color = "#f44336";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 40,
        height: 20,
        border: "2px solid #333",
        borderRadius: 4,
        position: "relative",
        background: "#eee",
        marginRight: 4
      }}>
        <div style={{
          width: `${Math.max(health * 100, 5)}%`,
          height: "100%",
          background: color,
          borderRadius: 2,
          transition: "width 0.3s, background 0.3s"
        }} />
        <div style={{
          position: "absolute",
          right: -6,
          top: 6,
          width: 6,
          height: 8,
          background: "#333",
          borderRadius: 2
        }} />
      </div>
      <span style={{ fontSize: 12, color: "#333" }}>
        {health > 0.8 ? "Optimal" : health > 0.5 ? "Moderate" : health > 0.2 ? "Warning" : "Truncating soon"}
        {` (Tokens: ${tokenUsage}/${maxTokens}, Memory: ${memoryUsage}/${memoryCap})`}
      </span>
    </div>
  );
}
