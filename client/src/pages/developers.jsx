// src/components/developers.jsx
import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import KaushikImage from '../assets/kaushiknarayan.jpg';
import PrakarshImage from '../assets/prakarshawasthi.jpg';
import DeekshaImage from '../assets/deekshaimg.jpg';
import HardikImage from '../assets/Hardikimg.jpg';
import PratyakshImage from '../assets/Pratyakshimg.jpg';




const team = [
  {
    name: "PRAKARSH AWASTHI",
    role: "Full‑Stack Developer",
    // Replace null or empty string below with image import/path when ready
    img: PrakarshImage,
    links: {
      instagram: "https://www.instagram.com/prakarsh_34/",
      linkedin: "https://www.linkedin.com/in/prakarsh-awasthi-332614312/",
      github: "https://github.com/prakarsh34",
    },
  },
  {
    name: "HARDIK SAHNI",
    role: "Full-Stack Developer",
    img: HardikImage,
    links: {
      instagram: "https://www.instagram.com/_.hardiksahni._/",
      linkedin: "https://www.linkedin.com/in/hardik-sahni-175749320/",
      github: "https://github.com/hardik951",
    },
  },
  {
    name: "DEEKSHA SINGH",
    role: "AI/ML Developer",
    img: DeekshaImage,
    links: {
      instagram: "https://www.instagram.com/quaffle_2203/",
      linkedin: "https://www.linkedin.com/in/deeksha-singh-37441826b/",
      github: "https://github.com/Deeksha0403",
    },
  },
  {
    name: "KAUSHIK NARAYAN",
    role: "AI/ML Developer",
    // Replace null or empty string below with image import/path when ready
    img: KaushikImage,
    links: {
      instagram: "https://www.instagram.com/kaushik_narayan_47/",
      linkedin: "https://www.linkedin.com/in/kaushik-narayan-90626a325/",
      github: "https://github.com/AGENT47MARINE",
    },
  },
  {
    name: "PRATYAKSH RANA",
    role: "Computer Vision Developer",
    img: PratyakshImage,
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
    <div className="group rounded-2xl border border-emerald-800 bg-emerald-950/80 backdrop-blur-sm p-6 shadow-md hover:shadow-2xl hover:border-emerald-400 hover:-translate-y-2 hover:bg-emerald-900/80 transition-all duration-300 ease-out flex flex-col items-center justify-between min-h-[280px]">

      {/* Avatar */}
      <div className="mb-5 flex justify-center">
        {person.img ? (
          <img
            src={person.img}
            alt={`${person.name} avatar`}
            className="h-20 w-20 rounded-xl object-cover ring-2 ring-emerald-700 group-hover:ring-emerald-400 transition"
            loading="lazy"
          />
        ) : (
          <div className="h-20 w-20 rounded-xl grid place-items-center ring-2 ring-emerald-700 bg-emerald-900 text-emerald-200 font-semibold text-lg group-hover:ring-emerald-400 transition">
            {getInitials(person.name)}
          </div>
        )}
      </div>

      {/* Name & Role */}
      <div className="text-center flex-1">
        <h3 className="text-lg font-bold text-emerald-100 group-hover:text-white">
          {person.name}
        </h3>
        <p className="text-sm text-emerald-300 mt-1">{person.role}</p>
      </div>

      {/* Socials */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <a
          href={person.links.instagram}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg ring-1 ring-emerald-800 hover:ring-emerald-400 hover:bg-emerald-900 transition"
        >
          <FaInstagram className="h-4 w-4 text-emerald-300 hover:text-pink-400 transition" />
        </a>
        <a
          href={person.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg ring-1 ring-emerald-800 hover:ring-emerald-400 hover:bg-emerald-900 transition"
        >
          <FaLinkedin className="h-4 w-4 text-emerald-300 hover:text-blue-400 transition" />
        </a>
        <a
          href={person.links.github}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg ring-1 ring-emerald-800 hover:ring-emerald-400 hover:bg-emerald-900 transition"
        >
          <FaGithub className="h-4 w-4 text-emerald-300 hover:text-white transition" />
        </a>
      </div>
    </div>
  );
};

const Developers = () => {
  const firstRow = team.slice(0, 2);
  const secondRow = team.slice(2);

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-100 py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            Meet the Developers
          </h2>
          <p className="text-emerald-300 mt-2 text-base md:text-lg">
            A dedicated team building with passion.
          </p>
          <p className="text-emerald-300 mt-2 text-base md:text-lg">
            Team Code4Cause
          </p>
        </header>

        {/* Row 1: 2 cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {firstRow.map((p) => (
            <Card key={p.name} person={p} />
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {secondRow.map((p) => (
            <Card key={p.name} person={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;
