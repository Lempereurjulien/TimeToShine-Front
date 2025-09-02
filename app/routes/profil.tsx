import { UserCircle } from "heroicons-react";
import Navbar from "~/components/navbar";
export default function Profil() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1428] to-[#1e283e]">
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
                <div>
                    Salut
                </div>
            </main>
        </div>
    );
}