import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = newObject => {
    return axios.post(baseUrl, newObject);
}

const update = (newObject, id) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, deletePerson, update }