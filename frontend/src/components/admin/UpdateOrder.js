import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";

export default function UpdateOrder () {
    const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState);
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}} = orderDetail;
    const isPaid = paymentInfo.status === 'succeeded' ? true : false;
    const [orderStatus, setOrderStatus] = useState("Processing");
    const { id: orderId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData));
    }

    useEffect(() => {
        if (isOrderUpdated) {
            toast('Order Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            });

            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });

            return;
        }

        dispatch(orderDetailAction(orderId));
    }, [isOrderUpdated, error, dispatch]);

    useEffect(() => {
        if (orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    }, [orderDetail]);

    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-2/12">
                <Sidebar />
            </div>
            <div className="w-full shadow-lg  md:w-10/12">
                <Fragment>
                    <div className="flex flex-wrap justify-center mt-5">
                        <div className="w-full lg:w-8/12 bg-white p-6 ">
                            <h1 className="text-2xl font-semibold mb-5">Order # {orderDetail._id}</h1>

                            <h4 className="text-xl font-semibold mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>

                            <hr className="my-4" />

                            <h4 className="text-xl font-semibold my-4">Payment</h4>
                            <p className={isPaid ? 'text-green-500' : 'text-red-500'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>

                            <h4 className="text-xl font-semibold my-4">Order Status:</h4>
                            <p className={orderStatus && orderStatus.includes('Delivered') ? 'text-green-500' : 'text-red-500'}><b>{orderStatus}</b></p>

                            <h4 className="text-xl font-semibold my-4">Order Items:</h4>
                            <hr />
                            <div className="my-4">
                                {orderItems && orderItems.map(item => (
                                    <div className="flex flex-wrap my-5 border-b py-2">
                                        <div className="w-1/4 lg:w-1/6">
                                            <img src={item.image} alt={item.name} className="h-12 w-16 object-cover" />
                                        </div>

                                        <div className="w-1/2 lg:w-2/5 mt-2 lg:mt-0">
                                            <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline">{item.name}</Link>
                                        </div>

                                        <div className="w-1/4 lg:w-1/6 mt-2 lg:mt-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="w-1/4 lg:w-1/6 mt-2 lg:mt-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>

                        <div className="w-full lg:w-3/12 mt-5">
                            <h4 className="text-xl font-semibold mb-4">Order Status</h4>
                            <div className="mb-4">
                                <select 
                                    className="form-select block w-full p-2 border border-gray-300 rounded-lg"
                                    onChange={e => setOrderStatus(e.target.value)}
                                    value={orderStatus}
                                    name="status"
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>

                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
