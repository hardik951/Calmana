// src/pages/Resources.jsx
import React, { useMemo, useState } from "react";
import { FaExternalLinkAlt, FaBookOpen, FaPlayCircle, FaPodcast, FaLeaf } from "react-icons/fa";

// --- Full Resources List ---
const ALL_RESOURCES = [
  // --- Articles ---
  {
    id: "art-1",
    type: "article",
    title: "Understanding Anxiety: A Beginner’s Guide",
    description: "What anxiety is, how it shows up in the body, and first steps to manage it.",
    url: "https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet",
    tags: ["anxiety", "education", "beginners"],
    duration: "6 min read",
  },
  {
    id: "art-2",
    type: "article",
    title: "Building a Journaling Habit",
    description: "Simple frameworks to turn journaling into a supportive daily routine.",
    url: "https://psychcentral.com/lib/the-health-benefits-of-journaling",
    tags: ["journaling", "habits", "self-care"],
    duration: "5 min read",
  },
  {
    id: "art-3",
    type: "article",
    title: "Coping with Infertility: Emotional Support and Next Steps",
    description:
      "Practical strategies for managing emotional stress, setting boundaries, and planning next steps during fertility challenges.",
    url: "https://healthtalk.unchealthcare.org/4-ways-to-cope-with-the-emotions-of-infertility/",
    tags: ["infertility", "emotions", "coping", "support"],
    duration: "5 min read",
  },
  {
    id: "art-4",
    type: "article",
    title: "The Infertility Journey: A Guide for Coping",
    description:
      "Recognize infertility as a shared journey—become informed, reach out for support, and manage what you can control.",
    url: "https://www.pinerest.org/newsroom/articles/coping-with-infertility-blog/",
    tags: ["infertility", "couple", "support groups", "self-care"],
    duration: "7 min read",
  },
  {
    id: "art-5",
    type: "article",
    title: "8 Suggestions for Coping with the Stress of Infertility",
    description:
      "Evidence-informed tips: mental health check-up, self-care, reframing thoughts, and staying connected.",
    url: "https://www.rmany.com/blog/suggestions-for-coping-with-the-stress-of-infertility",
    tags: ["infertility", "stress", "self-compassion", "mental health"],
    duration: "6 min read",
  },
  {
    id: "art-6",
    type: "article",
    title: "Navigating the Emotional and Relationship Impact of Infertility",
    description:
      "How infertility affects relationships—and how couples can communicate, grieve, and seek support together.",
    url: "https://www.verywellmind.com/navigating-the-impact-of-infertility-on-relationships-8634097",
    tags: ["infertility", "relationships", "therapy", "communication"],
    duration: "8 min read",
  },
  {
    id: "art-7",
    type: "article",
    title: "Depression: What You Need to Know",
    description:
      "NIMH overview of depression symptoms, causes, and treatments.",
    url: "https://www.nimh.nih.gov/health/publications/depression",
    tags: ["depression", "education", "mental health"],
    duration: "7 min read",
  },
  {
    id: "art-8",
    type: "article",
    title: "Suicide Prevention: Help and Resources",
    description:
      "CDC guidance on recognizing warning signs, supporting others, and getting help.",
    url: "https://www.cdc.gov/suicide/resources/index.html",
    tags: ["suicide", "prevention", "support", "safety"],
    duration: "6 min read",
  },
  // --- Additional Articles ---
  {
    id: "art-9",
    type: "article",
    title: "Managing Panic Attacks",
    description: "Practical strategies to reduce the intensity and frequency of panic attacks.",
    url: "https://www.anxietycanada.com/articles/panic-attacks/",
    tags: ["anxiety", "panic", "self-help"],
    duration: "6 min read",
  },
  {
    id: "art-10",
    type: "article",
    title: "Overcoming Social Anxiety",
    description: "Tips and exercises to face social situations with confidence.",
    url: "https://www.healthline.com/health/social-anxiety",
    tags: ["social anxiety", "confidence", "coping"],
    duration: "7 min read",
  },
  {
    id: "art-11",
    type: "article",
    title: "Mindfulness for Stress Reduction",
    description: "How daily mindfulness practice can reduce stress and improve well-being.",
    url: "https://www.mindful.org/mindfulness-for-stress-reduction/",
    tags: ["mindfulness", "stress", "meditation"],
    duration: "8 min read",
  },
  {
    id: "art-12",
    type: "article",
    title: "Sleep Hygiene for Mental Health",
    description: "Effective habits for better sleep and mental health improvement.",
    url: "https://www.sleepfoundation.org/sleep-hygiene",
    tags: ["sleep", "habits", "mental health"],
    duration: "6 min read",
  },

  // --- Videos ---
  {
    id: "vid-1",
    type: "video",
    title: "5-Minute Box Breathing",
    description: "Guided box-breathing practice for grounding and calm.",
    url: "https://www.youtube.com/watch?v=tEmt1Znux58",
    tags: ["breathing", "anxiety", "technique"],
    duration: "5:12",
  },
  {
    id: "vid-2",
    type: "video",
    title: "Progressive Muscle Relaxation",
    description: "Release tension in the body with a short PMR routine.",
    url: "https://www.youtube.com/watch?v=86HUcX8ZtAk",
    tags: ["relaxation", "sleep", "technique"],
    duration: "7:45",
  },
  {
    id: "vid-3",
    type: "video",
    title: "Understanding Depression",
    description: "Educational video explaining depression and coping strategies.",
    url: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
    tags: ["depression", "education", "coping"],
    duration: "4:32",
  },
  {
    id: "vid-4",
    type: "video",
    title: "Guided Meditation for Anxiety",
    description: "15-minute guided meditation to calm anxious thoughts.",
    url: "https://www.youtube.com/watch?v=MIr3RsUWrdo",
    tags: ["meditation", "anxiety", "relaxation"],
    duration: "15:00",
  },
  {
    id: "vid-5",
    type: "video",
    title: "Yoga for Mental Wellness",
    description: "Gentle yoga routine to release stress and improve mood.",
    url: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    tags: ["yoga", "stress", "wellness"],
    duration: "12:34",
  },
  {
    id: "vid-6",
    type: "video",
    title: "Understanding PTSD",
    description: "Educational video about PTSD symptoms and coping strategies.",
    url: "https://www.youtube.com/watch?v=QieXKqg-rn0",
    tags: ["ptsd", "trauma", "mental health"],
    duration: "9:20",
  },

  // --- Podcasts ---
  {
    id: "pod-1",
    type: "podcast",
    title: "Daily Mindset Reset",
    description: "Short reflective prompts to start your day with intention.",
    url: "https://open.spotify.com/episode/3Ieu5aIpw66NQ3fONgkL5H",
    tags: ["mindfulness", "morning", "routine"],
    duration: "12 min",
  },
  {
    id: "pod-2",
    type: "podcast",
    title: "Depression and Recovery",
    description: "Stories and strategies from people who have lived through depression.",
    url: "https://open.spotify.com/episode/7mUWWn5YvW6fbi5pVtEXZ1",
    tags: ["depression", "stories", "healing"],
    duration: "28 min",
  },
  {
    id: "pod-3",
    type: "podcast",
    title: "Anxiety Slayer",
    description: "Weekly tips and strategies for managing anxiety and stress.",
    url: "https://open.spotify.com/show/1a2b3c4d5e6f",
    tags: ["anxiety", "coping", "mindfulness"],
    duration: "30 min",
  },
  {
    id: "pod-4",
    type: "podcast",
    title: "Mental Health Happy Hour",
    description: "Interviews and stories about mental health journeys.",
    url: "https://open.spotify.com/show/2b3c4d5e6f7g",
    tags: ["mental health", "stories", "wellness"],
    duration: "45 min",
  },

  // --- Techniques / Tools ---
  {
    id: "tec-1",
    type: "technique",
    title: "R.A.I.N. for Difficult Emotions",
    description: "Recognize, Allow, Investigate, Nurture—step-by-step guide.",
    url: "https://www.mindful.org/tara-brach-rain-mindfulness-practice/",
    tags: ["mindfulness", "emotions", "self-compassion"],
    duration: "Guide",
  },
  {
    id: "tec-2",
    type: "technique",
    title: "Thought Record (CBT)",
    description: "Challenge unhelpful thoughts using a simple CBT worksheet.",
    url: "https://www.therapistaid.com/therapy-worksheet/thought-record/cbt",
    tags: ["cbt", "worksheet", "anxiety"],
    duration: "Worksheet",
  },
  {
    id: "tec-3",
    type: "technique",
    title: "Safety Planning Guide",
    description: "A step-by-step plan to stay safe during suicidal thoughts.",
    url: "https://sprc.org/online-library/safety-planning-guide-a-quick-guide-for-clinicians/",
    tags: ["suicide prevention", "safety", "crisis plan"],
    duration: "Guide",
  },
  {
    id: "tec-4",
    type: "technique",
    title: "Progressive Muscle Relaxation",
    description: "Step-by-step guide to relieve stress through muscle relaxation.",
    url: "https://www.anxietycanada.com/sites/default/files/PMR.pdf",
    tags: ["relaxation", "stress", "technique"],
    duration: "Guide",
  },
  {
    id: "tec-5",
    type: "technique",
    title: "CBT Thought Challenging",
    description: "Worksheet to challenge negative thoughts and reframe thinking patterns.",
    url: "https://www.therapistaid.com/therapy-worksheet/thought-record/cbt",
    tags: ["cbt", "worksheet", "mental health"],
    duration: "Worksheet",
  },
];

