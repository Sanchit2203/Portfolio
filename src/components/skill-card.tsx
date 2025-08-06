
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillCardProps {
  name: string;
  level: number;
  icon: React.ReactNode;
}

export default function SkillCard({ name, level, icon }: SkillCardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-2">
          {icon}
          <h4 className="text-lg font-semibold flex-grow">{name}</h4>
          <span className="text-sm font-mono text-primary">{level}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  );
}
