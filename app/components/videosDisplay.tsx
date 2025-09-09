import { Heart } from "heroicons-react";
import { useEffect, useState } from "react";


export default function VideosDisplay(videos : any[]) {
    const [videosDisplay, setVideosDisplay] = useState([]);

    return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Exemple de vidéo */}
                    {videos.videos.map((video) => (
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
                            <img src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${video.champion}.png`} alt={video.champion} className="w-12 h-12 rounded"/>
                            <div className="flex items-center mt-2 space-x-4">
                                <Heart className={`h-5 w-5 inline-block mr-1 ${video.like > 0 ? "text-red-500" : "text-black"}`} onClick={() =>likeVideo(video.id)}/>
                                <p>{video.like}</p>
                                </div>
                        </div>
                    ))}
                </div>
    );
}