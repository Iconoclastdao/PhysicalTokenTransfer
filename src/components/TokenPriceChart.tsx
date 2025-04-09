import React, { useEffect, useState, useRef } from "react";
import {
  Chart,
  ChartOptions,
  LineController,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Token {
  tokenSymbol: string;
}

interface LineDataPoint {
  x: number;
  y: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

const TokenPriceChart: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [lineData, setLineData] = useState<LineDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chartRef = useRef<Chart<"line"> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fetch tokens
  useEffect(() => {
    fetch("https://arbitrum-api.gmxinfra.io/prices/tickers")
      .then((res) => res.json())
      .then((json: Token[]) => {
        setTokens(json);
        if (json.length > 0) setSelectedToken(json[0]);
      })
      .catch((err) => console.error("❌ Failed to fetch tokens:", err));
  }, []);

  // Fetch candle data
  useEffect(() => {
    if (!selectedToken) return;
    setLoading(true);

    fetch(
      `https://arbitrum-api.gmxinfra.io/prices/candles?tokenSymbol=${selectedToken.tokenSymbol}&period=1m`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json?.candles) {
          setLineData([]);
          setLoading(false);
          return;
        }

        const parsed = json.candles.map((candle: number[]) => {
          const [ts, o, h, l, c] = candle;
          return { x: ts * 1000, y: c, o, h, l, c } as LineDataPoint;
        });

        setLineData(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch candle data:", err);
        setLoading(false);
      });
  }, [selectedToken]);

  // Chart initialization
  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx || !lineData.length) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const config: ChartOptions<"line"> = {
      responsive: true,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "nearest",
          intersect: false,
          callbacks: {
            label: (context) => {
              const raw = context.raw as LineDataPoint;
              return [
                `Time:  ${new Date(raw.x).toLocaleTimeString()}`,
                `Open:  ${raw.o}`,
                `High:  ${raw.h}`,
                `Low:   ${raw.l}`,
                `Close: ${raw.c}`,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: { tooltipFormat: "MMM dd, HH:mm" },
          grid: { color: "#444" },
          ticks: { color: "#ccc" },
        },
        y: {
          beginAtZero: false,
          grid: { color: "#444" },
          ticks: { color: "#ccc" },
        },
      },
    };

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: `${selectedToken?.tokenSymbol} (1m Close)`,
            data: lineData,
            borderColor: "#26A69A",
            backgroundColor: "rgba(38,166,154,0.1)",
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.1,
          },
        ],
      },
      options: config,
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [lineData, selectedToken]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#1E1E2F",
        color: "lavenderblush",
        borderRadius: "12px",
        padding: "20px",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Chart area now ABOVE token list */}
      <div style={{ flex: "2", overflow: "auto", marginBottom: "20px" }}>
        <h2 style={{ textAlign: "center" }}>
          📈 {selectedToken?.tokenSymbol || "Token"} 1-Min Closing Price
        </h2>
        {loading ? (
          <p style={{ textAlign: "center" }}>⏳ Loading prices...</p>
        ) : (
          <div
            style={{
              background: "#2A2A3D",
              padding: "16px",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
          </div>
        )}
      </div>

      {/* Token List now BELOW chart */}
      <div
        style={{
          flex: "1",
          maxHeight: "200px",
          overflowY: "auto",
          borderTop: "1px solid #444",
          paddingTop: "10px",
        }}
      >
        <h3>📄 Tokens</h3>
        {tokens.map((token) => (
          <div
            key={token.tokenSymbol}
            onClick={() => setSelectedToken(token)}
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              margin: "4px 0",
              background:
                selectedToken?.tokenSymbol === token.tokenSymbol
                  ? "#2A2A3D"
                  : "transparent",
              borderRadius: "8px",
            }}
          >
            {token.tokenSymbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenPriceChart;