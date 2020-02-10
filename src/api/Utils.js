import axios from 'axios';
import API from './API'

const API_Key = 'XB3AbFasJ8RONNKsVb7J3C0eCwJBwESXgc9c0XH4';

//Stores results locally
const cache = {};

//Api call to get Rover information (launch_date, landing_date, max_sol, cameras, etc)
const fetchInfoCreator = () => {
  return async () => {
    try {
      const res = await API.get(`?api_key=${API_Key}`);
      return res;
    }
    catch(e) {

    }
  }
}

//Api call gets photos taken on the provided sol. Cancels existing pending requests
const fetchPhotosCreator = () => {
  let source;
  return async(sol)=> {
    if(source) {
      source.cancel();
    }
    source = axios.CancelToken.source();
    try {
      if(cache[sol]) {
        return cache[sol];
      }
      const res = await API.get(`photos?api_key=${API_Key}&sol=${sol}`, {cancelToken: source.token});
      cache[sol] = res;
      return res;
    }
    catch(e) {}
  }
}

export const fetchInfo = fetchInfoCreator();
export const fetchPhotos = fetchPhotosCreator();