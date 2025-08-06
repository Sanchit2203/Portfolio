
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Button
            variant="default"
            size="icon"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 rounded-full h-12 w-12 transition-opacity duration-300 z-50",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <ArrowUp className="h-6 w-6" />
        </Button>
    );
}
