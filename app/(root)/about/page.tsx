"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="root-layout animate-fadeIn">
        {/* Title */}
        <section className="text-center">
          <h1 className="text-5xl font-bold text-primary-200 mb-4">About Us</h1>
          <p className="text-light-100 max-w-3xl mx-auto text-lg">
            We are three passionate students from{" "}
            <span className="text-white font-semibold">Marwari College</span>{" "}
            building{" "}
            <span className="text-primary-100 font-semibold">SerenaAI</span> —
            an AI-powered real-time voice interview platform using{" "}
            <span className="text-primary-100">Gemini AI</span> &{" "}
            <span className="text-primary-100">VAPI AI</span>.
          </p>
        </section>

        {/* Team Section */}
        <section className="flex flex-row flex-nowrap justify-between gap-6 overflow-x-auto w-full">
          <div className="card-interview min-w-[300px]">
            <div>
              <h3 className="text-2xl font-bold text-primary-200 mb-4">
                🧠 Azhad Nasim
              </h3>
              <p className="text-light-100">23MCRMS970031</p>
              {/* <p className="text-light-400">
                Full Stack Dev – Frontend, Backend & Integration
              </p> */}
            </div>
          </div>

          <div className="card-interview min-w-[300px]">
            <div>
              <h3 className="text-2xl font-bold text-primary-200 mb-4">
                👨‍💻 Himanshu Kr. Ravi
              </h3>
              <p className="text-light-100">23MCRMS970044</p>
              {/* <p className="text-light-400">
                Backend & DB Lead – APIs, Logic & Firebase
              </p> */}
            </div>
          </div>

          <div className="card-interview min-w-[300px]">
            <div>
              <h3 className="text-2xl font-bold text-primary-200 mb-4">
                🎨 Sweta Kumari
              </h3>
              <p className="text-light-100">23MCRMS970138</p>
              {/* <p className="text-light-400">
                UI/UX Dev – Frontend, Accessibility & Experience
              </p> */}
            </div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="grid md:grid-cols-2 gap-6 w-full">
          <div className="card-interview">
            <h3 className="text-xl font-semibold text-primary-200 mb-2">
              🎯 Our Mission
            </h3>
            <p className="text-light-400">
              Transform hiring by using AI to make interviews faster, smarter
              and more personalized.
            </p>
          </div>

          <div className="card-interview">
            <h3 className="text-xl font-semibold text-primary-200 mb-2">
              🚀 Our Vision
            </h3>
            <p className="text-light-400">
              Build a real-time voice-based AI platform that helps employers
              evaluate soft skills and emotions with ease.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="card-interview">
          <h3 className="text-xl font-semibold text-primary-200 mb-2">
            ⚙️ Tech Stack
          </h3>
          <ul className="text-light-400 list-disc list-inside space-y-1">
            <li>Next.js + Tailwind CSS</li>
            <li>Firebase Authentication + Firestore</li>
            <li>Gemini AI + VAPI Voice SDK</li>
            <li>Custom CSS Utilities (Dark Mode, Gradients)</li>
          </ul>
        </section>
      </div>

      <Footer />
    </>
  );
}
