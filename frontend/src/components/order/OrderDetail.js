import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { orderDetail as orderDetailAction } from '../../actions/orderActions';

export default function OrderDetail() {
    const { orderDetail, loading } = useSelector(state => state.orderState);
    const { shippingInfo = {}, user = {}, orderStatus = "Processing", orderItems = [], totalPrice = 0, paymentInfo = {} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id));
    }, [id]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <div className="container mx-auto px-4 lg:px-8 mt-10">
                        <div className="bg-white shadow-lg rounded-lg p-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b-2 pb-4">Order # {orderDetail._id}</h1>
    
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Info</h4>
                                    <p><b>Name:</b> {user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                                    <p><b>Amount:</b> <span className="text-xl text-blue-600">${totalPrice}</span></p>
                                </div>
    
                                <div>
                                    <h4 className="text-2xl font-semibold text-gray-700 mb-4">Payment</h4>
                                    <p className={isPaid ? 'text-green-600' : 'text-red-600'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>
    
                                    <h4 className="text-2xl font-semibold text-gray-700 my-4">Order Status:</h4>
                                    <p className={orderStatus && orderStatus.includes('Delivered') ? 'text-green-600' : 'text-red-600'}><b>{orderStatus}</b></p>
                                </div>
                            </div>
    
                            <hr className="my-6" />
    
                            <h4 className="text-2xl font-semibold text-gray-700 mb-4">Order Items</h4>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                {orderItems && orderItems.map(item => (
                                    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm my-4" key={item.product}>
                                        <div className="w-1/4 sm:w-1/6">
                                            <img src={item.image} alt={item.name} className="w-16 h-24 object-contain rounded-md" />
                                        </div>
    
                                        <div className="w-1/2 sm:w-2/5">
                                            <Link to={`/product/${item.product}`} className="text-blue-600 hover:text-blue-800 font-medium text-lg">{item.name}</Link>
                                        </div>
    
                                        <div className="w-1/4 sm:w-1/6">
                                            <p className="text-lg font-semibold text-gray-700">${item.price}</p>
                                        </div>
    
                                        <div className="w-1/4 sm:w-1/6">
                                            <p className="text-lg font-semibold text-gray-700">{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr className="my-6" />
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}
