import LeadTable from "@/components/LeadTable";
import { sql } from "@/lib/db";

async function getLeads() {
  const leads = await sql`
    SELECT *
    FROM leads
    ORDER BY id DESC
  `;

  return leads;
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
        }}
      >
        All Leads
      </h1>

      <LeadTable leads={leads} />
    </div>
  );
}