import { useQuery } from "@tanstack/react-query";
import Title from "../../../components/Title/Title";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import useCart from "../../../hooks/useCart";

const UserHome = () => {
  const { user } = useAuth();
  const [cart] = useCart()
  const axiosSecure = useAxios()

  const {data: payments=[]} = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () =>{
        const res = await axiosSecure.get(`/payments/${user?.email}`)
        return res.data
    }
})
  
  return (
    <div className="p-5">
      <Title title={"welcome"} subtitle={"user Profile"}></Title>
      <h1 className="text-2xl font-semibold text-green-400">
        Hi {user?.displayName} <span className="text-xl ">Welcome Back</span>{" "}
      </h1>

      <div className="shadow-xl mt-5 ">
        <div className=" md:flex gap-8">
          <div className="card w-56">
            <figure className="px-10 pt-10">
              <div className="avatar online">
                <div className="w-24 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{user?.displayName}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
            <div>
                <h1 className="text-xl font-bold">Your Activities</h1>
                <div>
                    <div>
                        <h1>Total Orders : <span> {cart?.length} </span> </h1>
                        <h1>Total Payment Items : <span> {payments?.length} </span> </h1>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
