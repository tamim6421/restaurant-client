import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/login.svg";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
    const {signInUser} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/";

    const handelLogin = event =>{
        event.preventDefault()
        const form = event.target 
        const email = form.email.value 
        const password = form.password.value 
        console.log(email, password)
        signInUser(email, password)
        .then(res =>{
            const user = res.user 
            console.log(user)
            toast.success('user Login successful')
            navigate(from, { replace: true });
        
        })
        .catch(error =>{
            console.error(error)
            toast.error(error.message)
        })
    }
  return (
    <div>
      <div className="hero min-h-screen  py-20 bg-base-200">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <div>
              <img src={img} alt="" />
            </div>
          </div>
          <div className="card  w-full md:w-1/2 shadow-2xl bg-base-100">
            <form onSubmit={handelLogin} className="card-body">
              <h1 className="text-5xl text-orange-400 font-bold">Login now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
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
                  value="Login"
                />
              </div>
            </form>
            <div className="px-5 pb-4">
              <p>
                New This Site?{" "}
                <Link
                  className="text-orange-500 font-bold underline"
                  to="/register"
                >
                  {" "}
                  Create an Account
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

export default Login;
