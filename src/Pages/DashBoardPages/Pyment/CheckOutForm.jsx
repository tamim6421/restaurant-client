import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";



const CheckOutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('') 
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxios()
    const [cart, refetch] = useCart()
    const {user} = useAuth()



    const totalPrice = cart.reduce( (total, item) => total + item.price ,0)
    const itemName = cart.map(item => item.name)
  


    useEffect( () =>{
       if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then(res =>{
            // console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
       }
    } ,[axiosSecure, totalPrice])


    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (!stripe || !elements) {
           
            return;
          }
          const card = elements.getElement(CardElement);
      
          if (card == null) {
            return;
          }
          
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            console.log('[error]', error);
            setError(error.message)
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
          }

        //   confirm payment 
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details:{
                    email:user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',

                }
            }
        })

        if(confirmError){
            console.log('confirmError', confirmError)
        }
        else{
            console.log('payment Intent', paymentIntent)
            if(paymentIntent.status === "succeeded"){
                // console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)


                // now save the payment in the database 
                const payment = {
                    email : user?.email,
                    price : totalPrice,
                    nameItem : itemName,
                    date: new Date(), //convert utc dates at moment js 
                    transactionId: paymentIntent.id,
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.cartId),
                    status: 'pending',
                }

              const res = await  axiosSecure.post(`/payments`, payment)
                console.log(res.data)
                refetch()
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
        }



    }

    return (
        <div className="w-3/6 mx-auto mt-20 bg-green-100 p-5 shadow-lg rounded-lg">
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
        <button className="btn btn-warning btn-sm px-4 mt-3" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-500">{error}</p>
        {transactionId && <p className="text-green-500"> Your Transaction id : {transactionId}</p> }

    </form>  
        </div>
    );
};

export default CheckOutForm;