
"use client";

import { useState, useEffect } from 'react';

const words = ["Data Analyst", "BI Analyst", "SQL Developer", "Dashboard Builder", "Python Enthusiast"];

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
                setCurrentWord(current.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setCurrentWord(current.substring(0, charIndex + 1));
                charIndex++;
            }

            let typeSpeed = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            timeoutId = setTimeout(type, typeSpeed);
        };

        type();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isMounted]);

    if (!isMounted) {
        return <span className="text-2xl md:text-3xl font-medium gradient-text font-headline">&nbsp;</span>;
    }

    return (
        <span className="text-2xl md:text-3xl font-medium gradient-text font-headline">
            {currentWord}
            <span className="animate-pulse text-primary">|</span>
        </span>
    );
};

export default AnimatedText;
