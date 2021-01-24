import Axios from 'axios'
const serverApi = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})
// fireBaseApi.defaults.headers['something'] = 'SOMETHING'
export default serverApi