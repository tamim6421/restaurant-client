import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://boss-restaurant.up.railway.app',
})

const useAxiosPublic = () => {
    
    return axiosPublic
};

export default useAxiosPublic;