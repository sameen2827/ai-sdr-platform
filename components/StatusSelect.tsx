"use client";

import { useState } from "react";

export default function StatusSelect({
  id,
  currentStatus,
}: {
  id: number;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);

  async function updateStatus(value: string) {
    setStatus(value);

    await fetch("/api/leads/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: value,
      }),
    });
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
    >
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Won">Won</option>
      <option value="Lost">Lost</option>
    </select>
  );
}