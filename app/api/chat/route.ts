import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { companyInfo } from "@/app/data/company";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const messages = body.messages || [];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an AI Sales Agent for Innoverse.

Company Information:

${companyInfo}

Your responsibilities:

1. Answer customer questions.

2. Qualify potential leads.

3. Collect:
   - Name
   - Email
   - Phone
   - Company Name
   - Service Needed
   - Budget
   - Timeline

4. If information is missing, politely ask for it.

5. Once ALL of the following are collected:
   - Name
   - Email
   - Phone
   - Company Name
   - Service Needed
   - Budget
   - Timeline

You MUST recommend booking a discovery call.

You MUST include this exact link:

https://calendly.com/sameenfatima2827/30min

Example response:

Based on your requirements, I'd recommend scheduling a free 30-minute discovery call:

https://calendly.com/sameenfatima2827/30min

6. Be conversational and professional.

7. Always encourage qualified leads to book a meeting.

Example:

User: I need a CRM system.

AI:
Great! I'd love to help.

Can you tell me:
1. Your company name?
2. Your budget range?
3. When would you like the project completed?

After collecting all information, provide the Calendly link.
`,
        },

        ...messages,
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return NextResponse.json(
      {
        reply: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}