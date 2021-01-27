import Axios from 'axios'
const serverApi = Axios.create({
    baseURL: 'https://lumen-api-1.herokuapp.com/api'
})

// serverApi.defaults.headers['Access-Control-Allow-Origin'] = '*'
// serverApi.defaults.withCredentials = true
// delete serverApi.defaults.headers.common["X-Requested-With"];

export default serverApi