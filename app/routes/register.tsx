import { useState } from "react";
import Message from "~/components/message";
import { useNavigate } from "react-router";
import { ArrowCircleLeft } from "heroicons-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

const register = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Erreur lors de l'inscription. Veuillez réessayer.");
      setOpenMessage(true);
      return;
    }

    setEmail("");
    setPassword("");
    setMessage(data.message);
    setOpenMessage(true);
  } catch (error) {
    console.log('error', error);
    setMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    setOpenMessage(true);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1428] via-[#1e253e] to-[#2c2f4a]">
      <ArrowCircleLeft className="absolute top-6 left-6 text-yellow-400 hover:text-yellow-300 cursor-pointer" size={40} onClick={() => navigate("/")} />
      <div className="bg-[#1e253e] p-8 rounded-lg shadow-2xl w-full max-w-md border border-yellow-600">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-6 text-center drop-shadow-lg">Créer un compte</h1>
        <div className="space-y-5"></div>
        <div>
          <label htmlFor="email" className="block text-yellow-300 mb-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-yellow-700 rounded bg-[#232946] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          // @ts-ignore
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-yellow-300 mb-1 font-semibold">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-yellow-700 rounded bg-[#232946] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          onClick={() => register()}
          className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-[#232946] font-bold py-2 rounded shadow hover:from-yellow-400 hover:to-yellow-500 transition"

        >
          S'inscrire
        </button>
      </div>
      <Message
        open={openMessage}
        onClose={() => { setOpenMessage(false) }}
        title="Inscription"
        message={message}
      />
    </div>
  );
}