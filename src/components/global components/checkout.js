/**Import React component from React Library
 * Import useSelector from React Redux
 */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

/**
 * @authors :"madhavi itikala and Spandana"
 * @returns {Html}
 * @description Creating a functional component and returns UI on the browser.
 * Implementation of Login Component using States.
 */

const Checkout = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const userCartItems = useSelector(
    (state) => state?.user?.userData?.cartItems
  );
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let val = 0;
    userCartItems.map((item) => {
      if (item.offerPrice) {
        val += Number(item.offerPrice) * Number(item.userRequiredQuantity);
      } else
        val += Number(item.originalPrice) * Number(item.userRequiredQuantity);
    });
    setSubtotal(val);
    console.log(val);
  }, [userData]);

  // console.log(subtotal)

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    let body = { amount: subtotal };
    const result = await axios.post(
      "http://localhost:1109/payment/orders",
      body
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_live_bxpIaA0wQSOIsK", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "SUTA Corp.",
      description: "Test Transaction",

      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        console.log("payment details", response);

        // const result = await axios.post("http://localhost:1109/payment/success", data);

        alert("payment success");
      },
      prefill: {
        name: userData.userName,
        email: userData.email,
        contact: userData.phoneNumber,
      },
      notes: {
        address: userData.address,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="container d-flex flex-column align-items-center p-5 mt-3">
      <div className="row">
        <div className="col-6">
          {userData.address}
          <p>Shipping Address</p>
        </div>
        <div className="col-6">
          {userCartItems?.map((item) => (
            <>
              <div className="row">
                <div className="col-3 mb-3">
                  <div className="d-flex flex-row">
                    <img height="80" width="80" src={item.image} alt="image" />
                    <span
                      class="badge badge-danger"
                      style={{ height: "fit-content",borderRadius:"20px" }}
                    >
                      {item.userRequiredQuantity}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between col-9">
                  <p>{item.productName}</p>
                  <p>
                    {item.offerPrice
                      ? Number(item.offerPrice) *
                        Number(item.userRequiredQuantity)
                      : Number(item.originalPrice) *
                        Number(item.userRequiredQuantity)}
                  </p>
                </div>
              </div>
            </>
          ))}
          <hr />

          <div className="row ">
            <input type="text" placeholder="Apply coupon" />
            <button type="button" className="btn btn-dark ml-3">
              Apply
            </button>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p>Subtotal</p>
            </div>
            <div className="col-6">
              <p>{subtotal}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Shipping</p>
            </div>
            <div className="col-6">
              <p>Calculate at next step</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p>Total</p>
            </div>
            <div className="col-6">
              <p>{subtotal}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-dark mt-3"
          onClick={() => displayRazorpay()}
        >
          Continue to shopping
        </button>
      </div>
    </div>
  );
};

export default Checkout;
