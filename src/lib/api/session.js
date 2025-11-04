export async function startSession(userId, totalCycles = 4) {
  const res = await fetch("/api/session/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, totalCycles }),
  });
  if (!res.ok) throw new Error("Failed to start session");
  return await res.json();
}

export async function getActiveSession(userId) {
  const res = await fetch(`/api/session/active?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch active session");
  return await res.json();
}

export async function endSession(sessionId) {
  const res = await fetch("/api/session/end", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw new Error("Failed to end session");
  return await res.json();
}
