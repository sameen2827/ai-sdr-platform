import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { conversation } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a lead extraction AI.

Extract:

- name
- email
- phone
- company
- service
- budget
- timeline

Calculate lead_score:

+20 email
+20 phone
+20 company
+20 budget
+20 timeline

IMPORTANT RULES:

1. ALWAYS return valid JSON.
2. NEVER return explanations.
3. NEVER return sentences.
4. If a value is missing use "".
5. If nothing exists still return JSON.

Example:

{
  "name": "",
  "email": "",
  "phone": "",
  "company": "",
  "service": "",
  "budget": "",
  "timeline": "",
  "lead_score": 0
}

Output ONLY JSON.
`,
        },
        {
          role: "user",
          content: conversation,
        },
      ],

      temperature: 0,
    });

    const result =
      completion.choices?.[0]?.message?.content || `{
        "name":"",
        "email":"",
        "phone":"",
        "company":"",
        "service":"",
        "budget":"",
        "timeline":"",
        "lead_score":0
      }`;

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error("EXTRACT ERROR:", error);

    return NextResponse.json({
      result: `{
        "name":"",
        "email":"",
        "phone":"",
        "company":"",
        "service":"",
        "budget":"",
        "timeline":"",
        "lead_score":0
      }`,
    });
  }
}