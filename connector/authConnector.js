import axios from "axios";

const registerGet = async (regData) => {
    const response = await axios.get(`http://localhost:8081/user/register?login=${regData.name}&password=${regData.password}&email=${regData.email}`)
    return response.data
}

const loginGet = async (logData) => {
    const response = await axios.get(`http://localhost:8081/user/login?login=${logData.name}&password=${logData.password}`)
    return response.data
}

export {registerGet, loginGet}