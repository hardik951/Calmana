// src/components/developers.jsx
import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const team = [
  {
    name: "PRAKARSH AWASTHI",
    role: "Full‑Stack Engineer",
    img: "",
    links: {
      instagram: "https://instagram.com/your_handle",
      linkedin: "https://www.linkedin.com/in/your_handle",
      github: "https://github.com/your_handle",
    },
  },
  {
    name: "HARDIK SAHNI",
    role: "Backend Engineer",
    img: "",
    links: {
      instagram: "https://instagram.com/your_handle",
      linkedin: "https://www.linkedin.com/in/your_handle",
      github: "https://github.com/your_handle",
    },
  },
  {
    name: "DEEKSHA SINGH",
    role: "Frontend Engineer",
    img: "",
    links: {
      instagram: "https://instagram.com/your_handle",
      linkedin: "https://www.linkedin.com/in/your_handle",
      github: "https://github.com/your_handle",
    },
  },
  {
    name: "KAUSHIK NARAYAN",
    role: "DevOps & Cloud",
    img: "",
    links: {
      instagram: "https://instagram.com/your_handle",
      linkedin: "https://www.linkedin.com/in/your_handle",
      github: "https://github.com/your_handle",
    },
  },
  {
    name: "PRATYAKSH RANA",
    role: "Mobile Engineer",
    img: "",
    links: {
      instagram: "https://instagram.com/your_handle",
      linkedin: "https://www.linkedin.com/in/your_handle",
      github: "https://github.com/your_handle",
    },
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

const Card = ({ person }) => {
  return (
    <div className="group rounded-2xl border border-emerald-800 bg-emerald-950/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300">
      {/* Avatar */}
      <div className="mb-4">
        {person.img ? (
          <img
            src={person.img}
            alt={`${person.name} avatar`}
            className="h-20 w-20 rounded-xl object-cover ring-1 ring-emerald-800"
            loading="lazy"
          />
        ) : (
          <div className="h-20 w-20 rounded-xl grid place-items-center ring-1 ring-emerald-800 bg-emerald-900 text-emerald-200 font-semibold">
            {getInitials(person.name)}
          </div>
        )}
      </div>

      {/* Name & Role */}
      <h3 className="text-base sm:text-lg font-bold text-emerald-100 leading-tight">
        {person.name}
      </h3>
      <p className="text-sm text-emerald-300 mt-1">{person.role}</p>

      {/* Socials */}
      <div className="mt-3 flex items-center gap-3 text-emerald-300">
        <a
          href={person.links.instagram}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-lg ring-1 ring-emerald-800 hover:ring-emerald-400 hover:bg-emerald-900 transition"
        >
          <FaInstagram className="h-4 w-4" />
        </a>
        <a
          href={person.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-lg ring-1 ring-emerald-800 hover:ring-emerald-400 hover:bg-emerald-900 transition"
        >
          <FaLinkedin className="h-4 w-4" />
        </a>
        <a
          href={person.links.github}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-lg ring-1 ring-emerald-800 hover:ring-emerald-400 hover:bg-emerald-900 transition"
        >
          <FaGithub className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

const Developers = () => {
  const firstRow = team.slice(0, 2);
  const secondRow = team.slice(2);

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-100">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Meet the Developers</h2>
          <p className="text-emerald-300 mt-1">
            A dedicated team building with passion.
          </p>
        </header>

        {/* Row 1: 2 cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {firstRow.map((p) => (
            <Card key={p.name} person={p} />
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {secondRow.map((p) => (
            <Card key={p.name} person={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;