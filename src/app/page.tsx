
'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Briefcase,
  Building,
  Calendar,
  Code,
  Cpu,
  Database,
  Download,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  School,
  Users,
  Award,
} from "lucide-react";
import AnimatedText from "@/components/animated-text";
import SkillCard from "@/components/skill-card";
import Header from "@/components/header";
import ContactForm from "@/components/contact-form";
import ScrollTop from "@/components/scroll-top";

const skills = {
    programming: [
        { name: "Python", level: 90, icon: <Code className="h-8 w-8 text-primary" /> },
        { name: "C/C++", level: 85, icon: <Code className="h-8 w-8 text-primary" /> },
        { name: "Java", level: 80, icon: <Code className="h-8 w-8 text-primary" /> },
      ],
      web: [
        { name: "HTML/CSS", level: 90, icon: <Code className="h-8 w-8 text-primary" /> },
        { name: "DBMS", level: 85, icon: <Database className="h-8 w-8 text-primary" /> },
      ],
  tools: [
    { name: "MS Office", level: 95, icon: <Briefcase className="h-8 w-8 text-primary" /> },
    { name: "Project Management", level: 80, icon: <Briefcase className="h-8 w-8 text-primary" /> },
    { name: "Hardware", level: 75, icon: <Cpu className="h-8 w-8 text-primary" /> },
  ],
  soft: [
    { name: "Team Work", level: 95, icon: <Users className="h-8 w-8 text-primary" /> },
    { name: "Time Management", level: 90, icon: <Calendar className="h-8 w-8 text-primary" /> },
    { name: "Problem Solving", level: 85, icon: <Lightbulb className="h-8 w-8 text-primary" /> },
  ],
};

const education = [
  {
    institution: "Sharda University",
    degree: "B.Tech in Computer Science",
    period: "2022 – 2026",
    icon: <School className="h-8 w-8 text-primary" />,
  },
  {
    institution: "K.V. No.3 Delhi Cantt",
    degree: "12th Grade",
    period: "2021",
    icon: <School className="h-8 w-8 text-primary" />,
  },
  {
    institution: "K.V. No.3 Delhi Cantt",
    degree: "10th Grade",
    period: "2019",
    icon: <School className="h-8 w-8 text-primary" />,
  },
];

const projects = [
    {
        title: "Zygo - Ridesharing App",
        description: "A comprehensive ridesharing application developed to connect drivers and passengers seamlessly. Features real-time tracking, secure payments, and a rating system.",
        tags: ["Java", "SQLite", "Android"],
        icon: <Code className="h-10 w-10 text-accent" />
    },
    {
        title: "Stock Market Simulator",
        description: "A web-based platform that simulates stock market trading. Users can practice trading strategies with virtual money in a real-time market environment.",
        tags: ["HTML", "CSS", "JavaScript"],
        icon: <Code className="h-10 w-10 text-accent" />
    }
];

