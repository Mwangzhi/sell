import axios from 'axios'
export function getRatings() {
  return axios.get('/api/rating')
}
