
"use client";

import { useState, useEffect } from 'react';

const words = ["Innovator", "Developer", "Problem Solver"];

const AnimatedText = () => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1000);
            return;
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
    }, [subIndex, index, reverse]);

    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink(prev => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    return (
        <span className="text-2xl md:text-3xl font-medium text-accent font-headline">
            {`${words[index].substring(0, subIndex)}`}
            <span className={cn('transition-opacity', blink ? 'opacity-100' : 'opacity-0')}>|</span>
        </span>
    );
};

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export default AnimatedText;
