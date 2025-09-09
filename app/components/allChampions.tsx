import React from "react";
import { champions } from "../asset/champion";
import { useState } from "react";

export default function AllChampions() {
    const [open, setOpen] = useState(false);
    const [championSelected, setChampionSelected] = useState<string | null>(null);

    return (
        <div>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition" onAbort={() => setOpen(!open)} onClick={() => setOpen(!open)}>
                Sélectionner un champion
            </button>
            {open && <ChampionList setOpen={setOpen} />}
        </div>
    );
}

function ChampionList({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="absolute bg-white border border-gray-300 rounded shadow-lg mt-2 max-h-96 overflow-y-auto z-10">
            {champions.map((champion) => (
                <div
                    key={champion}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                        console.log(`Champion sélectionné : ${champion}`);
                        setOpen(false);
                    }}
                >
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${champion}.png`}
                        alt={champion}
                        className="w-12 h-12 rounded"
                    />
                    <span>{champion}</span>
                </div>
            ))}
        </div>
    );
}