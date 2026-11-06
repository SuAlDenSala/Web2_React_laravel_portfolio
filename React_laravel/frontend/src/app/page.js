"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const email = "dens@gmail.com";

  const [messages, setMessages] = useState([]);
  const [showInbox, setShowInbox] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    try {
      const savedTheme = localStorage.getItem("dens_theme");
      if (savedTheme !== null) {
        setDarkMode(savedTheme === "dark");
      }
      const savedMsgs = localStorage.getItem("dens_messages");
      if (savedMsgs) setMessages(JSON.parse(savedMsgs));
    } catch (e) {
      console.error(e);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    try {
      localStorage.setItem("dens_theme", nextTheme ? "dark" : "light");
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const newMsg = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject || "No Subject",
      message: formData.message,
      date: new Date().toLocaleString(),
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem("dens_messages", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem("dens_messages");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projects = [
    {
      id: 1,
      title: "Laravel + React Application",
      category: "Full Stack",
      desc: "Full-stack Web 2 platform built with Laravel 11, Inertia.js, and React 19.",
      tags: ["Laravel 11", "React 19", "Inertia.js", "Tailwind CSS"],
      link: "https://github.com",
    },
    {
      id: 2,
      title: "TriviaForge Quiz Engine",
      category: "Frontend",
      desc: "Custom trivia creator and leaderboard application with dynamic category filters.",
      tags: ["Next.js", "React", "Tailwind CSS", "Local Storage"],
      link: "http://localhost/Trivi_Quiz/",
    },
    {
      id: 3,
      title: "RESTful Authentication API",
      category: "Backend/API",
      desc: "Secure API server built with Laravel Fortify, Passkeys, JWT, and MySQL.",
      tags: ["Laravel", "PHP 8.3", "REST API", "MySQL"],
      link: "https://github.com",
    },
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend/API"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const skills = [
    { category: "Frontend", items: ["React 19", "Next.js 16", "Tailwind CSS", "JavaScript", "TypeScript"] },
    { category: "Backend", items: ["Laravel 11", "PHP 8.3", "Node.js", "REST APIs", "Eloquent ORM"] },
    { category: "Tools & Databases", items: ["SQLite", "MySQL", "PostgreSQL", "Git", "Vite", "Linux"] },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        darkMode
          ? "bg-black text-white selection:bg-zinc-800 selection:text-white"
          : "bg-white text-zinc-900 selection:bg-zinc-200 selection:text-black"
      }`}
    >
      {/* Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? darkMode
              ? "bg-black/90 backdrop-blur-md border-b border-zinc-800 py-3"
              : "bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <div
              className={`w-8 h-8 rounded border flex items-center justify-center font-mono text-xs font-bold ${
                darkMode ? "border-white bg-black text-white" : "border-zinc-900 bg-white text-zinc-900"
              }`}
            >
              D
            </div>
            <span className="tracking-wider font-bold">DENS</span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-6 text-sm font-medium ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            <a href="#about" className={`transition-colors ${darkMode ? "hover:text-white" : "hover:text-black"}`}>
              About
            </a>
            <a href="#projects" className={`transition-colors ${darkMode ? "hover:text-white" : "hover:text-black"}`}>
              Projects
            </a>
            <a href="#skills" className={`transition-colors ${darkMode ? "hover:text-white" : "hover:text-black"}`}>
              Skills
            </a>
            <a href="#contact" className={`transition-colors ${darkMode ? "hover:text-white" : "hover:text-black"}`}>
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`px-3 py-1.5 rounded text-xs font-mono border transition-all flex items-center gap-1.5 ${
                darkMode
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-600"
                  : "bg-zinc-100 border-zinc-300 text-zinc-800 hover:border-zinc-500"
              }`}
              title="Toggle Light / Dark Mode"
            >
              <span>{darkMode ? "☀️ Light" : "🌙 Dark"}</span>
            </button>

            <a
              href="#contact"
              className={`hidden md:block px-4 py-1.5 rounded border text-xs font-medium transition-all ${
                darkMode
                  ? "border-zinc-700 bg-zinc-950 text-white hover:border-white"
                  : "border-zinc-300 bg-zinc-100 text-black hover:border-black"
              }`}
            >
              Contact Me
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 border rounded ${
                darkMode ? "border-zinc-800 text-white" : "border-zinc-300 text-black"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 mt-3 ${
              darkMode ? "bg-black border-zinc-800" : "bg-white border-zinc-200"
            }`}
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              About
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              Skills
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`pt-32 pb-20 md:pt-40 md:pb-28 border-b ${darkMode ? "border-zinc-900 bg-black" : "border-zinc-200 bg-white"}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-xs mb-6 font-mono ${
                  darkMode ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-zinc-100 border-zinc-300 text-zinc-700"
                }`}
              >
                <span className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? "bg-white" : "bg-black"}`}></span>
                Available for Web 2 Projects
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight mb-6">
                Hi, I&apos;m <span className={darkMode ? "underline decoration-zinc-600 underline-offset-8" : "underline decoration-zinc-400 underline-offset-8"}>Dens</span>. <br />
                Web Developer.
              </h1>

              <p className={`text-lg leading-relaxed mb-8 max-w-2xl ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                I build clean, simple, and high-performance web applications using React, Next.js, and Laravel.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#projects"
                  className={`px-6 py-3 rounded font-semibold text-xs tracking-wide uppercase transition-all ${
                    darkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
                  }`}
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className={`px-6 py-3 rounded border font-medium text-xs tracking-wide uppercase transition-all ${
                    darkMode ? "bg-black text-white border-zinc-700 hover:border-white" : "bg-white text-black border-zinc-300 hover:border-black"
                  }`}
                >
                  Contact Me
                </a>
              </div>

              <div
                className={`pt-6 border-t flex flex-wrap items-center gap-3 text-xs font-mono ${
                  darkMode ? "border-zinc-900 text-zinc-400" : "border-zinc-200 text-zinc-600"
                }`}
              >
                <span className={darkMode ? "text-zinc-500 uppercase" : "text-zinc-400 uppercase"}>Stack:</span>
                {["React", "Next.js", "Laravel", "Tailwind CSS", "PHP", "SQLite"].map((item) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 border rounded ${
                      darkMode ? "bg-zinc-950 border-zinc-800 text-zinc-200" : "bg-zinc-100 border-zinc-300 text-zinc-800"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 border-b ${darkMode ? "border-zinc-900 bg-black" : "border-zinc-200 bg-white"}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <span className={`text-xs font-mono uppercase tracking-widest block mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                // About
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Simple & Clean Web Development</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`border rounded-lg p-6 ${darkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                <h3 className="text-base font-bold mb-2">Frontend</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Building responsive, fast, and accessible user interfaces with React 19, Next.js, and Tailwind CSS.
                </p>
              </div>

              <div className={`border rounded-lg p-6 ${darkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                <h3 className="text-base font-bold mb-2">Backend</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Developing RESTful APIs, database migrations, and backend application logic with Laravel & PHP.
                </p>
              </div>

              <div className={`border rounded-lg p-6 ${darkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                <h3 className="text-base font-bold mb-2">Philosophy</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Focusing on minimalist design, clean code standards, and reliable functionality without unnecessary bloat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 border-b ${darkMode ? "border-zinc-900 bg-black" : "border-zinc-200 bg-white"}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className={`text-xs font-mono uppercase tracking-widest block mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  // Projects
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Selected Work</h2>
              </div>

              <div className={`flex flex-wrap gap-2 mt-4 md:mt-0 p-1 rounded border ${darkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-100 border-zinc-300"}`}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                      activeFilter === cat
                        ? darkMode
                          ? "bg-white text-black font-semibold"
                          : "bg-black text-white font-semibold"
                        : darkMode
                        ? "text-zinc-400 hover:text-white"
                        : "text-zinc-600 hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className={`border rounded-lg p-6 flex flex-col justify-between transition-all ${
                    darkMode ? "bg-zinc-950 border-zinc-800 hover:border-zinc-700" : "bg-zinc-50 border-zinc-200 hover:border-zinc-400 shadow-sm"
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-mono uppercase block mb-2 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{p.category}</span>
                    <h3 className="text-base font-bold mb-2">{p.title}</h3>
                    <p className={`text-xs leading-relaxed mb-6 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>{p.desc}</p>
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between ${darkMode ? "border-zinc-900" : "border-zinc-200"}`}>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className={`px-2 py-0.5 border text-[10px] font-mono rounded ${
                            darkMode ? "bg-black border-zinc-800 text-zinc-300" : "bg-white border-zinc-300 text-zinc-700"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-mono underline underline-offset-4 ${darkMode ? "text-white" : "text-black"}`}
                    >
                      Link →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 border-b ${darkMode ? "border-zinc-900 bg-black" : "border-zinc-200 bg-white"}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <span className={`text-xs font-mono uppercase tracking-widest block mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                // Skills
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Technical Stack</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((s) => (
                <div
                  key={s.category}
                  className={`border rounded-lg p-6 ${darkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b ${darkMode ? "border-zinc-900 text-white" : "border-zinc-200 text-zinc-900"}`}>
                    {s.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-1 border text-xs font-mono rounded ${
                          darkMode ? "bg-black border-zinc-800 text-zinc-200" : "bg-white border-zinc-300 text-zinc-800"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 border-b ${darkMode ? "border-zinc-900 bg-black" : "border-zinc-200 bg-white"}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <span className={`text-xs font-mono uppercase tracking-widest block mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                // Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Get In Touch</h2>
              <p className={`text-xs mt-1 max-w-md ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Have a project in mind or want to collaborate? Send a message below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className={`lg:col-span-5 border rounded-lg p-6 space-y-4 ${darkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                <h3 className="text-base font-bold">Direct Contact</h3>

                <div className={`p-3 border rounded flex items-center justify-between ${darkMode ? "bg-black border-zinc-800" : "bg-white border-zinc-300"}`}>
                  <div>
                    <span className={`text-[10px] font-mono block uppercase ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>Email</span>
                    <span className="text-xs font-mono font-semibold">{email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      darkMode ? "bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800" : "bg-zinc-100 text-black border-zinc-300 hover:bg-zinc-200"
                    }`}
                  >
                    {copied ? "Copied! ✓" : "Copy"}
                  </button>
                </div>

                <div className="pt-2 flex gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2 border rounded text-xs font-mono text-center transition-colors ${
                      darkMode ? "bg-black border-zinc-800 text-zinc-300 hover:text-white" : "bg-white border-zinc-300 text-zinc-700 hover:text-black"
                    }`}
                  >
                    GitHub
                  </a>
                </div>

                <div className={`pt-4 border-t ${darkMode ? "border-zinc-900" : "border-zinc-200"}`}>
                  <button
                    onClick={() => setShowInbox(!showInbox)}
                    className={`w-full py-2.5 border text-xs font-mono rounded transition-all flex items-center justify-center gap-2 ${
                      darkMode ? "bg-black hover:bg-zinc-900 border-zinc-800 text-white" : "bg-white hover:bg-zinc-100 border-zinc-300 text-black"
                    }`}
                  >
                    <svg className={`w-4 h-4 ${darkMode ? "text-white" : "text-black"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Inbox / Messages</span>
                    <span className={`px-2 py-0.5 font-bold rounded text-[10px] ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                      {messages.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Form & Inbox Viewer */}
              <div className={`lg:col-span-7 border rounded-lg p-6 ${darkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                {showInbox ? (
                  <div className="space-y-4 min-h-[300px] flex flex-col justify-between">
                    <div className={`flex items-center justify-between border-b pb-3 ${darkMode ? "border-zinc-800" : "border-zinc-200"}`}>
                      <h3 className="text-xs font-bold uppercase tracking-widest font-mono">
                        Inbox ({messages.length})
                      </h3>
                      {messages.length > 0 && (
                        <button
                          onClick={clearMessages}
                          className={`text-[10px] font-mono underline ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black"}`}
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {messages.length === 0 ? (
                      <div className={`py-12 text-center text-xs font-mono ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                        No messages received yet. Submit the contact form on the right to test!
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                        {messages.map((m) => (
                          <div
                            key={m.id}
                            className={`p-4 border rounded space-y-1.5 ${darkMode ? "bg-black border-zinc-800" : "bg-white border-zinc-300"}`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold font-mono">{m.name}</span>
                              <span className={`text-[10px] font-mono ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>{m.date}</span>
                            </div>
                            <div className={`text-[11px] font-mono ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{m.email}</div>
                            {m.subject && (
                              <div className={`text-xs font-semibold pt-1 border-t mt-1 ${darkMode ? "border-zinc-900 text-white" : "border-zinc-200 text-black"}`}>
                                Subject: {m.subject}
                              </div>
                            )}
                            <p className={`text-xs pt-1 whitespace-pre-wrap leading-relaxed ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                              {m.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => setShowInbox(false)}
                      className={`w-full py-2 border text-xs font-mono rounded transition-colors ${
                        darkMode ? "bg-black border-zinc-800 text-white hover:border-zinc-600" : "bg-white border-zinc-300 text-black hover:border-zinc-500"
                      }`}
                    >
                      ← Back to Contact Form
                    </button>
                  </div>
                ) : submitted ? (
                  <div className="min-h-[220px] flex flex-col items-center justify-center text-center space-y-2">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-base font-bold ${darkMode ? "border-white text-white" : "border-black text-black"}`}>
                      ✓
                    </div>
                    <h3 className="text-lg font-bold">Message Sent</h3>
                    <p className={`text-xs ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                      Thank you! Your message has been saved to your Inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className={`w-full px-3 py-2 border rounded text-xs focus:outline-none transition-colors ${
                            darkMode
                              ? "bg-black border-zinc-800 text-white placeholder-zinc-600 focus:border-white"
                              : "bg-white border-zinc-300 text-black placeholder-zinc-400 focus:border-black"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className={`w-full px-3 py-2 border rounded text-xs focus:outline-none transition-colors ${
                            darkMode
                              ? "bg-black border-zinc-800 text-white placeholder-zinc-600 focus:border-white"
                              : "bg-white border-zinc-300 text-black placeholder-zinc-400 focus:border-black"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Scope"
                        className={`w-full px-3 py-2 border rounded text-xs focus:outline-none transition-colors ${
                          darkMode
                            ? "bg-black border-zinc-800 text-white placeholder-zinc-600 focus:border-white"
                            : "bg-white border-zinc-300 text-black placeholder-zinc-400 focus:border-black"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Message</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your message..."
                        className={`w-full px-3 py-2 border rounded text-xs focus:outline-none transition-colors resize-none ${
                          darkMode
                            ? "bg-black border-zinc-800 text-white placeholder-zinc-600 focus:border-white"
                            : "bg-white border-zinc-300 text-black placeholder-zinc-400 focus:border-black"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-2.5 px-4 rounded font-semibold text-xs uppercase tracking-wider transition-colors ${
                        darkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
                      }`}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 border-t text-xs font-mono ${darkMode ? "bg-black border-zinc-900 text-zinc-400" : "bg-white border-zinc-200 text-zinc-600"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider">DENS</span>
            <span>|</span>
            <span>© {new Date().getFullYear()} Dens. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#about" className={darkMode ? "hover:text-white" : "hover:text-black"}>About</a>
            <a href="#projects" className={darkMode ? "hover:text-white" : "hover:text-black"}>Projects</a>
            <a href="#skills" className={darkMode ? "hover:text-white" : "hover:text-black"}>Skills</a>
            <a href="#contact" className={darkMode ? "hover:text-white" : "hover:text-black"}>Contact</a>
            <button
              onClick={scrollToTop}
              className={`px-2 py-1 border rounded transition-colors ${
                darkMode ? "bg-zinc-900 border-zinc-800 text-white hover:border-white" : "bg-zinc-100 border-zinc-300 text-black hover:border-black"
              }`}
            >
              ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
