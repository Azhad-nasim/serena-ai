"use client";

import { Brain, Mic, Hand } from "lucide-react";
import { useEffect, useRef } from "react";

export function InterviewFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Add subtle floating animation to cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current?.querySelectorAll(".feature-card") || [];
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const features = [
    {
      icon: Mic,
      title: "Voice Analysis",
      description: "Get feedback on your tone, pace, and clarity",
      gradient: "from-purple-500 to-pink-500",
      delay: "0ms",
    },
    {
      icon: Hand,
      title: "Practice by AI ",
      description: "Improve your body language and expressions",
      gradient: "from-blue-500 to-cyan-500",
      delay: "100ms",
    },
    {
      icon: Brain,
      title: "AI Feedback",
      description: "Receive personalized improvement suggestions",
      gradient: "from-emerald-500 to-teal-500",
      delay: "200ms",
    },
    {
      icon: (props: any) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      title: "Answer Review",
      description: "Learn how to structure better responses",
      gradient: "from-amber-500 to-orange-500",
      delay: "300ms",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4" ref={containerRef}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card opacity-0 translate-y-4 transition-all duration-700 ease-out"
            style={{ transitionDelay: feature.delay }}
          >
            <div
              className="flex flex-col items-center justify-center h-full text-center gap-3 rounded-xl border border-white/10 
                       bg-white/5 backdrop-blur-sm p-5 md:p-6 hover:bg-white/10 transition-all duration-300 
                       group relative overflow-hidden"
            >
              {/* Gradient background blur */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 
                          transition-opacity duration-500 blur-xl`}
              ></div>

              {/* Shadow effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>

              {/* Icon container with glow effect */}
              <div
                className={`relative rounded-full bg-gradient-to-br ${feature.gradient} p-3 
                          shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-70"></div>
                <feature.icon className="relative h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mt-2 group-hover:scale-105 transition-transform duration-300">
                {feature.title}
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
