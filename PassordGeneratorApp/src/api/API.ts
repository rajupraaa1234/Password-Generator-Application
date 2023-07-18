import { axiosAuth } from "../axios";

const API = async (endPoint: string, req) => {
    const request = { url: endPoint, body: req.body };
    let axios = axiosAuth();

    let signalObj = null;
    if (req.signal) {
        signalObj = { cancelToken: req.signal.token };
    }
    //  axios.defaults.headers.common['jwt'] = jwt;          for header data
    //  axios.defaults.headers.common['Auth'] = 'EISecret';
    const response = axios.post(request.url, request.body, signalObj);
    return response;
}

export default API;