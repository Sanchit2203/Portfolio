'use client';
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  ChevronRight,
  Code,
  Database,
  Download,
  ExternalLink,
  FileSpreadsheet,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  PieChart,
  Terminal,
  TrendingUp,
} from "lucide-react";
import AnimatedText from "@/components/animated-text";
import SkillCard from "@/components/skill-card";
import Header from "@/components/header";
import ContactForm from "@/components/contact-form";
import ScrollTop from "@/components/scroll-top";

/* ─── Data ─── */

const skills = {
  databases: [
    { name: "SQL (Joins, CTEs, Window Fns)", level: 90, icon: <Database className="h-5 w-5 text-primary" /> },
    { name: "PostgreSQL", level: 85, icon: <Database className="h-5 w-5 text-primary" /> },
    { name: "MySQL", level: 80, icon: <Database className="h-5 w-5 text-primary" /> },
    { name: "Firebase", level: 70, icon: <Database className="h-5 w-5 text-primary" /> },
  ],
  programming: [
    { name: "Python", level: 85, icon: <Code className="h-5 w-5 text-accent" /> },
    { name: "NumPy", level: 80, icon: <Code className="h-5 w-5 text-accent" /> },
    { name: "Pandas", level: 85, icon: <Code className="h-5 w-5 text-accent" /> },
    { name: "Matplotlib / Seaborn", level: 80, icon: <Code className="h-5 w-5 text-accent" /> },
  ],
  visualization: [
    { name: "Power BI (DAX, Power Query)", level: 88, icon: <PieChart className="h-5 w-5 text-primary" /> },
    { name: "Data Modeling & KPIs", level: 85, icon: <BarChart3 className="h-5 w-5 text-primary" /> },
    { name: "MS Excel (Power Pivot)", level: 90, icon: <FileSpreadsheet className="h-5 w-5 text-primary" /> },
    { name: "Google Sheets", level: 85, icon: <FileSpreadsheet className="h-5 w-5 text-primary" /> },
  ],
  tools: [
    { name: "Git / GitHub", level: 80, icon: <Terminal className="h-5 w-5 text-accent" /> },
    { name: "Jupyter Notebook", level: 85, icon: <Layout className="h-5 w-5 text-accent" /> },
    { name: "VS Code", level: 90, icon: <Code className="h-5 w-5 text-accent" /> },
    { name: "AI-Assisted Analysis", level: 75, icon: <TrendingUp className="h-5 w-5 text-accent" /> },
  ],
};

const education = [
  {
    institution: "Sharda University",
    degree: "B.Tech – Computer Science and Engineering",
    detail: "CGPA: 8.022",
    location: "Uttar Pradesh, India",
    period: "Sep 2022 – Jun 2026",
  },
  {
    institution: "K.V. No.3, Delhi Cantt",
    degree: "Senior Secondary – Science (PCM)",
    detail: "Percentage: 79.4%",
    location: "New Delhi, India",
    period: "Mar 2020 – Apr 2021",
  },
];

