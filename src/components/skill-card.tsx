
"use client";

import { Card, CardContent } from '@/components/ui/card';

interface SkillCardProps {
  name: string;
  level: number;
  icon: React.ReactNode;
}

export default function SkillCard({ name, level, icon }: SkillCardProps) {
  return (
    <div>
      <Card className="bg-card/50 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300 hover-lift border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {icon}
            <h4 className="text-sm font-semibold flex-grow">{name}</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
