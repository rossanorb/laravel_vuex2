import axios from 'axios';
const apiBaseUrl = 'http://localhost:9000/api';
const endpoint = 'contratos'

export default {
    async create(form) {
        try {
            return await axios.post(`${apiBaseUrl}/${endpoint}`, form)
                .then((response) => {
                    return {
                        status: true,
                        result: response.data
                    };
                })
                .catch(err => {
                    return {
                        status: false,
                        result: err.response.data
                    };
                });
        } catch (error) {
            return {
                status: false,
                error: error,
                description: null
            };
        }
    }   
}