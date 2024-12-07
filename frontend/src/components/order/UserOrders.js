import { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

export default function UserOrders() {
  const { userOrders = [] } = useSelector(state => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: 'id',
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: 'numOfItems',
          sort: "asc",
        },
        {
          label: "Amount",
          field: 'amount',
          sort: "asc",
        },
        {
          label: "Status",
          field: 'status',
          sort: "asc",
        },
        {
          label: "Actions",
          field: 'actions',
          sort: "asc",
        }
      ],
      rows: [],
    };

    userOrders.forEach(userOrder => {
      data.rows.push({
        id: userOrder._id,
        numOfItems: userOrder.orderItems.length,
        amount: `$${userOrder.totalPrice}`,
        status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ? (
          <p className="text-green-500">{userOrder.orderStatus}</p>
        ) : (
          <p className="text-red-500">{userOrder.orderStatus}</p>
        ),
        actions: (
          <Link
            to={`/order/${userOrder._id}`}
            className="btn btn-primary py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title="My Orders" />
      <h1 className="mt-5 text-3xl font-semibold text-gray-800">My Orders</h1>
      <div className="mt-6 overflow-x-auto">
        <MDBDataTable
          className="px-3 shadow-md rounded-lg w-full"
          bordered
          striped
          hover
          data={setOrders()}
        />
      </div>
    </Fragment>
  );
}
