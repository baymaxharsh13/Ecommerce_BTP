import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Loader from '../layouts/Loader';
import { toast } from 'react-toastify';
import Sidebar from "./Sidebar";

export default function ProductList() {
    const { products = [], loading = true, error } = useSelector(state => state.productsState);
    const { isProductDeleted, error: productError } = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error || productError) {
            toast(error || productError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) },
            });
            return;
        }

        if (isProductDeleted) {
            toast('Product Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductDeleted()),
            });
            return;
        }

        dispatch(getAdminProducts);
    }, [dispatch, error, isProductDeleted]);

    return (
        <div className="flex">
            <div className="w-full md:w-2/12 p-4">
                <Sidebar />
            </div>
            <div className="w-full md:w-10/12 p-4">
                <h1 className="text-4xl font-semibold mb-4">Product List</h1>
                <Fragment>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="px-6 py-3 border-b text-lg font-medium text-gray-700">ID</th>
                                        <th className="px-6 py-3 border-b text-lg font-medium text-gray-700">Name</th>
                                        <th className="px-6 py-3 border-b text-lg font-medium text-gray-700">Price</th>
                                        <th className="px-6 py-3 border-b text-lg font-medium text-gray-700">Stock</th>
                                        <th className="px-6 py-3 border-b text-lg font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-3 text-lg text-gray-600">{product._id}</td>
                                            <td className="px-6 py-3 text-lg text-gray-600">{product.name}</td>
                                            <td className="px-6 py-3 text-lg text-gray-600">${product.price}</td>
                                            <td className="px-6 py-3 text-lg text-gray-600">{product.stock}</td>
                                            <td className="px-6 py-3 text-lg text-gray-600">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/admin/product/${product._id}`}
                                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </Link>
                                                    <Button
                                                        onClick={(e) => deleteHandler(e, product._id)}
                                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </Button>
                                                </div>
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
    );
}
