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
  const [time,setTime ] = useState<string | null>(null);


  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('/images/lol-bg.jpg')] bg-cover bg-center opacity-30 z-0" />
      <div className="relative z-10 flex flex-col items-center">
        <img
          src="/asset/time_to_shine_logo_transparent.png"
          alt="TimeToShine Logo"
          className="w-40 mb-8 drop-shadow-lg"
        />
        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg mb-4 text-center">
          TimeToShine
        </h1>
        <p className="text-lg text-gray-200 mb-8 text-center max-w-xl">
          Bienvenue sur TimeToShine ! Partager vos meilleur move et brillez dans la faille de l'invocateur.
        </p>
        <div className="flex gap-6">
          <a
            href="/login"
            className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition"
          >
            Se connecter
          </a>
          <a
            href="/register"
            className="px-8 py-3 bg-gray-800 text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-700 transition border border-yellow-400"
          >
            S'inscrire
          </a>
        </div>
      </div>
      <footer className="absolute bottom-4 w-full text-center text-gray-400 text-sm z-10">
        © {time} TimeToShine. Inspiré par League of Legends.
      </footer>
    </div>
  );

}