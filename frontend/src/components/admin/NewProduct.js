import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isProductCreated, error } = useSelector(state => state.productState)

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('seller', seller);
        formData.append('category', category);
        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(createNewProduct(formData))
    }

    useEffect(() => {
        if (isProductCreated) {
            toast('Product Created Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/products')
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
    }, [isProductCreated, error, dispatch])


    return (
        <div className="flex">
            <div className="w-1/5">
                <Sidebar />
            </div>
            <div className="w-4/5 p-8">
                <Fragment>
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                        <form onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="text-3xl font-bold mb-6 text-center">New Product</h1>

                            <div className="mb-4">
                                <label htmlFor="name_field" className="block text-lg font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="price_field" className="block text-lg font-medium text-gray-700">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description_field" className="block text-lg font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="description_field"
                                    rows="8"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="category_field" className="block text-lg font-medium text-gray-700">Category</label>
                                <select
                                    onChange={e => setCategory(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="category_field"
                                >
                                    <option value="">Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="stock_field" className="block text-lg font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="seller_field" className="block text-lg font-medium text-gray-700">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700">Images</label>
                                <input
                                    type="file"
                                    name="product_images"
                                    className="w-full p-3 mt-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="customFile"
                                    multiple
                                    onChange={onImagesChange}
                                />
                                {imagesPreview.length > 0 && (
                                    <div className="mt-4 flex flex-wrap">
                                        {imagesPreview.map(image => (
                                            <img
                                                className="w-16 h-16 object-cover mr-2 mb-2"
                                                key={image}
                                                src={image}
                                                alt={`Image Preview`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                CREATE
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    )
}
