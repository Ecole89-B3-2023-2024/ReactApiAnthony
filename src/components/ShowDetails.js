import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [show, setShow] = useState(null); // Détails du spectacle
    const [episodes, setEpisodes] = useState([]); // Tous les épisodes
    const [selectedSeason, setSelectedSeason] = useState(''); // Saison sélectionnée par l'utilisateur
    const [seasons, setSeasons] = useState([]); // Liste des saisons disponibles

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const result = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setShow(result.data);
            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        };

        const fetchEpisodes = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
                setEpisodes(response.data);
                const seasonsSet = new Set(response.data.map(episode => episode.season));
                setSeasons([...seasonsSet].sort((a, b) => a - b));
            } catch (error) {
                console.error('Error fetching episodes:', error);
            }
        };

        fetchShowDetails();
        fetchEpisodes();
    }, [id]);

    const handleSeasonSelect = (event) => {
        setSelectedSeason(event.target.value);
    };

    const filteredEpisodes = selectedSeason
        ? episodes.filter(episode => episode.season.toString() === selectedSeason)
        : episodes;

    if (!show) return <div>Loading...</div>;
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={handleBack}>Go Back</button>
            <div className="card mb-3">
                <div className="row g-0">
                    {show.image && (
                        <div className="col-md-4">
                            <img src={show.image.medium} alt={show.name} className="img-fluid rounded-start" />
                        </div>
                    )}
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{show.name}</h2>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: show.summary }}></p>
                            <p className="card-text"><small className="text-muted"><strong>Language:</strong> {show.language}</small></p>
                            <p className="card-text"><strong>Genres:</strong> {show.genres.join(', ')}</p>
                            <p className="card-text"><strong>Duration:</strong> {show.runtime} minutes</p>
                            <p className="card-text"><strong>Rating:</strong> {show.rating.average ? `${show.rating.average}/10` : 'Not available'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <select className="form-select mb-3" value={selectedSeason} onChange={handleSeasonSelect}>
                    <option value="">Select a Season</option>
                    {seasons.map(season => (
                        <option key={season} value={season.toString()}>
                            Season {season}
                        </option>
                    ))}
                </select>
            </div>

            {filteredEpisodes.length > 0 && (
                <ul className="list-group list-group-flush">
                    {filteredEpisodes.map(episode => (
                        <li key={episode.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                {episode.name} (Season {episode.season}, Episode {episode.number})
                                <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/episodes/${episode.id}`)}>View Details</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowDetails;
