import { useState } from "react";
import { useNavigate } from "react-router";
import { EyeOff, Eye } from "heroicons-react";
import Message from "~/components/message";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const login = () =>{
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data',data);
        if (data.error) {
          setMessage(data.error);
          setOpenMessage(true);
          setTimeout(() => {
            setOpenMessage(false);
          }, 3000);
        } else if (data.message) {
          console.log(data);
          
          setMessage(data.message);
          setOpenMessage(true);
          setTimeout(() => {
            setOpenMessage(false);
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-[#091428] p-8 border-2 border-[#785a28]">
        <h2 className="text-3xl font-bold text-center text-[#f0e6d2] mb-8 font-serif tracking-wide">
          Connexion
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
            onClick={() => login()}
          >
            Se connecter
          </button>
        </div>
        <div className="mt-6 text-center">
          <span className="text-[#f0e6d2]">Pas encore de compte ? </span>
          <button
            className="text-[#c89b3c] hover:underline font-semibold"
            type="button"
            onClick={() => navigate("/register")}
          >
            Inscription
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