import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Loader from '../layouts/Loader';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"

export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        adminOrders.forEach( order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `$${order.totalPrice}`,
                status: <p className={`text-${order.orderStatus.includes('Processing') ? 'red' : 'green'}-500`}>{order.orderStatus}</p>,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary text-white py-2 px-4 rounded-lg">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-3 ml-2 rounded-lg">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isOrderDeleted) {
            toast('Order Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }

        dispatch(adminOrdersAction)
    },[dispatch, error, isOrderDeleted])

    return (
        <div className="flex flex-row">
            <div className="w-full md:w-2/12">
                <Sidebar />
            </div>
            <div className="w-full md:w-10/12 px-4">
                <h1 className="my-6 text-4xl font-bold">Order List</h1>
                <Fragment>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-lg font-semibold text-left text-gray-700">ID</th>
                                        <th className="px-6 py-4 text-lg font-semibold text-left text-gray-700">Number of Items</th>
                                        <th className="px-6 py-4 text-lg font-semibold text-left text-gray-700">Amount</th>
                                        <th className="px-6 py-4 text-lg font-semibold text-left text-gray-700">Status</th>
                                        <th className="px-6 py-4 text-lg font-semibold text-left text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminOrders.map((order) => (
                                        <tr key={order._id} className="bg-white border-b hover:bg-gray-200 transition duration-300 ease-in-out">
                                            <td className="px-6 py-4 text-lg font-medium text-gray-900">{order._id}</td>
                                            <td className="px-6 py-4 text-lg font-medium text-gray-500">{order.orderItems.length}</td>
                                            <td className="px-6 py-4 text-lg font-medium text-gray-500">${order.totalPrice}</td>
                                            <td className="px-6 py-4 text-lg font-medium text-gray-500">
                                                <p className={`text-${order.orderStatus.includes('Processing') ? 'red' : 'green'}-500`}>
                                                    {order.orderStatus}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-lg font-medium text-gray-500">
                                                <Link to={`/admin/order/${order._id}`} className="inline-block py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                    <i className="fa fa-pencil"></i>
                                                </Link>
                                                <Button onClick={(e) => deleteHandler(e, order._id)} className="inline-block py-2 px-4 bg-red-600 text-white rounded-lg ml-2 hover:bg-red-700">
                                                    <i className="fa fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Fragment>
            </div>
        </div>
    )
}
