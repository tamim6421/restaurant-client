import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BsFillCartCheckFill } from "react-icons/bs";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const {user, logOut} = useAuth()
  const [cart, refetch] = useCart()
  
    const links = <>
         <li>
         <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : " hover:bg-gray-800 hover:text-white"
  }
>
  Home
</NavLink>
    </li>
    <li>
         <NavLink
  to="/menu"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
  }
>
  Our Menu
</NavLink>
    </li>
    <li>
         <NavLink
  to="/order/salad"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
  }
>
  Order Food 
</NavLink>
    </li>
    <li>
         <NavLink
  to="/dashboard/cart"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
  }
>
<BsFillCartCheckFill className="text-2xl"></BsFillCartCheckFill>
  <div className="badge badge-error p-3 text-white text-lg">+ {cart.length} </div>
</NavLink>
    </li>
       
    </>
  return ( 
    <div className="navbar fixed z-10 shadow-lg bg-opacity-50 max-w-[1200px] mx-auto text-white bg-slate-800">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       {links}
      </ul>
    </div>
    <a className="btn btn-ghost font-extraBold normal-case text-xl">BOSS RESTAURANT</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {links}
    </ul>
  </div>
  <div className="navbar-end">
   
    {
      user ? <div> 
          <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
            user.photoURL === null ?  <img  src="https://i.ibb.co/hXYvv9g/girl2.jpg" alt={user.displayName} /> :
            <img src={user.photoURL } alt={user.displayName} />
          }
          
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content text-sm  space-y-2 mt-3 z-[1] p-2 shadow bg-orange-200 rounded-box min-w-min">
        <li>
        {
                  user.displayName == null ? <button className="btn btn-sm text-white bg-orange-500"> User </button> :<button className="btn btn-sm  text-white bg-orange-500">  {user.displayName} </button>
                }
              </li>
              <li>
              <button className="btn btn-sm text-white bg-orange-400" > {user.email} </button>
              </li>
              <li className="w-full">
               <button
              onClick={logOut}
                className="btn btn-sm text-white  w-full bg-orange-400" > LogOut </button>
              </li>
      </ul>
    </div>

      </div> : <Link to='/login'> <button className="rounded-lg btn-sm text-white bg-orange-400 ">lOGIN</button> </Link>

    }
   
  </div>
</div>
  );
};

export default Navbar;
