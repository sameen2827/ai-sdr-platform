"use client";

import { useState } from "react";
import Link from "next/link";
import StatusSelect from "./StatusSelect";
import DeleteButton from "./DeleteButton";

export default function LeadTable({ leads }: { leads: any[] }) {
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "300px",
        }}
      />

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>

              <td>
                <Link href={`/dashboard/lead/${lead.id}`}>
                  {lead.name}
                </Link>
              </td>

              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.service}</td>
              <td>{lead.budget}</td>

              <td>
                <StatusSelect
                  id={lead.id}
                  currentStatus={lead.status || "New"}
                />
              </td>

              <td>
                <DeleteButton id={lead.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}