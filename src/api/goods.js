import axios from 'axios'
export function getGoods() {
  return axios.get('/api/goods')
}
