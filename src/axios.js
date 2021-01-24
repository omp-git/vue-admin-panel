import Axios from 'axios'
const serverApi = Axios.create({
    baseURL: 'https://imi24.com/api'
})
// fireBaseApi.defaults.headers['something'] = 'SOMETHING'
export default serverApi