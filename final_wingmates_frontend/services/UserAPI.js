import axios from 'axios'
let baseUrl = "https://wingmates.onrender.com"



const createUser = (newPerson) => {
    console.log("creating user")
    console.log(newPerson)
    const response = axios.post(baseUrl + "/api/persons", newPerson)
    return response.then(response => response.data)
}

const getUser = (id) => {
    const response = axios.get(baseUrl + "/api/persons/" + id)
    return response.then(response => response.data)
}

const deleteUser = (id) => {
    const response = axios.delete(baseUrl + "/api/persons/" + id)
    return response.then(response => response.data)
}

const updateUser = (id, newPerson) => {
    const response = axios.put(baseUrl + "/api/persons/" + id, newPerson)
    return response.then(response => response.data)
}

const getUsers = () => {
    const response = axios.get(baseUrl + "/api/persons")
    return response.then(response => response.data)
}

const getUsersWithFlight = (flightId) => {
    const response = axios.get(baseUrl + "/api/persons/withflights/" + flightId)
    return response.then(response => response.data)
}

const getMatch = ({persons}) => {
    const response = axios.post(baseUrl + "/api/persons/matches", persons)
    return response.then(response => {console.log(response.data); return response.data})
}

export default {createUser, getUser, deleteUser, updateUser, getUsers, getUsersWithFlight, getMatch}
