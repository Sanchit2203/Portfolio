
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGithub, FaAws, FaDatabase, FaVuejs, FaHtml5, FaCss3, FaJs, FaGitAlt } from 'react-icons/fa'; // Example icons
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiCplusplus, SiCsharp, SiUnity, SiBlender } from 'react-icons/si'; // Example icons


interface SkillCardProps {  
  name: string;
  level: number;
  icon: React.ReactNode;
}

export default function SkillCard({ name, level, icon }: SkillCardProps) {
  const [progress, setProgress] = useState(0);

  const iconMap: { [key: string]: IconType } = {
    React: FaReact,
    Node.js: FaNodeJs,
    Python: FaPython,
    Docker: FaDocker,
    GitHub: FaGithub,
    AWS: FaAws,
    Database: FaDatabase,
    Vue.js: FaVuejs,
    HTML5: FaHtml5,
    CSS3: FaCss3,
    JavaScript: FaJs,
    Git: FaGitAlt,
    TypeScript: SiTypescript,
    Next.js: SiNextdotjs,
    TailwindCSS: SiTailwindcss,
    MongoDB: SiMongodb,
    PostgreSQL: SiPostgresql,
    'C++': SiCplusplus,
    'C#': SiCsharp,
    Unity: SiUnity,
  };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-2">
          {icon}
 {iconMap[name] && React.createElement(iconMap[name], { size: 24 })}
 <h4 className="text-lg font-semibold flex-grow">{name}</h4>
        </div>

      </CardContent>
    </Card>
  );
}
