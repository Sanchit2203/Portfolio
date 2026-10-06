
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SkillCardProps {
  name: string;
  level: number;
  icon: React.ReactNode;
}

export default function SkillCard({ name, level, icon }: SkillCardProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setProgress(level), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level]);

  return (
    <div ref={cardRef}>
      <Card className="bg-card/50 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300 hover-lift border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            {icon}
            <h4 className="text-sm font-semibold flex-grow">{name}</h4>
            <span className="text-xs font-mono text-primary">{progress}%</span>
          </div>
          <div className="skill-progress-bg h-1.5">
            <div className="skill-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
