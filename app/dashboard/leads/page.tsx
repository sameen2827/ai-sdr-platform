import LeadTable from "@/components/LeadTable";

async function getLeads() {
  const res = await fetch("http://localhost:3000/api/leads", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }

  return res.json();
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