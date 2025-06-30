"use client";
import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { InterviewFeatures } from "./interview-features";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handyVideoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Video play error:", err));
    }
    if (handyVideoRef.current) {
      handyVideoRef.current
        .play()
        .catch((err) => console.log("Handy video play error:", err));
    }
  }, []);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-gradient-to-br from-dark-300 to-dark-100 border border-purple-500/20 rounded-2xl shadow-xl p-6 text-white space-y-4 animate-fadeIn">
            {/* Close icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-primary-200">
              🧠 Create Your Own Interview
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Want more control? Customize your AI interview by setting the:
            </p>

            <ul className="list-disc list-inside space-y-1 text-light-100">
              <li>
                <strong>Type</strong> – Choose technical, behavioral, or mixed.
              </li>
              <li>
                <strong>Role</strong> – e.g., Frontend Developer, Data
                Scientist.
              </li>
              <li>
                <strong>Level</strong> – Entry, Mid, or Senior.
              </li>
              <li>
                <strong>Tech Stack</strong> – e.g., React, Node.js, Python.
              </li>
              <li>
                <strong>Questions</strong> – Decide how many AI-generated
                questions.
              </li>
            </ul>

            <Button
              onClick={() => {
                setShowModal(false);
                window.location.href = "/interview"; // or use router.push
              }}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              🚀 Create Interview
            </Button>
          </div>
        </div>
      )}

      <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden mb-[7rem]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  AI-Powered Interview Preparation
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text ">
                  Master Your Interviews with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Practice with Serena, your AI interview coach. Get real-time
                  feedback and improve your skills for your next job interview.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="gap-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  <Link href="/interview">
                    Make Your Own Interview{" "}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-primary/5"
                  onClick={() => setShowModal(true)}
                >
                  Learn More
                </Button>
              </div>
              {/* Small handy video in the bottom right */}
              <div className="absolute bottom-6 left-[32rem] mb-[-15rem] w-[160px] h-[300px] rounded-2xl overflow-hidden  fly-loop">
                <video
                  ref={handyVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/handy.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                {/* <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div> */}
              </div>

              {/* Mobile Features - Only visible on smaller screens */}
              <div className="block lg:hidden mt-8">
                <InterviewFeatures />
              </div>
            </div>

            {/* Video Container */}
            <div className="relative flex items-center justify-center mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-[40px] blur-3xl opacity-30 transform -rotate-3 scale-105"></div>
              <div className="relative w-full max-w-[600px] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
                {/* Main video */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/banner.webm" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none"></div>

                {/* Glowing dots */}
                <div className="absolute top-4 right-4 size-2 rounded-full bg-green-500 animate-pulse"></div>
                <div
                  className="absolute top-4 right-8 size-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              {/* Desktop Features - Only visible on larger screens */}
              <div className="hidden lg:block absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[120%] max-w-[700px]">
                <InterviewFeatures />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
