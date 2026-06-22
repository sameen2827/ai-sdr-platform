import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET ALL LEADS
export async function GET() {
  try {
    const leads = await sql`
      SELECT *
      FROM leads
      ORDER BY id DESC
    `;

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Fetch Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}

// SAVE NEW LEAD
export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Received Lead:", data);

    await sql`
      INSERT INTO leads
      (
        name,
        email,
        phone,
        company,
        service,
        budget,
        timeline,
        lead_score,
        status
      )
      VALUES
      (
        ${data.name || ""},
        ${data.email || ""},
        ${data.phone || ""},
        ${data.company || ""},
        ${data.service || ""},
        ${data.budget || ""},
        ${data.timeline || ""},
        ${data.lead_score || 0},
        ${data.status || "New"}
      )
    `;

    // SEND DATA TO N8N
    try {
      const n8nResponse = await fetch(
        "https://sameenfatima.app.n8n.cloud/webhook/lead-followup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company,
            service: data.service,
            budget: data.budget,
            timeline: data.timeline,
            lead_score: data.lead_score,
            status: data.status,
          }),
        }
      );

      console.log(
        "N8N Response Status:",
        n8nResponse.status
      );
    } catch (n8nError) {
      console.error(
        "N8N Webhook Error:",
        n8nError
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead saved successfully",
    });
  } catch (error) {
    console.error("DB Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Database error",
      },
      { status: 500 }
    );
  }
}