
"use client";

import { useState, useEffect } from 'react';

const words = ["Innovator", "Developer", "Problem Solver"];

const AnimatedText = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            const current = words[wordIndex];
            
            if (isDeleting) {
                // Deleting characters
                setCurrentWord(current.substring(0, charIndex - 1));
                charIndex--;
            } else {
                // Typing characters
                setCurrentWord(current.substring(0, charIndex + 1));
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === current.length) {
                // Pause at the end of the word
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to the next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            timeoutId = setTimeout(type, typeSpeed);
        };

        type();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isMounted]);

    if (!isMounted) {
        return <span className="text-2xl md:text-3xl font-medium text-accent font-headline">&nbsp;</span>;
    }

    return (
        <span className="text-2xl md:text-3xl font-medium text-accent font-headline">
            {currentWord}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export default AnimatedText;
