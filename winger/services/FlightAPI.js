import axios from 'axios'
let baseUrl = "https://wingmates.onrender.com"

const getUserFlights = (id) => {
    const response = axios.get(`${baseUrl}/api/persons/${id}/flights`)
    return response.then(response => response.data)
}

const addUserFlight = (id, flightId) => {
    const response = axios.put(`${baseUrl}/api/persons/${id}/flights`, {flightId: flightId})
    return response.then(response => response.data)
}

const removeUserFlight = (id, flightId) => {
    const response = axios.delete(`${baseUrl}/api/persons/${id}/flights`, {flightId: flightId})
    return response.then(response => response.data)
}

const getFlight = (flightNumber) => {
    const response = axios.get(`${baseUrl}/api/flights/${flightNumber}`)
    return response.then(response => response.data)
}


export default {getUserFlights, addUserFlight, removeUserFlight, getFlight}