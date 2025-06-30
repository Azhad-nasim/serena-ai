"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Upload, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signUp } from "@/lib/actions/auth.action";
import { auth } from "../firebase/client";

// Define the form validation schema
const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      }
    ),
  profilePicture: z.any().optional(),
  resume: z.any().optional(),
});

// Define type based on the schema
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);

  // Initialize the sign-up form
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle profile picture upload
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle resume upload
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  // Handle form submission
  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    try {
      const { name, email, password } = values;

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const result = await signUp({
        uid: userCredentials.user.uid,
        name,
        email,
        password,
      });

      if (!result?.success) {
        toast.error(result?.message || "Sign-up failed.");
        return;
      }

      toast.success("Account created successfully!Please Sign In");
      router.push("/sign-in");
    } catch (error: any) {
      console.error("Sign up error:", error);

      const errorCode = error?.code || error?.response?.data?.error?.message;

      if (
        errorCode === "auth/email-already-in-use" ||
        errorCode === "EMAIL_EXISTS"
      ) {
        toast.error(
          "This email is already in use. Please try signing in or use a different email."
        );
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/70">Full Name</FormLabel>
                <FormControl>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-md">
                    <span className="px-3 text-muted-foreground">
                      <User className="h-5 w-5" />
                    </span>
                    <Input
                      placeholder="John Doe"
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/70">Email</FormLabel>
                <FormControl>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-md">
                    <span className="px-3 text-muted-foreground">
                      <Mail className="h-5 w-5" />
                    </span>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/70">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-md pr-10">
                      <span className="px-3 text-muted-foreground">
                        <Lock className="h-5 w-5" />
                      </span>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        {...field}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Password must be at least 8 characters and include uppercase,
                  lowercase, number, and special character.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70">
                    Profile Picture
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {profilePreview && (
                        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10">
                          <Image
                            src={profilePreview || "/placeholder.svg"}
                            alt="Profile preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="profile-upload"
                          onChange={(e) => {
                            handleProfilePictureChange(e);
                            onChange(e.target.files?.[0] || null);
                          }}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-white/5 border-white/10 hover:bg-white/10"
                          onClick={() =>
                            document.getElementById("profile-upload")?.click()
                          }
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                        {profilePreview && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              setProfilePreview(null);
                              onChange(null);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70">Resume</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="resume-upload"
                          onChange={(e) => {
                            handleResumeChange(e);
                            onChange(e.target.files?.[0] || null);
                          }}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-white/5 border-white/10 hover:bg-white/10"
                          onClick={() =>
                            document.getElementById("resume-upload")?.click()
                          }
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Resume
                        </Button>
                        {resumeName && (
                          <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                            {resumeName}
                          </span>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Accepted formats: PDF, DOC, DOCX
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 hover:cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="relative my-6">
            <Separator className="bg-white/10" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>

          <div className="flex justify-center items-center gap-6 m-8 p-8">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/5 border-white/10 hover:bg-white/10 hover:scale-110 transition-transform duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="bg-white/5 border-white/10 hover:bg-white/10 hover:scale-110 transition-transform duration-200"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
