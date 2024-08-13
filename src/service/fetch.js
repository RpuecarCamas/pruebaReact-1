import { API_LOGIN_URL, API_RESULTS_URL, USERNAME, PASSWORD } from '../constants.js';

export const fetchToken = async () => {
    try {
        const response = await fetch(API_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'insomnia/8.6.1'
            },
            body: JSON.stringify({
                username: USERNAME,
                password: PASSWORD
            })
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
    } catch (error) {
        console.error('Error fetching token:', error);
    }
};

export const fetchResults = async (page) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_RESULTS_URL}${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data['hydra:member'];
    } catch (error) {
        console.error('Error fetching results:', error);
        return [];
    }
};