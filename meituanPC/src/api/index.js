import axios from '@/axios'

const api = {
  getSearchHotList (params) {
    return axios.get('/meituan/header/searchHotWords.json', params)
  },
  getMenuList (params) {
    return axios.get('/meituan/index/nav.json', params)
  },
  getSearchList (params) {
    return axios.get('/meituan/header/search.json', params)
  },
  getCurPoisition(params) {
    return axios.get('/meituan/city/getPosition.json', params)
  },
  getProvinceList(params) {
    return axios.get('/meituan/city/province.json', params)
  },
  getCityList(params){
      return axios.get('/meituan/city/cityList.json', params)
  },
  getHotCity(params) {
      return axios.get('/meituan/city/hot.json', params)
  },
  getRecentCity(params) {
      return axios.get('/meituan/city/recents.json', params)
  },
  resultsByKeywords(params) {
      return axios.get('/meituan/index/resultsByKeywords.json', params)
  },
  register(params) {
    return axios.get('/meituan/register', params)
  },
  login(params) {
    return axios.get('/meituan/login', {params})
  },
  getProducts(params) {
    return axios.get('/meituan/list/goodsList.json');
  }
}

export default api
