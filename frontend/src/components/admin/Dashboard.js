import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from '../../actions/userActions';
import { adminOrders as adminOrdersAction } from '../../actions/orderActions';
import { Link } from "react-router-dom";

export default function Dashboard () {
    const { products = [] } = useSelector(state => state.productsState);
    const { adminOrders = [] } = useSelector(state => state.orderState);
    const { users = [] } = useSelector(state => state.userState);
    const dispatch = useDispatch();
    let outOfStock = 0;

    if (products.length > 0) {
        products.forEach(product => {
            if (product.stock === 0) {
                outOfStock = outOfStock + 1;
            }
        })
    }

    let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach(order => {
            totalAmount += order.totalPrice;
        })
    }

    useEffect(() => {
        dispatch(getAdminProducts);
        dispatch(getUsers);
        dispatch(adminOrdersAction);
    }, [])

    return (
        <div className="flex flex-row">
            <div className="w-1/5">
                <Sidebar />
            </div>
            <div className="w-4/5 p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Amount Card */}
                    <div className="col-span-1 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Total Amount<br /><b>${totalAmount}</b></div>
                    </div>

                    {/* Products Card */}
                    <div className="col-span-1 bg-green-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Products<br /><b>{products.length}</b></div>
                        <Link to="/admin/products" className="block mt-4 text-center text-white hover:bg-green-700 rounded-lg py-2">
                            View Details
                        </Link>
                    </div>

                    {/* Orders Card */}
                    <div className="col-span-1 bg-red-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Orders<br /><b>{adminOrders.length}</b></div>
                        <Link to="/admin/orders" className="block mt-4 text-center text-white hover:bg-red-700 rounded-lg py-2">
                            View Details
                        </Link>
                    </div>

                    {/* Users Card */}
                    <div className="col-span-1 bg-teal-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Users<br /><b>{users.length}</b></div>
                        <Link to="/admin/users" className="block mt-4 text-center text-white hover:bg-teal-700 rounded-lg py-2">
                            View Details
                        </Link>
                    </div>

                    {/* Out of Stock Card */}
                    <div className="col-span-1 bg-yellow-600 text-white p-6 rounded-lg shadow-lg">
                        <div className="text-center text-xl">Out of Stock<br /><b>{outOfStock}</b></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
