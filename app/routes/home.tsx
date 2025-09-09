import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
// Use a public URL for the logo image

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - TimeToShine" },
    { name: "description", content: "Connectez-vous à TimeToShine !" },
  ];
}


export default function Home() {
  const [version,setVersion ] = useState<string | null>(null);


  useEffect(() => {
    setVersion('1.0.0');
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative">
      <div className="absolute inset-0 bg-[url('/images/lol-bg.jpg')] bg-cover bg-center opacity-30 z-0" />
      <div className="border border-[#785a28] relative z-10 flex flex-col items-center w-full max-w-md px-8 py-12 bg-black/70 rounded-2xl shadow-2xl backdrop-blur-md">
      <img
        src="/asset/time_to_shine_logo_transparent.png"
        alt="TimeToShine Logo"
        className="w-32 mb-6 drop-shadow-lg"
      />
      <h1 className="text-4xl font-extrabold text-[#d8a54d] mb-2 text-center drop-shadow-lg">
        TimeToShine
      </h1>
      <p className="text-base text-gray-200 mb-8 text-center">
        Bienvenue sur TimeToShine ! Partagez vos meilleurs moves et brillez dans la faille de l'invocateur.
      </p>
      <div className="flex flex-col gap-4 w-full">
        <a
        href="/login"
        className="border w-full px-6 py-3 bg-gradient-to-r from-[#c89b3c] to-[#785a28] text-gray-900 font-bold rounded-lg shadow hover:text-yellow-400 transition text-center hover:border-yellow-400"
        >
        Se connecter
        </a>
        <a
        href="/register"
        className="w-full px-6 py-3 bg-gradient-to-r from-[#c89b3c] to-[#785a28] hover:text-yellow-400 font-bold rounded-lg shadow border hover:border-yellow-400 hover:bg-gray-700 transition text-center"
        >
        S'inscrire
        </a>
      </div>
      </div>
      <footer className="absolute bottom-4 w-full text-center text-gray-400 text-xs z-10">
      © Version {version} / TimeToShine. Inspiré par League of Legends.
      </footer>
    </div>
  );

}