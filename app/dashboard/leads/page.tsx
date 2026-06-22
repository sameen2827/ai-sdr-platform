import { sql } from "@/lib/db";
import LeadTable from "@/components/LeadTable";

export default async function LeadsPage() {
  const leads = await sql`
    SELECT *
    FROM leads
    ORDER BY id DESC
  `;

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