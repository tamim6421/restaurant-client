import { useQuery } from "@tanstack/react-query";
import Title from "../../../components/Title/Title";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";


const PaymentHistory = () => {
    const axiosSecure = useAxios()
    const {user} = useAuth()

    const {data: payments = []} = useQuery({
        queryKey:['payments', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })
    // console.log(payments)
    return (
        <div className="p-7">
            <Title title={'see your payment details'} subtitle={"payment history"}></Title>
            <div>
                <h1 className="text-xl pl-5 mb-2 font-bold"> Your Total Payment: {payments.length} </h1>
            </div>
            <div className="overflow-x-auto px-5">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-green-400 text-white uppercase ">
                        <tr>
                            <th>Num</th>
                            <th>email</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Transaction Id </th>
                            <th>Status </th>
                        </tr>
                        </thead>
                        <tbody>
                       
                       {
                        payments?.map( (item, idx) =>  <tr key={item._id}>
                            <th>{idx + 1}</th>
                            <td>  {item.email}</td>
                            <td>  {item.nameItem}</td>
                            <td> $ {item.price}</td>
                            <td>{item.transactionId}</td>
                            <td>{item.status}</td>
                        </tr>
                     )
                       }
                        </tbody>
                    </table>
                    </div>
        </div>
    );
};

export default PaymentHistory;