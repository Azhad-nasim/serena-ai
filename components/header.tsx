"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/actions/auth.action";

type User = {
  id: string;
  name: string;
  email: string;
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/current-user");
      const data = await res.json();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut(); // calling your firebase signOut logic
    router.push("/sign-in");
  };
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/40 bg-black/80 backdrop-blur-md shadow-sm"
          : "border-transparent "
      }`}
    >
      <div className="container mx-auto relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-12 h-12">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white hover:text-purple-500">
            SerenaAI
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-purple-500 transition"
          >
            Home
          </Link>
          <Link
            href="/interview"
            className="text-sm font-medium text-white hover:text-purple-500 transition"
          >
            Practice
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-white hover:text-purple-500 transition"
          >
            About
          </Link>
        </nav>

        {/* User/Profile Section */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          {!user ? (
            <Button
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white text-sm px-4"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-11 w-11 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl hover:opacity-90 transition shadow-md hover:cursor-pointer">
                  {firstLetter}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 mt-2">
                <DropdownMenuItem
                  disabled
                  className="text-sm text-muted-foreground hover:cursor-pointer"
                >
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/support")}>
                  Team Support
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-white/95 backdrop-blur p-4 space-y-3">
          <Link href="/practice" onClick={() => setMobileMenuOpen(false)}>
            <span className="block text-base font-medium text-gray-700 hover:text-black">
              Practice
            </span>
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            <span className="block text-base font-medium text-gray-700 hover:text-black">
              About
            </span>
          </Link>
          {!user && (
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <span className="block text-base font-medium text-purple-700">
                Get Started
              </span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
