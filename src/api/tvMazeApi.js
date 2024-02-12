import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

export const fetchShows = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/shows`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
    }
};
