import React from "react";

export default function AddVideos() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            formData.append('user_id', JSON.parse(storedUser).id);
        } else {
            console.error('Utilisateur non connecté');
            return;
        }
        

        try {
            const response = await fetch('http://localhost:5000/videos', {
                method: 'POST',
                body: formData,
                // headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                // Do NOT set Content-Type header, browser will set it with correct boundary
            });

            console.log(response);
            

            if (!response.ok) {
                // handle error
                console.error('Erreur lors de l\'envoi');
            } else {
                // succès
                e.currentTarget.reset();
            }
        }
         catch (error) {
            console.error('Erreur réseau', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center m-8">
            <main className="p-8 ">
                <div className="flex-grow flex">
                </div>
                <h1 className="text-3xl font-semibold mb-6 text-yellow-800">Ajouter une vidéo</h1>
                <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
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
                        <input
                            name="champion"
                            type="text"
                            id="champion"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d8a54d]"
                            placeholder="Entrez le nom du champion"
                        />
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
                </form>
            </main>
        </div>
    )

}