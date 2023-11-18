import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useCart from "../../hooks/useCart";


const FoodCard = ({item}) => {
  const{user} = useAuth()
  const [cart, refetch] = useCart()
  const{category, image, name, price, rating, recipe, _id} = item
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = useAxios()

  const handelClick = (food) =>{
    if(user && user.email){
      // send cart item to the database 
      const cartItem = {
          menuId : _id,
          email: user.email,
          name,
          price,
          image,
          category 
      }
      axiosSecure.post('/carts', cartItem)
      .then(res =>{
        // console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title:`${name} added to the cart`,
            showConfirmButton: false,
            timer:2000
          });
          // refetch the cart again 
          refetch()
        }

      })
    }
    else{
      Swal.fire({
        title: "You are not Login",
        text: "Please Login then add to cart food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
        //  user send to the loin page 
        navigate('/login' , {state: {from: location}})
        }
      });
    }
  }
  return (
    <div>
      <div className="card  bg-base-100 shadow-xl">
        <figure>
          <img
            src={image}
            alt="Shoes"
          />
        </figure>
        <p className="bg-slate-900 text-white absolute top-3 right-3 px-2 py-2"> ${price}</p>
        <div className="card-body text-center flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p> {recipe} </p>
          <div className="card-actions justify-center">
            <button onClick={()=>handelClick(item)} className="btn btn-outline border-0 border-b-4 bg-orange-200 hover:bg-orange-500 border-orange-500  ">add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
