import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaGoogle, FaGithub } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SocialLogin = () => {

    const{ googleSignIn} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()

    const from = location.state?.from?.pathname || "/";

    const handleSocialLogin = (social) =>{
        social()
        .then( res =>{
            // eslint-disable-next-line no-unused-vars
            const user = res.user
           
            const userInfo = {
                email: res.user?.email ,
                name: res.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data)
                toast.success('Login Successful')
                navigate(from, { replace: true });
            })

        })
        .catch( error =>{
            toast.error(error.message)
        })

    }

    return (
        <div className="px-8 pb-5">
        <h1 className="text-center font-semibold text-orange-300 divider">Login With</h1>
          <div className=" justify-around">
          <button onClick={()=>handleSocialLogin(googleSignIn) } className="btn btn-outline w-full hover:bg-orange-300  ">
    <FaGoogle  className="text-2xl text-orange-600 "></FaGoogle>
    Login With Google
   </button>

          </div>
   </div>
    );
};

export default SocialLogin;