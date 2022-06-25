import axios from 'axios'
import apiconfig from './apiconfig'
export default () => {
    return axios.create({
        baseURL : apiconfig.back1
    })
}