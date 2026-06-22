"use client";

import { useState } from "react";

type Message = {
  role: string;
  content: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Sales Assistant. How can I help you today?",
    },
  ]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.reply || "No response received",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function extractLead() {
    try {
      const conversation = messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const extractRes = await fetch("/api/extract-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation,
        }),
      });

      const extractData = await extractRes.json();

      const cleanedJson = extractData.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const leadData = JSON.parse(cleanedJson);

      const saveRes = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: leadData.name || "",
          email: leadData.email || "",
          phone: leadData.phone || "",
          company: leadData.company || "",
          service: leadData.service || "",
          budget: leadData.budget || "",
          timeline: leadData.timeline || "",
          lead_score: leadData.lead_score || 0,
          status: "New",
        }),
      });

      const saveData = await saveRes.json();

      if (saveData.success) {
        alert(
          `Lead Saved Successfully 🎉\n\nLead Score: ${
            leadData.lead_score || 0
          }/100`
        );
      } else {
        alert("Lead Save Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Lead Extraction Failed");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-6">
          AI SDR Platform
        </h1>

        <div className="border border-slate-200 rounded-xl p-6 h-[550px] overflow-y-auto mb-6 bg-slate-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.role === "user"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <div
                className={`inline-block max-w-[75%] px-5 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500">
              AI is typing...
            </div>
          )}
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-slate-300 p-4 rounded-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={extractLead}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Extract & Save Lead
          </button>

          <a
            href="https://calendly.com/sameenfatima2827/30min"
            target="_blank"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
          >
            Book a Free Call
          </a>
        </div>
      </div>
    </main>
  );
}