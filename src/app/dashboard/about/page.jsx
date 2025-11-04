"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-4xl mx-auto">
        <div className="bg-secondary border-b border-gray-700">
          <div className="flex items-center justify-between p-5">
            <button
              onClick={() => router.back()}
              className="text-white p-2 hover:bg-white/20 rounded-xl transition-all hover:-translate-x-1 duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-white text-2xl font-bold">About</h2>
            <div className="w-10" />
          </div>
        </div>

        <div className="px-6 py-6 space-y-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 border border-accent/30 rounded-3xl p-8 text-center backdrop-blur-sm">
              <h1 className="text-white text-3xl font-bold mb-4">DevBase Template</h1>
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
                This is a starter template for Next.js applications with authentication, 
                user management, and a beautiful UI. Built with modern technologies and 
                best practices.
              </p>
              <div className="flex items-center gap-2 mt-6 justify-center">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-white text-xl font-bold mb-4">Features</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Next.js 15 with App Router</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>NextAuth.js with credentials & OAuth (GitHub, Google)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>MongoDB with Mongoose</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Tailwind CSS for styling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Profile management & avatar upload</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Account deletion & settings</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-white text-xl font-bold mb-4">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary rounded-lg p-4 border border-gray-700/50">
                <p className="text-accent font-semibold mb-1">Frontend</p>
                <p className="text-gray-400 text-sm">Next.js 15 + React 19</p>
              </div>
              <div className="bg-primary rounded-lg p-4 border border-gray-700/50">
                <p className="text-accent font-semibold mb-1">Backend</p>
                <p className="text-gray-400 text-sm">API Routes + MongoDB</p>
              </div>
              <div className="bg-primary rounded-lg p-4 border border-gray-700/50">
                <p className="text-accent font-semibold mb-1">Auth</p>
                <p className="text-gray-400 text-sm">NextAuth.js</p>
              </div>
              <div className="bg-primary rounded-lg p-4 border border-gray-700/50">
                <p className="text-accent font-semibold mb-1">Styling</p>
                <p className="text-gray-400 text-sm">Tailwind CSS</p>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">
              📝 <strong className="text-white">To update:</strong> Replace this content with your project information
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}