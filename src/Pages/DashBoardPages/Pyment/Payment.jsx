import { loadStripe } from "@stripe/stripe-js";
import Title from "../../../components/Title/Title";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
    return (
        <div>
            <Title title={"make sure your Payment"} subtitle={"payment"}></Title>

            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>
            
        </div>
    );
};

export default Payment;