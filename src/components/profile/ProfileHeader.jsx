// src/components/profile/ProfileHeader.jsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileHeader({ title }) {
  const router = useRouter();

  return (
    <div className="bg-secondary border-b border-gray-700">
      <div className="flex items-center justify-between p-5">
        <button
          onClick={() => router.back()}
          className="text-white p-2 hover:bg-white/20 rounded-xl transition-all hover:-translate-x-1 duration-300"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <div className="w-10" />
      </div>
    </div>
  );
}