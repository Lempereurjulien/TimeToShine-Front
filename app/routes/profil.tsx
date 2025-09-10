import { useNavigate } from "react-router";
import { useState } from "react";
import Navbar from "~/components/navbar";
import AddVideos from "~/components/addVideos";
import { useEffect } from "react";
import VideosDisplay from "~/components/videosDisplay";
import { User, UserCircle } from "heroicons-react";
const API_URL = import.meta.env.VITE_API_URL;

export default function Profil() {
    const navigate = useNavigate();
    const [videosUser, setVideosUser] = useState<any>([]);
    const [user, setUser] = useState<any>({});
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            const userId = JSON.parse(storedUser).id;
            fetch(`${API_URL}/videos/user/${userId}`, {
                headers: { "Authorization": `Bearer ${JSON.parse(storedUser).jwt}` }
            })
                .then((response) => response.json())
                .then((data) => {
                    setVideosUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user's videos:", error);
                });
        }
    }, [reload]);

    const handleVideoUpload = () => {
        setReload(prev => !prev)
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div className="flex flex-col bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
            <Navbar />
            {/* Profil */}
            <main className="p-8 mt-24">
                <div className="flex flex-col items-center mb-12">
                    {/* profil partie*/}
                    <div className="bg-gradient-to-br from-yellow-900 to-yellow-600 rounded-lg shadow p-6 w-[30%] flex flex-col items-center">
                        <h1 className="text-3xl m-4 font-semibold mb-6 text-white">Mon Profil</h1>
                        <UserCircle size={40} className="m-5 h-40 w-40" />
                        <div className="flex flex-col mb-8 w-[50%]">
                            <div className="mb-4">
                                <label className="block text-white font-medium mb-2">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    value={user?.username ?? ""}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d8a54d]"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white font-medium mb-2">Adresse e-mail</label>
                                <input
                                    type="email"
                                    value={user?.mail ?? ""}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d8a54d]"
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* <button className="w-full py-2 mt-4 rounded bg-gradient-to-r from-[#c89b3c] to-[#785a28] text-[#0a1428] font-bold text-lg shadow hover:from-[#f0e6d2] hover:to-[#c89b3c] transition">
                            Modifier le profil
                        </button> */}
                    </div>
                </div>
                <div>
                    <VideosDisplay videos={videosUser} profil={true} onVideoAdded={handleVideoUpload} />
                </div>
            </main>
            <div className="flex m-4 justify-end" >
                <button className="bottom-4 right-4 p-4 rounded-full bg-gradient-to-r from-[#c89b3c] to-[#785a28] text-white shadow-lg hover:from-[#f0e6d2] hover:to-[#c89b3c] transition" onClick={() => logout()}>
                    Déconnexion
                </button>
            </div>
        </div>
    );
}