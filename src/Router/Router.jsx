import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Test from "../components/Test/Test";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivetRoute from "./PrivetRoute/PrivetRoute";
import DashBoard from "../Layout/DashBoard/DashBoard";
import Cart from "../Pages/DashBoardPages/Cart/Cart";
import AllUsers from "../Pages/DashBoardPages/AllUsers/AllUsers";
import AddItems from "../Pages/DashBoardPages/AddItems/AddItems";
import AdminRoute from "./AdminRoute/AdminRoute";
import ManageItems from "../Pages/DashBoardPages/ManageItems/ManageItems";
import UpdateItems from "../Pages/DashBoardPages/UpdateItems/UpdateItems";
import Payment from "../Pages/DashBoardPages/Pyment/Payment";
import PaymentHistory from "../Pages/DashBoardPages/PymentHistory/PaymentHistory";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/test',
                element:<Test></Test>
            },
            {
                path:'menu',
                element:<Menu></Menu>
            },
            {
                path: 'order/:category',
                element:<Order></Order>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            }
        ]
    },
    {
        path:'dashboard',
        element:<PrivetRoute><DashBoard></DashBoard></PrivetRoute>,
        children:[
            // normal user routes 
            {
                path:'cart',
                element:<Cart></Cart>
            },
            {
                path:'payment',
                element: <Payment></Payment>
            },
            {
                path:'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },

            // admin only routes 
            {
                path:'allUsers',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:'addItems',
                element:<AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path:'manageItems',
                element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path:'updateItem/:id',
                element:<AdminRoute> <UpdateItems></UpdateItems> </AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
            }
        ]
    }
])

export default router;