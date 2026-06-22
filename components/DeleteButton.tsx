"use client";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  async function deleteLead() {
    const confirmed = confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) return;

    await fetch("/api/leads/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    window.location.reload();
  }

  return (
    <button onClick={deleteLead}>
      Delete
    </button>
  );
}