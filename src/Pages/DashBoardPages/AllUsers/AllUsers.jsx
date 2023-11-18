import { useQuery } from "@tanstack/react-query";
import Title from "../../../components/Title/Title";

import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";


const AllUsers = () => {
    const axiosSecure = useAxios();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handelMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user?._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }


    const handelDeleteUser = (user) =>{
        // console.log(user)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
               
                axiosSecure.delete(`/users/${user._id}`)
                .then(res =>{
                    console.log(res.data)
                    if(res.data.deletedCount > 0){
                         Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                        });
                        refetch()
                    }
                })
               
            }
            });
    }


    return (
        <div className="px-4 my-5">
            <Title subtitle={'all users'} title={"Total Users"}></Title>
            <h1 className="text-2xl font-semibold">Total Users : {users.length}  </h1>

            <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr className="bg-orange-300 rounded-lg  text-white uppercase">
        <th>Num</th>
        <th>Name</th>
        <th>Email</th>
        <th>Make Admin</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {
        users?.map( (user, idx) => <tr key={user._id}>
            <th>{idx+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                {/* make admin conditionally  */}
           { user.role === 'admin'? 'Admin' : <button 
            onClick={()=>handelMakeAdmin(user)}
             className="btn bg-orange-300  p-2"> <FaUsers className="text-xl text-white"></FaUsers> </button>}
            </td>
            <td>
                 <button onClick={() =>handelDeleteUser(user)} className="btn  p-2"> <FaTrashAlt className=" text-red-500"></FaTrashAlt> </button></td>
          </tr> )
      }
    
    </tbody>
  </table>
             </div>
            </div>
        </div>
    );
};

export default AllUsers;