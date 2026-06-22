import { sql } from "@/lib/db";

export default async function DashboardPage() {
  const totalLeads = await sql`
    SELECT COUNT(*) as count
    FROM leads
  `;

  const newLeads = await sql`
    SELECT COUNT(*) as count
    FROM leads
    WHERE status = 'New'
  `;

  const qualifiedLeads = await sql`
    SELECT COUNT(*) as count
    FROM leads
    WHERE status = 'Qualified'
  `;

  const wonLeads = await sql`
    SELECT COUNT(*) as count
    FROM leads
    WHERE status = 'Won'
  `;

  const lostLeads = await sql`
    SELECT COUNT(*) as count
    FROM leads
    WHERE status = 'Lost'
  `;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        CRM Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">Total Leads</h3>
          <h2 className="text-4xl font-bold mt-2">
            {totalLeads[0].count}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">New Leads</h3>
          <h2 className="text-4xl font-bold mt-2">
            {newLeads[0].count}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">
            Qualified Leads
          </h3>
          <h2 className="text-4xl font-bold mt-2">
            {qualifiedLeads[0].count}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">Won Leads</h3>
          <h2 className="text-4xl font-bold mt-2">
            {wonLeads[0].count}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500">Lost Leads</h3>
          <h2 className="text-4xl font-bold mt-2">
            {lostLeads[0].count}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Sales Pipeline Overview
        </h2>

        <p className="text-gray-600">
          AI SDR Platform powered by Groq, NeonDB,
          Calendly and n8n Automation.
        </p>
      </div>
    </div>
  );
}