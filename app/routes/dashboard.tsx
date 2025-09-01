import { UserCircle } from "heroicons-react";

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
            {/* Navbar */}
            <nav className="h-30 px-6 py-4 flex items-center justify-between w-full absolute top-0 left-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900">
                <div className="top-0 text-4xl font-extrabold text-[#d8a54d] mb-2 text-center drop-shadow-lg">TimeToShine</div>
                <div className="flex items-center space-x-4">
                    <p className="font-bold text-white">Gagil83</p>
                    <UserCircle className="h-10 w-10" size={32} />
                </div>
            </nav>

            {/* Home / Vidéos */}
            <main className="p-8 mt-24">
                <div className="flex-grow mx-4 m-10">
                    <input
                        type="text"
                        placeholder="Rechercher une vidéo..."
                        className="bg-[#d8a54d] w-[100%] px-4 py-2 border border-black/70 rounded-md focus:outline-none focus:border-[#d8a54d]"
                    />
                </div>
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Top vidéos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Exemple de vidéo */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((id) => (
                        <div key={id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                            <div className="aspect-w-16 aspect-h-9 mb-3">
                                <img
                                    src={`https://placehold.co/320x180?text=Vidéo+${id}`}
                                    alt={`Vidéo ${id}`}
                                    className="rounded-md object-cover w-full h-full"
                                />
                            </div>
                            <h2 className="text-lg font-medium mb-1">Titre de la vidéo {id}</h2>
                            <p className="text-gray-500 text-sm">Description courte de la vidéo {id}.</p>
                            <p>Velkoz</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}