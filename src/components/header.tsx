
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Code2 } from 'lucide-react';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certs' },
    { href: '#internship', label: 'Internship' },
    { href: '#contact', label: 'Contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            const sections: (Element | null)[] = navLinks.map(link => {
                try {
                    return document.querySelector(link.href);
                } catch (e) {
                    return null;
                }});
            const scrollPosition = window.scrollY + 100; // Adjust offset if needed

        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
        )}>
            <div className="container mx-auto flex items-center justify-between p-4">
                <a href="#home" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
                    <Code2 />
                    <span>Sanchit</span>
                </a>
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                        <a 
                          key={link.href} 
                          href={link.href}
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            activeSection === link.href ? "text-primary" : "text-foreground/70"
                          )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
