import React, { useEffect, useState } from "react";
import AllChampions from "./allChampions";
import { champions } from "../asset/champion";
import Message from "./message";
const API_URL = import.meta.env.VITE_API_URL;

export default function AddVideos() {
    const [open, setOpen] = useState(false);
    const [championSelected, setChampionSelected] = useState<string>("");
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        // Simulate fetching data from an API or local asset        
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        const formData = new FormData(e.currentTarget);
        const storedUser = (localStorage.getItem('user'));
        if (storedUser) {
            formData.append('user_id', JSON.parse(storedUser).id);
        } else {
            console.error('Utilisateur non connecté');
            return;
        }
        try {
            console.log(storedUser);
            
            const response = await fetch(`${API_URL}/videos`, {
                method: 'POST',
                body: formData,
                headers: { 'Authorization': 'Bearer ' + JSON.parse(storedUser).jwt }
            })
                .then(res => res.json())
                .then(data => {
                    setIsUploading(false);
                    if (!data.error) {
                        setMessage(data.message);
                        setOpenMessage(true);
                        setTimeout(() => {
                            setOpenMessage(false);
                        }, 3000);
                    }
                }
                );
            setChampionSelected("");

        }
        catch (error) {
            console.error('Erreur réseau', error);
        }
    };

    return (
        <div className="flex flex-col m-8">
            <h1 className="text-3xl font-semibold mb-6 text-yellow-800">Ajouter une vidéo</h1>
            <main className="bg-white p-8 rounded-lg shadow-md w-full">
                <div>
                    <form className="" onSubmit={handleSubmit}>
                        <fieldset disabled={isUploading}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                                    Titre de la vidéo
                                </label>
                                <input
                                    name="title"
                                    type="text"
                                    id="title"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d8a54d]"
                                    placeholder="Entrez le titre de la vidéo"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="champion">
                                    Champion
                                </label>
                                <div className="flex relative">
                                    <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition" onAbort={() => setOpen(!open)} onClick={() => setOpen(!open)}>
                                        Sélectionner un champion
                                    </button>
                                    {championSelected && (<div className="flex items-center gap-2 px-4 py-2">
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${championSelected}.png`}
                                            alt={championSelected}
                                            className="w-12 h-12 rounded"
                                        />
                                        <span className="ml-4 font-medium">{championSelected}</span>
                                    </div>
                                    )}
                                    {open && (
                                        <div className="absolute bg-white border border-gray-300 rounded shadow-lg mt-2 max-h-96 overflow-y-auto z-10">
                                            {champions.map((champion) => (
                                                <div
                                                    key={champion}
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        setChampionSelected(champion);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${champion}.png`}
                                                        alt={champion}
                                                        className="w-12 h-12 rounded"
                                                    />
                                                    <span>{champion}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <input type="hidden" name="champion" value={championSelected} />

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="video">
                                    Vidéo
                                </label>
                                <input
                                    name="video"
                                    type="file"
                                    id="video"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d8a54d]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#785a28] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#a67c2e] transition"
                            >
                                Ajouter la vidéo
                            </button>

                        </fieldset>
                    </form>
                </div>
                {isUploading && (
                    <p className="mt-4 text-center text-blue-500">Téléversement en cours...</p>
                )}
            </main>
            <Message open={openMessage} onClose={() => setOpenMessage(false)} title="Notification" message={message} />
        </div>
    )

}