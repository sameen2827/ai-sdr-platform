import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const lead = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a professional business proposal writer.

Create a proposal using:

- Client Name
- Company
- Service
- Budget
- Timeline

Format:

# Proposal

Client:
Company:

Service Required:

Project Scope:

Deliverables:

Timeline:

Estimated Cost:

Next Steps:
`,
        },
        {
          role: "user",
          content: JSON.stringify(lead),
        },
      ],
    });

    return NextResponse.json({
      proposal: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Proposal generation failed",
      },
      {
        status: 500,
      }
    );
  }
}