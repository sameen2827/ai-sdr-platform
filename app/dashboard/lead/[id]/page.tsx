import { sql } from "@/lib/db";
import ProposalGenerator from "@/components/ProposalGenerator";

export default async function LeadDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await sql`
    SELECT *
    FROM leads
    WHERE id = ${id}
  `;

  const lead = result[0];

  if (!lead) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Lead Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Lead Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Lead Information
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {lead.name}
            </p>

            <p>
              <strong>Email:</strong> {lead.email}
            </p>

            <p>
              <strong>Phone:</strong> {lead.phone}
            </p>

            <p>
              <strong>ID:</strong> {lead.id}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Project Information
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Service:</strong> {lead.service}
            </p>

            <p>
              <strong>Budget:</strong> {lead.budget}
            </p>

            <p>
              <strong>Status:</strong> {lead.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {String(lead.created_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          AI Proposal Generator
        </h2>

        <ProposalGenerator lead={lead} />
      </div>
    </div>
  );
}