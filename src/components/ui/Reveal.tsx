"use client";

import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: "up" | "left" | "right" | "fade";
};

export default function Reveal({
    children,
    delay = 0,
    className = "",
    direction = "up",
}: RevealProps) {
    const [isVisible, setIsVisible] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const hiddenTransform = {
        up: "translate-y-6",
        left: "-translate-x-6",
        right: "translate-x-6",
        fade: "",
    }[direction];

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className} ${
                isVisible
                    ? "translate-x-0 translate-y-0 opacity-100"
                    : `${hiddenTransform} opacity-0`
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}