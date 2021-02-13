import axios from 'axios';
const endpoint = 'imoveis';

const Imoveis = {

    async List(queryString){
        return await axios.get(`http://localhost:9000/api/${endpoint}?${queryString}`)
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
        
    },

    async delete(id) {
        return await axios.delete(`http://localhost:9000/api/${endpoint}/${id}`)
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
    }

}

export default Imoveis;