// --- Type metadata ---
const TYPE_META = {
  article: { label: "Articles", icon: <FaBookOpen className="inline-block mr-2" /> },
  video:   { label: "Videos",   icon: <FaPlayCircle className="inline-block mr-2" /> },
  podcast: { label: "Podcasts", icon: <FaPodcast className="inline-block mr-2" /> },
  technique:{label: "Techniques",icon: <FaLeaf className="inline-block mr-2" /> },
};

// --- Resource Card ---

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
        {meta?.icon}
        {meta?.label}
      </div>
      <h3 className="text-lg font-bold text-emerald-900">{item.title}</h3>
      <p className="mt-2 text-emerald-800/80 text-sm leading-relaxed line-clamp-3">
        {item.description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {item.tags?.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
          >
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

// --- Main Resources Component ---
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
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900">Resource Library</h1>
          <p className="mt-1 text-emerald-800/80">
            Curated articles, videos, podcasts, and practical techniques to support your well-being.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
          <div className="flex rounded-full border border-emerald-200 bg-white/80 overflow-hidden w-full md:w-auto">
            {["all", "article", "video", "podcast", "technique"].map((t) => (
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
              placeholder="Search topics, tags, titles… (try “depression” or “infertility”)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-emerald-200 bg-white/80 px-4 py-2.5 pr-10 text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
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
