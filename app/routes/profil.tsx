import { useNavigate } from "react-router";
import { useState } from "react";
import Navbar from "~/components/navbar";
import AddVideos from "~/components/addVideos";
import { useEffect } from "react";
import VideosDisplay from "~/components/videosDisplay";
export default function Profil() {
    const navigate = useNavigate();
    const [videosUser, setVideosUser] = useState<any>([]);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {      
            console.log(JSON.parse(storedUser));
            const userId = JSON.parse(storedUser).id;            
            fetch(`http://localhost:5000/videos/user/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setVideosUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user's videos:", error);
                });
                  
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div className="flex flex-col bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
            <Navbar />
            {/* Profil */}
            <main className="p-8 mt-24">
                {/* profil partie*/}
                <h1 className="text-3xl m-4 font-semibold mb-6 text-gray-800">Mon Profil</h1>
                <div className="bg-white rounded-lg shadow p-6 w-full">
                    <div className="flex flex-col mb-8 w-[50%]">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Nom d'utilisateur</label>
                            <input
                                type="text"
                                value="Gagil83"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d8a54d]"
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Adresse e-mail</label>
                            <input
                                type="email"
                                value="sqdsqd"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d8a54d]"
                                readOnly
                            />
                        </div>
                    </div>
                    <button className="w-full py-2 mt-4 rounded bg-gradient-to-r from-[#c89b3c] to-[#785a28] text-[#0a1428] font-bold text-lg shadow hover:from-[#f0e6d2] hover:to-[#c89b3c] transition">
                        Modifier le profil
                    </button>
                </div>
                {/* profil partie*/}
                    <AddVideos />
                    <div>
                        <h1 className="text-3xl font-semibold mb-6 text-yellow-800">Mes vidéos</h1>
                    <VideosDisplay videos={videosUser}/>
                    </div>
            </main>
            <div className="flex m-4 justify-end" >
            <button className="bottom-4 right-4 p-4 rounded-full bg-gradient-to-r from-[#c89b3c] to-[#785a28] text-white shadow-lg hover:from-[#f0e6d2] hover:to-[#c89b3c] transition" onClick={() => logout()}>
                logout
            </button>
            </div>
        </div>
    );
}