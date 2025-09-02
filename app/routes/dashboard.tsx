import { UserCircle, Heart } from "heroicons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/navbar";
import AddVideos from "~/components/addVideos";
export default function Dashboard() {
    const [username, setUsername] = useState("");
    const [videos, setVideos] = useState<any>([]);
    const [visibleButton, setVisibleButton] = useState(false);
    const navigation = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {      
            console.log(JSON.parse(storedUser));
                  
            setUsername(JSON.parse(storedUser).username);
        }
        fetch("http://localhost:5000/videos")
            .then((response) => response.json())
            .then((data) => {
                setVideos(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching videos:", error);
            });
    }, []);
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
            <Navbar />
            <main className="p-8 mt-24">
                <div className="flex-grow flex mx-4 m-10">
                    <input
                        type="text"
                        placeholder="Rechercher une vidéo..."
                        className=" bg-[#d8a54d] w-[100%] px-4 py-2 border border-black/70 rounded-md focus:outline-none focus:border-[#d8a54d]"
                    />
                </div>
                <h1 className="text-3xl font-semibold mb-6 text-yellow-800">Top vidéos</h1>
                    <button className="m-6 px-2 py-2 bg-[#785a28] text-white font-semibold rounded-md hover:bg-[#a67c2e] transition" onClick={() =>{setVisibleButton(!visibleButton)}}>Add vidéo +</button>
                    {visibleButton && (
                <AddVideos />
                    )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Exemple de vidéo */}
                    {videos.map((video) => (
                        <div key={video.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                            <div className="aspect-w-16 aspect-h-9 mb-3">
                                <video
                                    src={video.path_url} // Remplacez par video.path_url quand le backend sera prêt
                                    alt={`Vidéo ${video.title}`}
                                    className="rounded-md object-cover w-full h-full"
                                    controls
                                />
                            </div>
                            <h2 className="text-lg font-medium mb-1">{video.title}</h2>
                            <a className="text-gray-500 text-sm hover:underline hover:font-bold">{video.username}</a>
                            <p>{video.champion}</p>
                            <div className="flex items-center mt-2 space-x-4">
                                <Heart className={`h-5 w-5 inline-block mr-1 ${video.like > 0 ? "text-red-500" : "text-black"}`} onClick={() =>{video.like += 1}}/>
                                <p>{video.like}</p>
                                </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

