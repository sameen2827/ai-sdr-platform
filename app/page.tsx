"use client";

import { useState } from "react";

export default function Home() {
  const questions = [
    "What is your name?",
    "What is your email?",
    "What is your phone number?",
    "What service are you interested in?",
    "What is your budget?",
  ];

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const updatedLead = { ...lead };

    if (step === 0) updatedLead.name = answer;
    if (step === 1) updatedLead.email = answer;
    if (step === 2) updatedLead.phone = answer;
    if (step === 3) updatedLead.service = answer;
    if (step === 4) updatedLead.budget = answer;

    setLead(updatedLead);

    if (step < questions.length - 1) {
      setStep(step + 1);
      setAnswer("");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLead),
      });

      const data = await res.json();

      console.log(data);

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to save lead");
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-green-600">
            Lead Saved Successfully 🎉
          </h1>

          <div className="space-y-3 text-lg">
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
              <strong>Service:</strong> {lead.service}
            </p>

            <p>
              <strong>Budget:</strong> {lead.budget}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          AI Sales Agent
        </h1>

        <p className="mb-4 text-gray-700">
          {questions[step]}
        </p>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Type your answer..."
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </main>
  );
}