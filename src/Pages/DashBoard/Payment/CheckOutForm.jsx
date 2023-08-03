import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import "./CheckOutForm.css";

const CheckOutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (paymentError) {
      console.log(paymentError);
    } else {
      console.log(paymentIntent);
      setProcessing(false);
      if (paymentIntent.status === "succeeded") {
        const transactionId = paymentIntent.id;
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          price,
          
          date: new Date(),
          ordeStutas: "Service Pending",
          quantity: cart.length,
          cartItems: cart.map((item) => item._id),
          menuItems: cart.map((item) => item.menuItemId),
          itemNames: cart.map((item) => item.name),
        };
        axiosSecure.post("/payments", payment).then((res) => {
          console.log(res.data);
          if (res.data.result.insertedId) {
            <h2>swet alert</h2>;
          }
        });
      }
    }
  };
  return (
    <div>
      <form className="w-2/3  mx-auto" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline btn-primary btn-sm my-2"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>

      {cardError && <p className="text-error ml-28 my-5">{cardError}</p>}

      {transactionId && (
        <p className="text-primary ml-28 my-5">
          success with transaction Id :{" "}
          <span className="font-bold">{transactionId}</span>
        </p>
      )}
    </div>
  );
};

export default CheckOutForm;
