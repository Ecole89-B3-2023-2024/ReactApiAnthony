import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EpisodeDetails = () => {
    const navigate = useNavigate();
    const { episodeId } = useParams();
    const [episode, setEpisode] = useState(null);

    useEffect(() => {
        const fetchEpisodeDetails = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/episodes/${episodeId}`);
                setEpisode(response.data);
            } catch (error) {
                console.error('Error fetching episode details:', error);
            }
        };

        fetchEpisodeDetails();
    }, [episodeId]);

    if (!episode) return <div className="text-center mt-5">Loading...</div>;

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="row no-gutters">
                    {episode.image && (
                        <div className="col-md-4">
                            <img src={episode.image.medium} alt={episode.name} className="img-fluid" />
                        </div>
                    )}
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{episode.name}</h2>
                            <p className="card-text"><strong>Season:</strong> {episode.season}, <strong>Episode:</strong> {episode.number}</p>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: episode.summary }}></p>
                            <button className="btn btn-primary" onClick={handleBack}>Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpisodeDetails;
