import axios from 'axios';

const Imoveis = {

    async List(queryString){
        return await axios.get(`http://localhost:9000/api/imoveis?${queryString}`);
    }

}

export default Imoveis;