import axios from 'axios'
export function getSeller(){
  return axios.get('/api/seller?id=123&a=b')
}
