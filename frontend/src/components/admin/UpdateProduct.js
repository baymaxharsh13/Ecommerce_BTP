import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function UpdateProduct () {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);
    const [imagesPreview, setImagesPreview] = useState([]);
    const { id:productId } = useParams();
    
    const { loading, isProductUpdated, error, product } = useSelector( state => state.productState)

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
                if(reader.readyState == 2 ) {
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
        formData.append('name' , name);
        formData.append('price' , price);
        formData.append('stock' , stock);
        formData.append('description' , description);
        formData.append('seller' , seller);
        formData.append('category' , category);
        images.forEach (image => {
            formData.append('images', image)
        })
        formData.append('imagesCleared' , imagesCleared);
        dispatch(updateProduct(productId, formData))
    }

    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }

    useEffect(() => {
        if(isProductUpdated) {
            toast('Product Updated Successfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductUpdated())
            })
            setImages([]) // Clear images after successful update
            return;
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

        dispatch(getProduct(productId))
    }, [isProductUpdated, error, dispatch])

    useEffect(() => {
        if(product._id) {
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setSeller(product.seller);
            setCategory(product.category);
            
            let images = [];
            product.images.forEach( image => {
                images.push(image.image)
            });
            setImagesPreview(images)
        }
    }, [product])

    return (
        <div className="flex">
            <div className="w-1/4">
                <Sidebar/>
            </div>
            <div className="w-3/4 p-6 m-4 border bg-white shadow-md rounded-lg">
                <Fragment>
                    <form onSubmit={submitHandler} className="space-y-6" encType="multipart/form-data">
                        <h1 className="text-3xl font-semibold mb-4">Update Product</h1>

                        <div className="space-y-2">
                            <label htmlFor="name_field" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="price_field" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="text"
                                id="price_field"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description_field" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="description_field"
                                rows="6"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category_field" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="category_field"
                            >
                                <option value="">Select</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="stock_field" className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                id="stock_field"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={e => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="seller_field" className="block text-sm font-medium text-gray-700">Seller Name</label>
                            <input
                                type="text"
                                id="seller_field"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={e => setSeller(e.target.value)}
                                value={seller}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Images</label>
                            <input
                                type="file"
                                name="product_images"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="customFile"
                                multiple
                                onChange={onImagesChange}
                            />
                            <div className="flex mt-4 space-x-2">
                                {imagesPreview.length > 0 && (
                                    <span onClick={clearImagesHandler} className="cursor-pointer text-red-600">
                                        <i className="fa fa-trash"></i> Clear Images
                                    </span>
                                )}
                                {imagesPreview.map(image => (
                                    <img
                                        key={image}
                                        className="w-16 h-16 object-cover"
                                        src={image}
                                        alt="Image Preview"
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            UPDATE
                        </button>
                    </form>
                </Fragment>
            </div>
        </div>
    )
}
