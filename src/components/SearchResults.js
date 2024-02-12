import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const searchTerm = searchParams.get('q');
    const navigate = useNavigate(); // Initialisez useNavigate


    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
                setResults(response.data);
            } catch (error) {
                console.error('Erreur lors de la recherche:', error);
            }
        };

        if (searchTerm) {
            fetchSearchResults();
        }
    }, [searchTerm])
    const truncateSummary = (summary, maxLength = 100) => {
        if (!summary) return ''; // Retourne une chaîne vide si le résumé est undefined ou null
        const strippedSummary = summary.replace(/<[^>]+>/g, ''); // Supprime les balises HTML
        if (strippedSummary.length <= maxLength) return strippedSummary; // Retourne le résumé s'il est assez court
        return `${strippedSummary.substring(0, maxLength)}...`; // Tronque et ajoute des points de suspension
    };
    const redirectToDetails = (id) => {
        navigate(`/show/${id}`); // Utilisez le chemin défini pour les détails du film
    };
    return (
        <div>
            <h2>Résultats de recherche pour "{searchTerm}"</h2>
            <div>
                <div className="container mt-5">
                    <div className="row">
                        {results.map((item, index) => (
                            <div className="col-md-4 mb-4" key={item.show.id}>
                                <div className="card">
                                    <img src={item.show.image ? item.show.image.medium : 'https://placehold.it/210x295'} className="card-img-top" alt={item.show.name} />
                                    <div key={index}>
                                        <h3 className="card-title">{item.show.name}</h3>
                                        <p>{truncateSummary(item.show.summary, 100)}</p>
                                        <button className="btn btn-primary" onClick={() => redirectToDetails(item.show.id)}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
