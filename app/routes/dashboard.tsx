import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/navbar";
import AddVideos from "~/components/addVideos";
import VideosDisplay from "~/components/videosDisplay";
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
        fetch("http://localhost:5000/videos/top")
            .then((response) => response.json())
            .then((data) => {
                setVideos(data);
            })
            .catch((error) => {
                console.error("Error fetching videos:", error);
            });
    }, []);
    

    const likeVideo = async (videoId: number) => {
        console.log("Like video with ID:", videoId);
        
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            console.error('Utilisateur non connecté');
            return;
        }
        const userId = JSON.parse(storedUser).id;


        try {
            const response = await fetch(`http://localhost:5000/videos/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Si vous utilisez une authentification par token
                },
                body: JSON.stringify({ user_id: userId })
            });
        } catch (error) {
            console.error('Erreur réseau', error);
        }
    }

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
                <VideosDisplay videos={videos}/>
            </main>
        </div>
    )
}

