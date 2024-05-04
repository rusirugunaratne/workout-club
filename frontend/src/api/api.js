import axios from "axios";

export const API_URL = import.meta.env.VITE_APP_API_URL

export const ENDPOINTS = {
    workout: 'workout',
    user: 'user'
};

export const createAPIEndpoint = (endpoint) => {
    let url = API_URL + "api/" + endpoint + "/";
    return {
        fetch: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        post: (newRecord) => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: (id) => axios.delete(url + id),
    };
};