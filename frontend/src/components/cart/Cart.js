import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';

export default function Cart() {
    const { items } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if(item.stock === 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product));
    };

    const decreaseQty = (item) => {
        const count = item.quantity;
        if(count === 1) return;
        dispatch(decreaseCartItemQty(item.product));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <Fragment>
            {items.length === 0 ? (
                <h2 className="mt-10 text-center text-3xl font-semibold text-gray-600">Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h2 className="mt-10 text-center text-3xl font-semibold text-gray-700">Your Cart: <b>{items.length} items</b></h2>
                    <div className="flex flex-wrap justify-between mt-8 space-y-8 lg:space-y-0">
                        {/* Cart Items Section */}
                        <div className="w-full lg:w-[65%] space-y-8 ">
                            {items.map(item => (
                                <div key={item.product} className="flex flex-wrap items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center space-x-6">
                                        <img src={item.image} alt={item.name} className="h-28 w-32 object-contain rounded-lg shadow-md" />
                                        <Link to={`/product/${item.product}`} className="text-xl font-medium text-blue-600 hover:text-blue-800 transition duration-300">{item.name}</Link>
                                    </div>

                                    <div className="text-xl text-gray-800 font-semibold">${item.price}</div>

                                    <div className="flex items-center space-x-4">
                                        <button 
                                            onClick={() => decreaseQty(item)} 
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                                        >
                                            -
                                        </button>
                                        <input 
                                            type="number" 
                                            className="w-16 text-center border-2 border-gray-300 rounded-lg py-2 text-lg font-medium" 
                                            value={item.quantity} 
                                            readOnly 
                                        />
                                        <button 
                                            onClick={() => increaseQty(item)} 
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button 
                                        onClick={() => dispatch(removeItemFromCart(item.product))}
                                        className="text-red-600 hover:text-red-800 text-xl transition duration-300"
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Section */}
                        <div className="w-full lg:w-1/3 bg-white h-[50vh] rounded-lg shadow-lg p-8">
                            <h4 className="text-2xl font-semibold mb-6 text-gray-700">Order Summary</h4>
                            <hr />
                            <p className="text-lg mt-6">Subtotal: <span className="font-semibold">{items.reduce((acc, item) => acc + item.quantity, 0)} Units</span></p>
                            <p className="text-xl mt-4">Est. Total: <span className="font-semibold text-green-600">${items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
                            <hr className="my-6" />
                            <button 
                                onClick={checkoutHandler} 
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 mt-4 " 
                            >
                                Check Out
                            </button>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
