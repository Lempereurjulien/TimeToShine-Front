import { useState } from "react";
import Message from "~/components/message";
import { useNavigate } from "react-router";
import { ArrowCircleLeft } from "heroicons-react";
import { Eye, EyeOff } from "heroicons-react";
const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

const register = async () => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Erreur lors de l'inscription. Veuillez réessayer.");
      setOpenMessage(true);
      return;
    }

    setEmail("");
    setPassword("");
    setUsername("");
    setMessage(data.message);
    setOpenMessage(true);
    setTimeout(() => {
            setOpenMessage(false);
            navigate("/login");
          }, 1000);
  } catch (error) {
    console.error(error);
    setMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    setOpenMessage(true);
    setTimeout(() => {
            setOpenMessage(false);
          }, 1000);
  }
}

  return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-[#091428] p-8 border-2 border-[#785a28]">
        <h2 className="text-3xl font-bold text-center text-[#f0e6d2] mb-8 font-serif tracking-wide">
          Inscription
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-[#f0e6d2] mb-2 font-medium" htmlFor="email">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded bg-[#1e2328] border border-[#785a28] text-[#f0e6d2] focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-[#f0e6d2] mb-2 font-medium" htmlFor="email">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 rounded bg-[#1e2328] border border-[#785a28] text-[#f0e6d2] focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="text"
            />
          </div>
          <div>
            <label className="block text-[#f0e6d2] mb-2 font-medium" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={visiblePassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded bg-[#1e2328] border border-[#785a28] text-[#f0e6d2] focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-[#c89b3c] hover:text-[#f0e6d2]"
                onClick={() => setVisiblePassword(v => !v)}
                tabIndex={-1}
              >
                {visiblePassword ? (
                  <Eye className="h-5 w-5" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                ) : (
                  <EyeOff className="h-5 w-5" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded bg-gradient-to-r from-[#c89b3c] to-[#785a28] text-[#0a1428] font-bold text-lg shadow hover:from-[#f0e6d2] hover:to-[#c89b3c] transition"
            onClick={() => register()}
          >
            S'inscrire
          </button>
        </div>
        <div className="mt-6 text-center">
          <span className="text-[#f0e6d2]">Pas encore de compte ? </span>
          <button
            className="text-[#c89b3c] hover:underline font-semibold"
            type="button"
            onClick={() => navigate("/login")}
          >
            Déja un compte ?
          </button>
        </div>
        {openMessage && (
          <div className="mt-4 p-3 rounded bg-[#c89b3c] text-[#0a1428] text-center font-semibold">
            {message}
          </div>
        )}
    </div>
    <Message open={openMessage} onClose={() => setOpenMessage(false)} title="Notification" message={message} />
    </div>
  );
}