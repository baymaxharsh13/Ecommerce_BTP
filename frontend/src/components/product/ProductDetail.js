import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import Loader from '../layouts/Loader';
import { Carousel } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        const count = document.querySelector('.count');
        if (product.stock === 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };
    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber === 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData));
    };

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose();
            toast('Review Submitted successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())
            });
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id));
        }

        return () => {
            dispatch(clearProduct());
        };
    }, [dispatch, id, isReviewSubmitted, error]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="flex flex-wrap justify-center mt-8 mb-16 max-w-7xl mx-auto px-4">
                        {/* Product Images */}
                        <div className="w-full lg:w-6/12 border  m-10">
                            <Carousel pause="hover">
                                {product.images && product.images.length > 0 && product.images.map(image =>
                                    <Carousel.Item key={image._id}>
                                        <img className="w-full h-[90%] object-contain" src={image.image} alt={product.name} />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>

                        {/* Product Details */}
                        <div className="w-full lg:w-5/12 mt-5 bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-3xl font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">Product # {product._id}</p>
                            <hr className="my-4" />

                            <div className="flex items-center">
                                <div className="relative flex items-center">
                                    {/* Rating Stars */}
                                    {[...Array(5)].map((_, index) => (
                                        <i
                                            key={index}
                                            className={`fa fa-star ${index < product.ratings ? 'text-yellow-500' : 'text-gray-300'}`}
                                        ></i>
                                    ))}
                                    <span className="ml-2">{product.ratings} / 5</span>
                                </div>
                                <span className="text-gray-500 ml-2 ">({product.numOfReviews} Reviews)</span>
                            </div>

                            

                            <p className="text-2xl font-bold text-gray-900 mt-3">${product.price}</p>

                            {/* Quantity Adjuster */}
                            <div className="flex items-center my-4">
                                <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-300" onClick={decreaseQty}>-</button>
                                <input type="number" className="w-16 mx-2 text-center border-2 border-gray-300 p-2 rounded" value={quantity} readOnly />
                                <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-300" onClick={increaseQty}>+</button>
                            </div>

                            <button 
                                className="bg-blue-600 text-white px-6 py-3 rounded-full mt-4 hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
                                disabled={product.stock === 0 ? true : false}
                                onClick={() => {
                                    dispatch(addCartItem(product._id, quantity));
                                    toast('Cart Item Added!', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });
                                }}
                            >
                                Add to Cart
                            </button>

                            <hr className="my-4" />

                            {/* Product Stock Status */}
                            <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>Status: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

                            <hr className="my-4" />

                            {/* Product Description */}
                            <h4 className="mt-4 text-xl font-semibold">Description:</h4>
                            <p className="text-gray-700">{product.description}</p>

                            <hr className="my-4" />
                            <p className="font-semibold">Sold by: <span className="text-blue-600">{product.seller}</span></p>

                            {/* Review Section */}
                            {user ? (
                                <button 
                                    className="bg-yellow-600 text-white px-6 py-3 rounded-full mt-4 hover:bg-yellow-700 transition-all duration-300"
                                    onClick={handleShow}
                                >
                                    Submit Your Review
                                </button>
                            ) : (
                                <div className="alert alert-danger mt-5 text-red-600">Login to Post Review</div>
                            )}
                        </div>
                    </div>

                    {/* Product Reviews */}
                    {product.reviews && product.reviews.length > 0 ? <ProductReview reviews={product.reviews} /> : null}

                    {/* Review Modal */}
                    <div className="mt-2 mb-5">
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <li
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            onMouseOver={(e) => e.target.classList.add('text-yellow-400')}
                                            onMouseOut={(e) => e.target.classList.remove('text-yellow-400')}
                                        >
                                            <i className="fa fa-star"></i>
                                        </li>
                                    ))}
                                </ul>
                                <textarea
                                    onChange={(e) => setComment(e.target.value)}
                                    name="review"
                                    id="review"
                                    className="w-full mt-3 p-3 border-2 border-gray-300 rounded"
                                    placeholder="Write your review..."
                                ></textarea>
                                <button 
                                    disabled={loading} 
                                    onClick={reviewHandler} 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full mt-3 float-right hover:bg-blue-700 transition-all duration-300"
                                >
                                    Submit
                                </button>
                            </Modal.Body>
                        </Modal>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}
