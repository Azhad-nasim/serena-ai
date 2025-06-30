"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

const AuthForm = ({ type: initialType }: AuthFormProps) => {
  const [formType, setFormType] = useState<"sign-in" | "sign-up">(initialType);
  const [showIntro, setShowIntro] = useState(true);

  // Update form type when prop changes
  useEffect(() => {
    if (initialType !== formType) {
      setFormType(initialType);
    }
  }, [initialType, formType]);

  // Hide intro after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/20 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/30 rounded-full opacity-20"></div>
      </div>

      <div className="w-full max-w-md md:max-w-4xl relative z-10">
        {/* App Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text ">
            SerenaAI - AI Interview Coach
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="relative w-64 h-64"
              >
                <Image
                  src={
                    formType === "sign-in"
                      ? "/login-3d.png"
                      : "/register-3d.png"
                  }
                  alt={formType === "sign-in" ? "Login" : "Register"}
                  fill
                  className="object-contain drop-shadow-2xl"
                />

                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10 opacity-70"></div>
              </motion.div>

              <motion.h2
                className="mt-8 text-2xl font-bold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {formType === "sign-in" ? "Secure Login" : "Create Account"}
              </motion.h2>

              <motion.p
                className="mt-2 text-muted-foreground text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {formType === "sign-in"
                  ? "Welcome back! Please sign in to continue your interview preparation journey."
                  : "Join thousands of professionals improving their interview skills with AI."}
              </motion.p>

              <motion.div
                className="mt-6 flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ perspective: "1200px" }}
            >
              <div className="w-full shadow-lg overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Left side - SVG Illustration */}
                  <div className="hidden md:flex md:w-1/2 bg-muted/10 items-center justify-center p-6 rounded-l-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-30"></div>
                    <Image
                      src={formType === "sign-in" ? "/auth.png" : "/auth.png"}
                      alt="Authentication"
                      width={200}
                      height={300}
                      className="w-full max-w-[200px] drop-shadow-xl relative z-10"
                    />

                    {/* Decorative elements */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
                  </div>

                  {/* Right side - Form */}
                  <div className="flex-1 p-6 md:p-8 gap-4">
                    <div className="mb-6 ">
                      <h2 className="text-2xl font-bold bg-clip-text ">
                        {formType === "sign-in"
                          ? "Welcome Back"
                          : "Join SerenaPrep"}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {formType === "sign-in"
                          ? "Sign in to continue your interview preparation"
                          : "Create an account to start practicing interviews"}
                      </p>
                    </div>

                    {formType === "sign-in" ? <SignInForm /> : <SignUpForm />}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthForm;
