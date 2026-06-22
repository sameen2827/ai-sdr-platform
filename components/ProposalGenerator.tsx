"use client";

import { useState } from "react";

type Lead = {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  status?: string;
  lead_score?: number;
};

export default function ProposalGenerator({
  lead,
}: {
  lead: Lead;
}) {
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateProposal() {
    try {
      setLoading(true);

      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Proposal generation failed");
      }

      setProposal(data.proposal || "No proposal generated.");
    } catch (error) {
      console.error(error);
      alert("Proposal generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <button
        onClick={generateProposal}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Proposal"}
      </button>

      {proposal && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>Generated Proposal</h2>
          <hr />
          {proposal}
        </div>
      )}
    </div>
  );
}