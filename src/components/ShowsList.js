import React, { useEffect, useState } from 'react';
import { fetchShows } from '../api/tvMazeApi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ShowsList = () => {
    const [shows, setShows] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    const selectedShow = shows.find(show => show.id === selectedId);

    useEffect(() => {
        const getShows = async () => {
            const allShows = await fetchShows();
            setShows(allShows);
        };

        getShows();
    }, []);
    const hoverAnimation = {
        scale: 1.05, // Légèrement agrandir la carte
        transition: { duration: 0.3 }, // Durée de l'animation
    };
    const truncateSummary = (summary, maxLength = 100) => {
        if (!summary) return '';
        const strippedSummary = summary.replace(/<[^>]+>/g, '');
        return strippedSummary.length <= maxLength ? strippedSummary : `${strippedSummary.substring(0, maxLength)}...`;
    };

    const redirectToDetails = (id) => {
        navigate(`/show/${id}`);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {shows.map(show => (
                    <motion.div className="col-md-4 mb-4" whileHover={hoverAnimation} key={show.id} layoutId={`card-container-${show.id}`} onClick={() => setSelectedId(show.id)}>
                        <motion.div className="card" layoutId={`card-${show.id}`}>
                            <motion.img src={show.image ? show.image.medium : 'https://placehold.it/210x295'} className="card-img-top" alt={show.name} />
                            <motion.div className="card-body">
                                <motion.h5 className="card-title">{show.name}</motion.h5>
                                <motion.p className="card-text">{truncateSummary(show.summary, 100)}</motion.p>

                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedShow && (
                    <motion.div className="overlay" layoutId={`card-container-${selectedShow.id}`} onClick={() => setSelectedId(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <motion.div className="card" layoutId={`card-${selectedShow.id}`} style={{ width: '25%', margin: 'auto' }} onClick={(e) => e.stopPropagation()}>
                            <motion.img src={selectedShow.image ? selectedShow.image.medium : 'https://placehold.it/210x295'} style={{ margin: 'auto', height: '75%' }} className="" alt={selectedShow.name} />
                            <motion.div className="card-body">
                                <motion.h5 className="card-title">{selectedShow.name}</motion.h5>
                                <motion.p className="card-text">{selectedShow.summary.replace(/<[^>]+>/g, '')}</motion.p>
                                <motion.button className="btn btn-primary" onClick={() => redirectToDetails(selectedShow.id)}>
                                    View Details
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShowsList;
