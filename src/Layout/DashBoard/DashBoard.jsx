import { NavLink, Outlet } from "react-router-dom";
import { BsFillCartCheckFill, BsFillCalendar2Fill, BsFillClipboard2DataFill,BsFillBookmarkPlusFill } from "react-icons/bs";
import { FaFileContract, FaHome, FaList, FaShopify, FaUsers, FaUtensils } from "react-icons/fa";
import { MdPayment, MdMenu } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const DashBoard = () => {
    const [cart] = useCart()

    // todo : get is admin value to the database 
  const [isAdmin] = useAdmin() 
  return (
    <div className="flex">
        {/* dashboard menu bar  */}
      <div className="w-52 max-w-max pt-10 px-3 bg-orange-300">
        <ul className="space-y-7 text-lg p-2">

         { isAdmin? <> <li>
            <NavLink
              to="/dashboard/adminHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <FaHome className="text-2xl"></FaHome> 
             Admin Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addItems"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <FaUtensils className="text-2xl"></FaUtensils> 
            Add Items</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manageItems"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-white font-bold" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <FaList className="text-2xl"></FaList> 
              Manage Items </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/mangeBooking"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-white font-bold" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <BsFillBookmarkPlusFill className="text-2xl"></BsFillBookmarkPlusFill> 
              Manage Booking</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allUsers"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-white font-bold" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <FaUsers className="text-2xl"></FaUsers> 
              All Users</span>
            </NavLink>
          </li>
          
          </>
           : 
           <> 
          <li>
            <NavLink
              to="/dashboard/userHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <BiHomeAlt className="text-2xl"></BiHomeAlt> 
             User Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reservation"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <BsFillCalendar2Fill className="text-2xl"></BsFillCalendar2Fill> 
            Reservation</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-white font-bold" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <BsFillCartCheckFill className="text-2xl"></BsFillCartCheckFill> 
              My Cart ({cart.length})</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/payment"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-white font-bold" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <MdPayment className="text-2xl"></MdPayment> 
              Payment History</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/review"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-white font-bold" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <BsFillClipboard2DataFill className="text-2xl"></BsFillClipboard2DataFill> 
              Add Review</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/booking"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-white font-bold" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <BsFillBookmarkPlusFill className="text-2xl"></BsFillBookmarkPlusFill> 
              My Bookings</span>
            </NavLink>
          </li>
           </> 
}

          <div className="divider"></div>

          {/* shared nav links  */}
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <FaHome className="text-2xl" />
              Home</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/order/salad"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <MdMenu className="text-2xl" />
              Menu</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order/shop"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <FaShopify className="text-2xl" />
              Shop</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/order/contact"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "hover:bg-gray-800 hover:text-white"
              }
            >
            <span className="flex items-center gap-2"> <FaFileContract className="text-2xl" />
              Contact</span>
            </NavLink>
          </li>
          

        </ul>
      </div>

      {/* content layout  */}
      <div className="flex-1">
        <Outlet></Outlet>
            
      </div>
    </div>
  );
};

export default DashBoard;
