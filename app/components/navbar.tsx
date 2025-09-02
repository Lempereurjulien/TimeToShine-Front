import { useState, useEffect } from "react"
import { UserCircle } from "heroicons-react";
import { useNavigate } from "react-router";
export default function Navbar() {
    const [username, setUsername] = useState("");
    const navigation = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsername(JSON.parse(storedUser).username);
        }
    }, []);

    return (
        <nav className="h-30 px-6 py-4 flex items-center justify-between w-full absolute top-0 left-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 hover:cursor-pointer">
                <div className="top-0 text-4xl font-extrabold text-[#d8a54d] mb-2 text-center drop-shadow-lg" onClick={() => navigation("/dashboard")}>TimeToShine</div>
                <div className="flex items-center space-x-4" onClick={() => navigation("/profil")}>
                    <p className="font-bold text-white">{username}</p>
                    <UserCircle className="h-10 w-10" size={32} />
                </div>
            </nav>
    )
}