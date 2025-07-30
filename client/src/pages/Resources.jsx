// src/pages/Resources.jsx
import React, { useMemo, useState } from "react";
import { FaExternalLinkAlt, FaBookOpen, FaPlayCircle, FaPodcast, FaLeaf } from "react-icons/fa";

const ALL_RESOURCES = [
  // --- Articles ---
  {
    id: "art-1",
    type: "article",
    title: "Understanding Anxiety: A Beginner’s Guide",
    description: "What anxiety is, how it shows up in the body, and first steps to manage it.",
    url: "https://www.example.com/article/anxiety-basics",
    tags: ["anxiety", "education", "beginners"],
    duration: "6 min read",
  },
  {
    id: "art-2",
    type: "article",
    title: "Building a Journaling Habit",
    description: "Simple frameworks to turn journaling into a supportive daily routine.",
    url: "https://www.example.com/article/journaling-habit",
    tags: ["journaling", "habits", "self-care"],
    duration: "5 min read",
  },
  // ✅ NEW: Infertility article
  {
    id: "art-3",
    type: "article",
    title: "Coping with Infertility: Emotional Support and Next Steps",
    description:
      "A compassionate guide to navigating grief, stress, and relationship strain during infertility—plus practical tools and support options.",
    url: "https://www.example.com/article/infertility-support",
    tags: ["infertility", "fertility", "grief", "relationships", "support"],
    duration: "7 min read",
  },

  // --- Videos ---
  {
    id: "vid-1",
    type: "video",
    title: "5‑Minute Box Breathing",
    description: "Guided box‑breathing practice for grounding and calm.",
    url: "https://www.example.com/video/box-breathing",
    tags: ["breathing", "anxiety", "technique"],
    duration: "5:12",
  },
  {
    id: "vid-2",
    type: "video",
    title: "Progressive Muscle Relaxation",
    description: "Release tension in the body with a short PMR routine.",
    url: "https://www.example.com/video/pmr",
    tags: ["relaxation", "sleep", "technique"],
    duration: "7:45",
  },

  // --- Podcasts ---
  {
    id: "pod-1",
    type: "podcast",
    title: "Daily Mindset Reset",
    description: "Short reflective prompts to start your day with intention.",
    url: "https://www.example.com/podcast/mindset-reset",
    tags: ["mindfulness", "morning", "routine"],
    duration: "12 min",
  },

  // --- Techniques / Tools ---
  {
    id: "tec-1",
    type: "technique",
    title: "R.A.I.N. for Difficult Emotions",
    description: "Recognize, Allow, Investigate, Nurture—step‑by‑step guide.",
    url: "https://www.example.com/technique/rain",
    tags: ["mindfulness", "emotions", "self-compassion"],
    duration: "Guide",
  },
  {
    id: "tec-2",
    type: "technique",
    title: "Thought Record (CBT)",
    description: "Challenge unhelpful thoughts using a simple CBT worksheet.",
    url: "https://www.example.com/technique/thought-record",
    tags: ["cbt", "worksheet", "anxiety"],
    duration: "Worksheet",
  },
];

const TYPE_META = {
  article: { label: "Articles", icon: <FaBookOpen className="inline-block mr-2" /> },
  video:   { label: "Videos",   icon: <FaPlayCircle className="inline-block mr-2" /> },
  podcast: { label: "Podcasts", icon: <FaPodcast className="inline-block mr-2" /> },
  technique:{label: "Techniques",icon: <FaLeaf className="inline-block mr-2" /> },
};

function ResourceCard({ item }) {
  const meta = TYPE_META[item.type];
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-emerald-100 bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all p-5"
    >
      <div className="text-emerald-700 text-sm font-semibold mb-1">
        {meta?.icon}{meta?.label}
      </div>
      <h3 className="text-lg font-bold text-emerald-900">{item.title}</h3>
      <p className="mt-2 text-emerald-800/80 text-sm leading-relaxed line-clamp-3">
        {item.description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {item.tags?.slice(0, 4).map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            {t}
          </span>
        ))}
        <span className="ml-auto text-xs text-emerald-600">{item.duration}</span>
      </div>
      <div className="mt-4 text-emerald-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Open <FaExternalLinkAlt className="inline-block ml-1" />
      </div>
    </a>
  );
}

export default function Resources() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_RESOURCES.filter((r) => {
      const matchesType = activeType === "all" || r.type === activeType;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    });
  }, [query, activeType]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-green-100">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900">Resource Library</h1>
          <p className="mt-1 text-emerald-800/80">
            Curated articles, videos, podcasts, and practical techniques to support your well‑being.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
          <div className="flex rounded-full border border-emerald-200 bg-white/80 overflow-hidden w-full md:w-auto">
            {["all","article","video","podcast","technique"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  activeType === t
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {t === "all" ? "All" : TYPE_META[t].label}
              </button>
            ))}
          </div>

          <div className="relative md:ml-auto w-full md:w-80">
            <input
              type="text"
              placeholder="Search topics, tags, titles… (try “infertility”)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-emerald-200 bg-white/80 px-4 py-2.5 pr-10 text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <svg className="absolute right-3 top-2.5 h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
            </svg>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-emerald-700/80 bg-white/70 border border-emerald-200 rounded-xl p-6">
            No results. Try a different search or category.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
