import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import useCart from "../../../hooks/useCart";
import CheckOutForm from "./CheckOutform";

//TODO: Provide Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Verify);

const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0);
  const price = parseFloat(total.toFixed(2));
  return (
    <div>
      <SectionTitle
        subHeading="please process"
        heading="Payment"
      ></SectionTitle>
      <h2 className="text-3xl"> Teka o teka tumi uira uira aso...</h2>
      <Elements stripe={stripePromise}>
        <CheckOutForm cart={cart} price={price}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
