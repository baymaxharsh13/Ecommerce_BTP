import MetaData from '../layouts/MetaData';
import { Fragment, useEffect } from 'react';
import { validateShipping } from './Shipping';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutStep';

export default function ConfirmOrder () {
    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price * item.quantity), 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);

    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
    }, [])

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="flex flex-col lg:flex-row gap-8 justify-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Info</h4>

<p className="text-lg mb-3">
    <strong className="text-gray-600">Name:</strong> 
    <span className="text-gray-800">{user.name}</span>
</p>

<p className="text-lg mb-3">
    <strong className="text-gray-600">Phone:</strong> 
    <span className="text-gray-800">{shippingInfo.phoneNo}</span>
</p>

<p className="text-lg mb-4">
    <strong className="text-gray-600">Address:</strong> 
    <span className="text-gray-800">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</span>
</p>

<hr className="my-6 border-t-2 border-gray-200" />


    <hr className="my-6 border-t-2 border-gray-200" />
    
    <h4 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Your Cart Items:</h4>
    {cartItems.map(item => (
        <Fragment key={item.product}>
            <div className="cart-item my-5 p-5 shadow-md border border-gray-200 rounded-xl hover:shadow-lg transition-all">
                <div className="flex items-center space-x-6">
                    {/* Image */}
                    <div className="w-1/4">
                        <img src={item.image} alt={item.name} className="h-24 w-32 object-cover rounded-lg" />
                    </div>
                    {/* Item Name */}
                    <div className="w-1/2">
                        <Link to={`/product/${item.product}`} className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-all">{item.name}</Link>
                    </div>
                    {/* Quantity and Price */}
                    <div className="w-1/4 mt-4 lg:mt-0 text-right">
                        <p className="text-gray-700">{item.quantity} x <span className="font-semibold text-gray-900">${item.price}</span> = <strong className="text-lg text-gray-900">${item.quantity * item.price}</strong></p>
                    </div>
                </div>
            </div>
            <hr className="my-4 border-t-1 border-gray-300" />
        </Fragment>
    ))}
</div>


                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary" className="p-6 shadow-lg rounded-lg border border-gray-200">
                        <h4 className="text-2xl font-semibold mb-4">Order Summary</h4>
                        <hr />
                        <p className="text-lg font-medium mt-2">Subtotal: <span className="text-gray-700">${itemsPrice}</span></p>
                        <p className="text-lg font-medium mt-2">Shipping: <span className="text-gray-700">${shippingPrice}</span></p>
                        <p className="text-lg font-medium mt-2">Tax: <span className="text-gray-700">${taxPrice}</span></p>

                        <hr className="my-4" />

                        <p className="text-xl font-semibold">Total: <span className="text-green-600">${totalPrice}</span></p>

                        <hr className="my-4" />
                        <button
                            id="checkout_btn"
                            onClick={processPayment}
                            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
