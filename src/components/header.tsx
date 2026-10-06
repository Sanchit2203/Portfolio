
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BarChart3, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#internship', label: 'Experience' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#publications', label: 'Publications' },
    { href: '#contact', label: 'Contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            const sections = navLinks.map(link => {
                try {
                    return { id: link.href, el: document.querySelector(link.href) };
                } catch {
                    return { id: link.href, el: null };
                }
            });

            const scrollPosition = window.scrollY + 120;
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.el) {
                    const el = section.el as HTMLElement;
                    if (el.offsetTop <= scrollPosition) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            scrolled ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-border/50" : "bg-transparent"
        )}>
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <a href="#home" className="flex items-center gap-2.5 group">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg font-bold font-headline gradient-text">Sanchit</span>
                </a>
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                activeSection === link.href
                                    ? "text-primary bg-primary/10"
                                    : "text-foreground/60 hover:text-foreground hover:bg-secondary/50"
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            <div className={cn(
                "lg:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-xl border-b border-border/50",
                mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="px-6 py-4 flex flex-col gap-1">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                activeSection === link.href
                                    ? "text-primary bg-primary/10"
                                    : "text-foreground/60 hover:text-foreground hover:bg-secondary/50"
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
}
