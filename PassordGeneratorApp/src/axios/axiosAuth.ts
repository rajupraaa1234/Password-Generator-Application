import axios from "axios";



const axiosAuth = () => {
    const Base_Url: string = 'https://learn.mindspark.in/Mindspark/Framework/Mindspark';
    const instance = axios.create({
        baseURL: Base_Url,
        timeout: 1000,
    });

    // instance.defaults.headers.common['config_key'] = Config.CONFIG_KEY;   for header configuration ... 
    //instance.defaults.headers.common['Content-Type'] = 'application/json';

    instance.interceptors.request.use(
        request => {
            console.log(`this is Api request : ${JSON.stringify(request)}`);
            return request;
        },
        error => {
            console.log(`this is Api error : ${error}`);
            return Promise.reject(error);
        },

    );

    instance.interceptors.response.use(
        async response => {
            console.log(`this is Api Response : ${JSON.stringify(response)}`);
            return response;
        },
        async error => {
            console.log(`response error : ${error}`);
            return Promise.reject(error);
        },
    );
    return instance;
}

export default axiosAuth;