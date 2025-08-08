
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const words = ["Innovator", "Developer", "Problem Solver"];

const AnimatedText = () => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        if (subIndex === words[index].length && !reverse) {
            const timer = setTimeout(() => setReverse(true), 2000);
            return () => clearTimeout(timer);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, 150);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, isMounted]);

    if (!isMounted) {
        return <span className="text-2xl md:text-3xl font-medium text-accent font-headline">&nbsp;</span>;
    }

    return (
        <span className="text-2xl md:text-3xl font-medium text-accent font-headline">
            {`${words[index].substring(0, subIndex)}`}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export default AnimatedText;
