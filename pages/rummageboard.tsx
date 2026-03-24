import {useEffect, useState} from "react";

type Entry = unknown;

export default function RummageboardPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/api/rummageboard")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.entries)) {
          setEntries(data.entries);
        }
      })
      .catch(() => {
        setEntries([]);
      });
  }, []);

  return (
    <main style={{maxWidth: 800, margin: "40px auto", padding: "0 16px"}}>
      <h1>Rummageboard</h1>
      <p>Public leaderboard — any JSON payloads</p>
      <ol style={{paddingLeft: 20}}>
        {entries.map((entry, index) => (
          <li key={index} style={{marginBottom: 16}}>
            <pre
              style={{
                background: "#0b0b0b",
                color: "#d7ffd9",
                padding: 12,
                border: "1px solid #1f1f1f",
                borderRadius: 6,
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
              {JSON.stringify(entry, null, 2)}
            </pre>
          </li>
        ))}
      </ol>
    </main>
  );
}
