export async function startCycle({ userId, sessionId, type, duration }) {
  const res = await fetch("/api/cycle/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, sessionId, type, duration }),
  });
  if (!res.ok) throw new Error("Failed to start cycle");
  return await res.json();
}

export async function completeCycle(cycleId) {
  const res = await fetch("/api/cycle/complete", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cycleId }),
  });
  if (!res.ok) throw new Error("Failed to complete cycle");
  return await res.json();
}
