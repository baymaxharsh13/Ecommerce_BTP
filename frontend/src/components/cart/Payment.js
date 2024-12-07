import { useElements, useStripe } from "@stripe/react-stripe-js";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from '../cart/Shipping';
import { createOrder } from '../../actions/orderActions';
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    };

    const order = {
        orderItems: cartItems,
        shippingInfo
    };

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
        if (orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearOrderError()) }
            });
            return;
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const { data } = await axios.post('/api/v1/payment/process', paymentData);
            const clientSecret = data.client_secret;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                toast(result.error.message, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER
                });
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if ((await result).paymentIntent.status === 'succeeded') {
                    toast('Payment Success!', {
                        type: 'success',
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };
                    dispatch(orderCompleted());
                    dispatch(createOrder(order));

                    navigate('/order/success');
                } else {
                    toast('Please Try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            }

        } catch (error) {
            toast('Payment failed. Please try again.', {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    };

    return (
        <div className="container mx-auto py-12 px-6">
            {/* Stripe Logo */}
            <div className="text-center mb-6">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaZ8bYNMdsC2oxOEzmFJjOHEuca6GClDMqg&s"
                    alt="Stripe Logo"
                    className="mx-auto h-28"
                />
            </div>

            <div className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Complete Your Payment</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label htmlFor="card_num_field" className="text-lg font-medium text-gray-600 mb-2">Card Number</label>
                        <div className="border-2 rounded-lg p-3">
                            <CardNumberElement id="card_num_field" className="w-full text-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>

                    <div className="mb-6 flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="card_exp_field" className="text-lg font-medium text-gray-600 mb-2">Card Expiry</label>
                            <div className="border-2 rounded-lg p-3">
                                <CardExpiryElement id="card_exp_field" className="w-full text-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="card_cvc_field" className="text-lg font-medium text-gray-600 mb-2">CVC</label>
                            <div className="border-2 rounded-lg p-3">
                                <CardCvcElement id="card_cvc_field" className="w-full text-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                    </div>

                    <button
                        id="pay_btn"
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all"
                    >
                        Pay ${orderInfo && orderInfo.totalPrice}
                    </button>
                </form>
            </div>
        </div>
    );
}