const certifications = [
    {
        title: "Ethical Hacking",
        issuer: "Internshala",
        icon: <Award className="h-12 w-12 mx-auto text-primary" />,
        description: "Learned ethical hacking concepts and penetration testing techniques."
    },
    {
        title: "Java Foundation",
        issuer: "Oracle",
        icon: <Award className="h-12 w-12 mx-auto text-primary" />,
        description: "Mastered foundational Java programming skills from Oracle."
    },
    {
        title: "Project Management",
        issuer: "NPTEL",
        icon: <Award className="h-12 w-12 mx-auto text-primary" />,
        description: "Completed NPTEL course on principles of project management."
    },
    {
        title: "DBMS & PL/SQL",
        issuer: "Oracle",
        icon: <Award className="h-12 w-12 mx-auto text-primary" />,
        description: "Gained expertise in database management and PL/SQL with Oracle."
    }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section id="home" className="min-h-screen flex items-center justify-center text-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute h-64 w-64 bg-primary rounded-full -top-16 -left-16 blur-3xl"></div>
                <div className="absolute h-64 w-64 bg-accent rounded-full -bottom-16 -right-16 blur-3xl"></div>
            </div>
            <div className="z-10 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary">Sanchit</h1>
                <h2 className="text-2xl md:text-3xl mt-2 text-foreground/80">Computer Science Engineer</h2>
                <div className="mt-4">
                    <AnimatedText />
                </div>
                <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-foreground/70">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>Patna, Bihar, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-accent" />
                        <span>+91 7428559522</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-accent" />
                        <span>sanchitsinha14@gmail.com</span>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        <a href="https://www.linkedin.com/in/sanchit2203" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </a>
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Download CV
                    </Button>
                </div>
            </div>
        </section>

        <section id="about" className="py-20 px-4 container mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl font-headline font-bold text-center mb-12 text-primary">About Me</h2>
          <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center text-lg leading-relaxed text-foreground/80">
              <p>
                I am a dynamic and open-minded Computer Science Engineer with a fervent passion for experimentation, continuous learning, and creating impactful solutions. My journey in technology is driven by a curiosity to explore new domains and a commitment to solving complex problems with innovative and efficient code.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="skills" className="py-20 px-4 bg-background animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="container mx-auto">
                <h2 className="text-4xl font-headline font-bold text-center mb-12 text-primary">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-headline text-accent text-center">Programming</h3>
                        {skills.programming.map(skill => <SkillCard key={skill.name} {...skill} />)}
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-headline text-accent text-center">Web & Database</h3>
                        {skills.web.map(skill => <SkillCard key={skill.name} {...skill} />)}
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-headline text-accent text-center">Tools & Technologies</h3>
                        {skills.tools.map(skill => <SkillCard key={skill.name} {...skill} />)}
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-headline text-accent text-center">Soft Skills</h3>
                        {skills.soft.map(skill => <SkillCard key={skill.name} {...skill} />)}
                    </div>
                </div>
            </div>
        </section>

        <section id="education" className="py-20 px-4 container mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-4xl font-headline font-bold text-center mb-16 text-primary">Education</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
            {education.map((edu, index) => (
              <div key={index} className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-5/12">
                  <Card className={`p-6 bg-card/50 backdrop-blur-sm ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <h3 className="text-xl font-bold font-headline text-accent">{edu.institution}</h3>
                    <p className="text-md text-foreground/80">{edu.degree}</p>
                    <p className="text-sm text-foreground/60 mt-2">{edu.period}</p>
                  </Card>
                </div>
                <div className="z-10 flex items-center justify-center w-2/12">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
                     {React.cloneElement(edu.icon, {className: "h-4 w-4 text-primary-foreground"})}
                  </div>
                </div>
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-20 px-4 bg-background animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="container mx-auto">
                <h2 className="text-4xl font-headline font-bold text-center mb-12 text-primary">Projects</h2>
                <Carousel className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {projects.map((project, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="bg-card/50 backdrop-blur-sm">
                                        <CardContent className="flex flex-col md:flex-row items-center justify-center p-6 gap-6">
                                            <div className="text-center md:text-left">
                                                <div className="flex items-center gap-4 mb-4">
                                                     {project.icon}
                                                    <h3 className="text-2xl font-bold font-headline text-accent">{project.title}</h3>
                                                </div>
                                                <p className="text-foreground/80 mb-4">{project.description}</p>
                                                <div className="flex gap-2 flex-wrap">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>

        <section id="certifications" className="py-20 px-4 container mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-4xl font-headline font-bold text-center mb-12 text-primary">Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {certifications.map((cert, index) => (
                    <div key={index} className="flip-card h-64">
                        <div className="flip-card-inner relative w-full h-full">
                            <div className="flip-card-front absolute w-full h-full">
                                <Card className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-card/50 backdrop-blur-sm">
                                    {cert.icon}
                                    <h3 className="text-xl font-bold font-headline mt-4 text-accent">{cert.title}</h3>
                                    <p className="text-foreground/80">{cert.issuer}</p>
                                </Card>
                            </div>
                            <div className="flip-card-back absolute w-full h-full">
                               <Card className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-secondary">
                                    <h3 className="text-xl font-bold font-headline text-accent">{cert.title}</h3>
                                    <p className="text-foreground/80 mt-2">{cert.description}</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section id="internship" className="py-20 px-4 bg-background animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-headline font-bold mb-12 text-primary">Internship Experience</h2>
                <Card className="max-w-3xl mx-auto text-left bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <Building className="h-8 w-8 text-accent"/>
                            <div >
                                <span className="text-2xl font-headline">Rajpati and Associates</span>
                                <p className="text-sm text-foreground/60 font-normal">June – July 2025</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/80">
                            Developed and deployed a comprehensive Internship Management System. The system streamlined the application process by allowing resume uploads and automated key tasks, including the generation of offer letters and completion certificates. This project enhanced operational efficiency and provided a seamless experience for both interns and administrators.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
      </main>

      <footer id="contact" className="bg-secondary py-12 px-4 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-headline font-bold text-primary mb-4">Get In Touch</h3>
            <p className="text-foreground/70 mb-8">
              Have a project in mind or want to connect? Feel free to send me a message.
            </p>
            <ContactForm />
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-3xl font-headline font-bold text-primary mb-4">Sanchit</h3>
            <p className="text-foreground/70 mb-6">Innovator | Developer | Problem Solver</p>
            <div className="flex justify-center md:justify-end gap-4">
              <a href="https://www.linkedin.com/in/sanchit2203" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition-colors">
                <Linkedin className="h-8 w-8" />
              </a>
              <a href="https://github.com/sanchit2203" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition-colors">
                <Github className="h-8 w-8" />
              </a>
            </div>
             <p className="text-sm text-foreground/50 mt-8">© {new Date().getFullYear()} Sanchit Sinha. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      <ScrollTop />
    </div>
  );
}
