import axios from 'axios';
const apiBaseUrl = 'http://localhost:9000/api';
const endpoint = 'imoveis'

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
    },

    async list(queryString = '') {
        try {
            return await axios.get(`${apiBaseUrl}/${endpoint}${queryString}`)
                .then((response) => {
                    return {
                        status: true,
                        result: response.data.result.data
                    };
                })
                .catch(err => {
                    return {
                        status: false,
                        error: err.message,
                        description: err.response.data.message
                    };
                });
                
        } catch (error) {
            return {
                status: false,
                error: error,
                description: null
            };            
        }
        
    },

    async delete(id) {
        try {
            return await axios.delete(`${apiBaseUrl}/${endpoint}/${id}`)
                .then((response) => {
                    return {
                        status: true,
                        result: response.data
                    };
                })
                .catch(err => {
                    return {
                        status: false,
                        error: err.message,
                        description: err.response.data.message
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
