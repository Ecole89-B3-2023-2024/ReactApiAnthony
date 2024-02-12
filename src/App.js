import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowsList from './components/ShowsList';
import ShowDetails from './components/ShowDetails'; // Assurez-vous que ce fichier existe
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import EpisodeDetails from './components/EpisodeDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ShowsList />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/episodes/:episodeId" element={<EpisodeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