const projects = [
  {
    title: "Data Analysis using SQL",
    description:
      "End-to-end analysis of real-world job market data in PostgreSQL to uncover hiring trends, salary insights, and in-demand skills. Performed data cleaning and quality checks on CSV datasets, then used joins, aggregation, filtering, CTEs, and window functions to generate actionable business insights.",
    tags: ["SQL", "PostgreSQL", "VS Code", "CSV Datasets", "GitHub"],
    date: "July 2024",
    icon: <Database className="h-8 w-8" />,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Data Analysis using Python",
    description:
      "End-to-end exploratory data analysis (EDA) on real-world datasets to uncover trends, patterns, and actionable insights. Performed data cleaning, preprocessing, feature engineering, and statistical analysis, and built visualizations with Matplotlib and Seaborn.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "GitHub"],
    date: "August 2024",
    icon: <Code className="h-8 w-8" />,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    title: "Data Visualization using Power BI",
    description:
      "Built interactive Power BI dashboards that turn raw data into business insights, using Power Query for data cleaning and transformation, data modeling, and DAX for measures and KPIs. Designed dynamic, KPI-driven reports with charts, slicers, and drill-through functionality.",
    tags: ["Power BI", "DAX", "Power Query", "Data Modeling"],
    date: "August 2025",
    icon: <PieChart className="h-8 w-8" />,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
];

const certifications = [
  { title: "Power BI Master Class", subtitle: "Data Models & DAX Formulas", issuer: "Udemy" },
  { title: "SQL (Basic & Intermediate)", subtitle: "Certified Problem Solver", issuer: "HackerRank" },
  { title: "Python Course for Beginners", subtitle: "Fundamentals & Scripting", issuer: "Scaler" },
  { title: "Database Foundation", subtitle: "Oracle Academy Certified", issuer: "Oracle" },
  { title: "SQL for Beginners", subtitle: "Query Fundamentals", issuer: "Scaler" },
];

const publications = [
  {
    type: "Book Chapter",
    title: "Extended Reality and Immersive Multimedia for Gaming Applications",
    venue: "Published by Springer (2025) in Multimedia Technologies in the Internet of Things Environment, Vol. 4",
    link: "https://link.springer.com/chapter/10.1007/978-981-96-4356-1_11",
  },
  {
    type: "Conference Paper",
    title: "From Public Sentiment to Practical Solution: A Multifunctional Android Application for GST Awareness and Compliance in India",
    venue: "Presented at EmergIN 2025 & published in IEEE Xplore",
    link: "https://ieeexplore.ieee.org/document/11450838",
  },
];

/* ─── Scroll Animation Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`py-24 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-headline font-bold gradient-text inline-block">{children}</h2>
      <div className="section-divider mt-4" />
    </div>
  );
}

/* ─── Floating Particles ─── */
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-20px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stat Counter ─── */
function StatCard({ value, label, suffix = "" }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="text-center group">
      <div className="text-3xl md:text-4xl font-bold font-headline gradient-text">
        {value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">{label}</div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section id="home" className="min-h-screen flex items-center justify-center text-center p-4 relative overflow-hidden">
          <Particles />
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-32 h-96 w-96 bg-primary/5 rounded-full blur-[100px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 -right-32 h-96 w-96 bg-accent/5 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

          <div className="z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-8">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Open to work · Entry-level Data Analyst
            </div>

            <h1 className="text-6xl md:text-8xl font-headline font-bold gradient-text leading-tight">
              Sanchit
            </h1>
            <div className="mt-4">
              <AnimatedText />
            </div>

            <p className="mt-6 text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Turning raw data into clear, actionable business insights with SQL, Python, Excel & Power BI.
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-foreground/50 text-sm">
              <a href="mailto:sanchitsinha14@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> sanchitsinha14@gmail.com
              </a>
              <a href="tel:+919267906320" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> +91-9267906320
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> India
              </span>
            </div>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 rounded-xl">
                <a href="https://www.linkedin.com/in/sanchit2203" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" className="border-border hover:bg-secondary/50 rounded-xl">
                <a href="https://github.com/Sanchit2203" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl">
                <a href="https://drive.google.com/file/d/1JWxa7khCboCZG5ouS8EpzVKsuXbKfa2y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <Section id="about">
          <div className="container mx-auto max-w-5xl">
            <SectionTitle>About Me</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <Card className="glass border-border/30 rounded-2xl">
                  <CardContent className="p-8">
                    <p className="text-lg leading-relaxed text-foreground/80">
                      Entry-level Data Analyst with hands-on experience in <span className="text-primary font-medium">SQL</span>, <span className="text-primary font-medium">Python</span>, <span className="text-primary font-medium">Excel</span> and <span className="text-primary font-medium">Power BI</span>, applied across three end-to-end projects covering data cleaning and quality checks, exploratory and statistical analysis, and interactive KPI dashboards.
                    </p>
                    <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                      Published author (<span className="text-accent font-medium">Springer book chapter</span>; <span className="text-accent font-medium">IEEE conference paper</span> presented at EmergIN 2025) with experience documenting and presenting technical work. Seeking an entry-level Data Analyst role to turn raw data into clear, actionable business insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-2xl p-6 border border-border/30 hover-lift">
                    <StatCard value="3" label="End-to-End Projects" suffix="+" />
                  </div>
                  <div className="glass rounded-2xl p-6 border border-border/30 hover-lift">
                    <StatCard value="2" label="Publications" />
                  </div>
                  <div className="glass rounded-2xl p-6 border border-border/30 hover-lift">
                    <StatCard value="5" label="Certifications" suffix="+" />
                  </div>
                  <div className="glass rounded-2xl p-6 border border-border/30 hover-lift">
                    <StatCard value="8.0" label="CGPA" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── SKILLS ─── */}
        <Section id="skills" className="bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <SectionTitle>Skills & Technologies</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-headline font-semibold text-center flex items-center justify-center gap-2">
                  <Database className="h-5 w-5 text-primary" /> Databases & SQL
                </h3>
                {skills.databases.map(skill => <SkillCard key={skill.name} {...skill} />)}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-headline font-semibold text-center flex items-center justify-center gap-2">
                  <Code className="h-5 w-5 text-accent" /> Programming
                </h3>
                {skills.programming.map(skill => <SkillCard key={skill.name} {...skill} />)}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-headline font-semibold text-center flex items-center justify-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" /> Visualization
                </h3>
                {skills.visualization.map(skill => <SkillCard key={skill.name} {...skill} />)}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-headline font-semibold text-center flex items-center justify-center gap-2">
                  <Terminal className="h-5 w-5 text-accent" /> Tools
                </h3>
                {skills.tools.map(skill => <SkillCard key={skill.name} {...skill} />)}
              </div>
            </div>

            {/* Analysis skills as tags */}
            <div className="mt-12 text-center">
              <h3 className="text-lg font-headline font-semibold mb-4 text-muted-foreground">Analysis Expertise</h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {[
                  "Data Cleaning", "Exploratory Data Analysis (EDA)", "Feature Engineering",
                  "Statistical Analysis", "Data Quality Checks", "KPI Design",
                  "Data-Driven Decision Making", "Report Building"
                ].map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─── EDUCATION ─── */}
        <Section id="education">
          <div className="container mx-auto max-w-4xl">
            <SectionTitle>Education</SectionTitle>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-transparent md:-translate-x-px" />

              {education.map((edu, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Card */}
                  <div className={`md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className={`glass border-border/30 rounded-2xl hover-lift ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2 text-primary text-sm font-mono">
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </div>
                        <h3 className="text-xl font-bold font-headline text-foreground">{edu.institution}</h3>
                        <p className="text-foreground/70 mt-1">{edu.degree}</p>
                        <p className="text-primary font-semibold mt-1">{edu.detail}</p>
                        <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3" />
                          {edu.location}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2">
                    <div className="timeline-dot flex items-center justify-center">
                      <GraduationCap className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── PROJECTS ─── */}
        <Section id="projects" className="bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-8">
              {projects.map((project, index) => (
                <Card key={index} className={`glass border-border/30 rounded-2xl overflow-hidden hover-lift group`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Icon side */}
                      <div className={`p-8 flex items-center justify-center bg-gradient-to-br ${project.color} md:w-48 border-b md:border-b-0 md:border-r border-border/20`}>
                        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-primary ${project.borderColor} border bg-background/50`}>
                          {project.icon}
                        </div>
                      </div>
                      {/* Content side */}
                      <div className="p-8 flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-bold font-headline text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs font-mono text-muted-foreground whitespace-nowrap bg-secondary/50 px-3 py-1 rounded-full">
                            {project.date}
                          </span>
                        </div>
                        <p className="text-foreground/70 leading-relaxed mb-4">{project.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          {project.tags.map(tag => (
                            <span key={tag} className="tag-pill">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── INTERNSHIP ─── */}
        <Section id="internship">
          <div className="container mx-auto max-w-4xl">
            <SectionTitle>Experience</SectionTitle>
            <Card className="glass border-border/30 rounded-2xl overflow-hidden hover-lift">
              <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
              <CardHeader className="pb-2">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Building className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="text-2xl font-headline text-foreground">Rajpati and Associates</span>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="text-sm text-primary font-medium">Web Developer and Analyst</span>
                      <span className="text-sm text-muted-foreground">· Full-time · Hybrid</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" /> June 2025 – July 2025
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-foreground/80 leading-relaxed">
                  Developed an Internship Management System that streamlined student registration, resume uploads, and automated certificate generation, improving administrative workflow and user experience. Also performed analytical and report-making work alongside development.
                </p>
                <div className="flex gap-2 flex-wrap mt-4">
                  {["Web Development", "Analytics", "Report Making", "System Design", "Automation"].map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ─── CERTIFICATIONS ─── */}
        <Section id="certifications" className="bg-secondary/20">
          <div className="container mx-auto max-w-5xl">
            <SectionTitle>Certifications</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="glass border-border/30 rounded-2xl hover-lift group cursor-default">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold font-headline text-foreground group-hover:text-primary transition-colors">{cert.title}</h3>
                        <p className="text-sm text-foreground/60 mt-1">{cert.subtitle}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3" /> {cert.issuer}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── PUBLICATIONS ─── */}
        <Section id="publications">
          <div className="container mx-auto max-w-4xl">
            <SectionTitle>Publications & Presentations</SectionTitle>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <Card key={index} className="glass border-border/30 rounded-2xl hover-lift group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-5">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-accent/20 transition-colors">
                        <BookOpen className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {pub.type}
                        </span>
                        <h3 className="text-lg font-bold font-headline text-foreground mt-3 group-hover:text-accent transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-sm text-foreground/60 mt-2">{pub.venue}</p>
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                          View Publication <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

      </main>

      {/* ─── FOOTER / CONTACT ─── */}
      <footer id="contact" className="bg-card/50 border-t border-border/30 py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-5xl">
          <div>
            <h3 className="text-3xl font-headline font-bold gradient-text mb-2">Let&apos;s Connect</h3>
            <p className="text-foreground/50 mb-8">
              Have a data project or opportunity? I&apos;d love to hear from you.
            </p>
            <ContactForm />
          </div>
          <div className="md:text-right">
            <h3 className="text-3xl font-headline font-bold gradient-text mb-2">Sanchit Sinha</h3>
            <p className="text-foreground/50 mb-6">Data Analyst | BI Analyst</p>

            <div className="space-y-3 text-sm text-foreground/60">
              <a href="mailto:sanchitsinha14@gmail.com" className="flex items-center gap-2 md:justify-end hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> sanchitsinha14@gmail.com
              </a>
              <a href="tel:+919267906320" className="flex items-center gap-2 md:justify-end hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> +91-9267906320
              </a>
            </div>

            <div className="flex justify-start md:justify-end gap-3 mt-6">
              <a href="https://www.linkedin.com/in/sanchit2203" target="_blank" rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/Sanchit2203" target="_blank" rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
                <Github className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-border/20">
              <p className="text-xs text-foreground/30">© {new Date().getFullYear()} Sanchit Sinha. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      <ScrollTop />
    </div>
  );
}
