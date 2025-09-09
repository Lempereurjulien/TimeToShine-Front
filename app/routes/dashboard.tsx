import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/navbar";
import AddVideos from "~/components/addVideos";
import VideosDisplay from "~/components/videosDisplay";
const API_URL = import.meta.env.VITE_API_URL;
export default function Dashboard() {
    const [username, setUsername] = useState("");
    const [videos, setVideos] = useState<any>([]);
    const [visibleButton, setVisibleButton] = useState(false);
    const [titleKey, setTitleKey] = useState(0);
    const navigation = useNavigate();


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsername(JSON.parse(storedUser).username);
        }
        fetch(`${API_URL}/videos/top`)
            .then((response) => response.json())
            .then((data) => {
                setVideos(data);
            })
            .catch((error) => {
                console.error("Error fetching videos:", error);
            });
    }, [titleKey==0]);

    const search = (element) => {
        setUsername(element);
        fetch(`${API_URL}/videos/search/${element}`)
            .then((response) => response.json())
            .then((data) => {
                setVideos(data);
            })
            .catch((error) => {
                console.error("Error fetching videos:", error);
            });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
            <Navbar />
            <main className="p-8 mt-24">
                <div className="flex items-center gap-3 mt-16">
                    <h1 className={`text-3xl font-semibold mb-6 ${titleKey == 0 ? "text-yellow-600 underline" : "text-yellow-800"}`} onClick={() => setTitleKey(0)}>Top vidéos</h1>
                    <h1 className={`text-3xl font-semibold mb-6 ${titleKey == 1 ? "text-yellow-600 underline" : "text-yellow-800"}`} onClick={() => setTitleKey(1)}>Recherche Vidéos</h1>
                </div>
                {titleKey == 1 && (
                <div className="flex-grow flex mx-4 m-10">
                    <input
                            onChange={(e) => search(e.target.value)}
                        type="text"
                        placeholder="Rechercher un utilisateur/champion..."
                        className=" bg-[#d8a54d] w-[100%] px-4 py-2 border border-black/70 rounded-md focus:outline-none focus:border-[#d8a54d]"
                    />
                </div>
                )}
                {username && (
                <button className="m-6 px-2 py-2 bg-[#785a28] text-white font-semibold rounded-md hover:bg-[#a67c2e] transition" onClick={() => { setVisibleButton(!visibleButton) }}>Add vidéo +</button>
                )}
                {visibleButton && (
                    <AddVideos />
                )}
                <VideosDisplay videos={videos} />
            </main>
        </div>
    )
}

