import asyncHandler from "express-async-handler";
import { groqChat } from "../utils/groqService.js";

// 1. Summarize note content
export const summarizeNote = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    res.status(400);
    throw new Error("Content is required");
  }
  const text = content.trim().slice(0, 8000);
  const reply = await groqChat(
    [
      {
        role: "system",
        content:
          "You are a helpful assistant. Summarize the given note in 2-4 concise sentences. Return only the summary, no preamble.",
      },
      { role: "user", content: text },
    ],
    { max_tokens: 256, temperature: 0.3 }
  );
  res.json({ summary: reply });
});

// 2. Suggest title from content
export const suggestTitle = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    res.status(400);
    throw new Error("Content is required");
  }
  const text = content.trim().slice(0, 4000);
  const reply = await groqChat(
    [
      {
        role: "system",
        content:
          "You are a helpful assistant. Suggest a short, clear title (3-8 words) for this note. Return only the title, nothing else. No quotes.",
      },
      { role: "user", content: text },
    ],
    { max_tokens: 64, temperature: 0.5 }
  );
  res.json({ title: reply.trim().replace(/^["']|["']$/g, "") });
});

// 3. Improve / rewrite (style: grammar | formal | simple)
export const improveNote = asyncHandler(async (req, res) => {
  const { content, style } = req.body;
  if (!content || typeof content !== "string") {
    res.status(400);
    throw new Error("Content is required");
  }
  const text = content.trim().slice(0, 6000);
  const stylePrompt =
    style === "formal"
      ? "Rewrite the following text in a more formal, professional tone. Keep the same meaning and structure. Return only the rewritten text."
      : style === "simple"
      ? "Rewrite the following text in simpler, clearer language. Keep the same meaning. Return only the rewritten text."
      : "Fix grammar, spelling, and punctuation. Improve clarity. Return only the improved text.";
  const reply = await groqChat(
    [
      { role: "system", content: "You are a helpful writing assistant. " + stylePrompt },
      { role: "user", content: text },
    ],
    { max_tokens: 2048, temperature: 0.4 }
  );
  res.json({ content: reply });
});

// 4. Suggest category
export const suggestCategory = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const text = [title, content].filter(Boolean).join("\n").trim().slice(0, 3000);
  if (!text) {
    res.status(400);
    throw new Error("Title or content is required");
  }
  const reply = await groqChat(
    [
      {
        role: "system",
        content:
          "You are a helpful assistant. Suggest a single category word or short phrase (e.g. Work, Personal, Ideas, Study, Shopping) for this note. Return only the category, one or two words, nothing else.",
      },
      { role: "user", content: text },
    ],
    { max_tokens: 32, temperature: 0.5 }
  );
  res.json({ category: reply.trim() });
});

// 5. Expand / continue note
export const expandNote = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    res.status(400);
    throw new Error("Content is required");
  }
  const text = content.trim().slice(-3000);
  const reply = await groqChat(
    [
      {
        role: "system",
        content:
          "You are a helpful writing assistant. Continue the following note naturally in 1-3 paragraphs. Match the tone and style. Return only the new continuation text, no preamble.",
      },
      { role: "user", content: text },
    ],
    { max_tokens: 512, temperature: 0.6 }
  );
  res.json({ continuation: reply });
});

// 6. In-app AI assistant chat
export const assistantChat = asyncHandler(async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message || typeof message !== "string" || !message.trim()) {
    res.status(400);
    throw new Error("Message is required");
  }
  const systemContent = `You are a friendly in-app assistant for "Note Zipper", a notes app. You help users with: creating and organizing notes, using categories, search, and tips. Keep answers short and helpful (2-4 sentences unless they ask for more). If asked about features, mention: create/edit/delete notes, categories, markdown, search, and AI tools like summarize, suggest title, improve text, and expand note.`;
  const messages = [
    { role: "system", content: systemContent },
    ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message.trim() },
  ];
  const reply = await groqChat(messages, { max_tokens: 512, temperature: 0.6 });
  res.json({ reply });
});
