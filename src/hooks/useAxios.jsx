import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',

})

const useAxios = () => {
    const {logOut} = useAuth()
    const navigate = useNavigate()


    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        
        // console.log('status error in the interceptor', error);
        // for 401 or 403 logout the user and move the user to the login page
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
      
        return Promise.reject(error);
    })



    return axiosSecure
};

export default useAxios;