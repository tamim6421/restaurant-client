import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/login.svg";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const {createUser, updateUserProfile} = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then( res =>{
        const user = res.user 
        console.log(user)
        // \update user Profile 
        updateUserProfile(data.name, data.photo)
        .then( () =>{
          // set users info to the database 
          const userInfo = {
            name: data.name,
            email: data.email
          }
          console.log(userInfo)
          axiosPublic.post('/users', userInfo)
          .then(res =>{
            console.log(res.data)
            if(res.data.insertedId){
              toast.success('Account Created Successful')
              reset()
              navigate('/')
            }
          })

           
        })
        
    })

    .catch(error =>{
        console.error(error)
        toast.error(error.message)
    })

  };

  return (
    <div>
        <Helmet>
            <title>
                Boss | Register 
            </title>
        </Helmet>
      <div className="hero min-h-screen py-20 bg-base-200">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className="text-center w-full md:w-1/2 lg:text-left">
            <div>
              <img src={img} alt="" />
            </div>
          </div>
          <div className="card w-full md:w-1/2 shadow-2xl md:w-fill bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-5xl text-orange-400  font-bold">Register now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  placeholder="User name"
                  className="input input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="text"
                  name="photo"
                  placeholder="PhotoURL"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                    pattern:/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/
                  })}
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-500">Password must be less than 12 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">Password must have one uppercase, one lowercase, one number and One special characters</p>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-warning text-white"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
            <div className="px-5 pb-4">
              <p>
                Already Have an Account ?{" "}
                <Link
                  className="text-orange-500 font-bold underline"
                  to="/login"
                >
                  {" "}
                  Login
                </Link>{" "}
              </p>
            </div>

            <div>
                <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
