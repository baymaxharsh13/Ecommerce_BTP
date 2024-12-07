import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage, 6)); // 6 products per page
  }, [error, dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* Meta Data */}
          <MetaData title={"Buy Best Products"} />

          {/* Hero Section */}
          <div className="relative bg-gray-800 text-white text-center py-24 px-4 md:px-12">
            <img
              src="https://www.click.co.uk/wp-content/uploads/2021/09/Digital-Marketing-for-eCommerce-SEO-blog-hero-image-1600x700.png"
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 max-w-screen-lg mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Discover the Best Deals
              </h1>
              <p className="text-xl mb-6">
                Shop from a wide range of products at unbeatable prices.
              </p>
              <button className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>

      

          {/* Featured Products */}
          <section className="container my-12 px-4 md:px-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products &&
                products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                  >
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="bg-gray-100 py-12">
  <div className="container px-4 md:px-8">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
      What Our Customers Say
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          testimonial: "Great quality and service!",
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: 5,
        },
        {
          testimonial: "Fast delivery and amazing products!",
          name: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 4,
        },
        {
          testimonial: "Affordable prices for high-quality items!",
          name: "Sam Wilson",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          rating: 5,
        },
      ].map(({ testimonial, name, avatar, rating }, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          <div className="flex items-center mb-4">
            <img
              src={avatar}
              alt={`${name}'s Avatar`}
              className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`${
                      i < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600 italic">"{testimonial}"</p>
        </div>
      ))}
    </div>
  </div>
</section>

          {/* Newsletter Section */}
          <section className="container my-12 px-4 md:px-8">
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Stay updated with the latest deals and offers.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-md border border-gray-300 w-full md:w-auto md:mr-4 mb-4 md:mb-0"
              />
              <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                Subscribe
              </button>
            </div>
          </section>

          {/* Pagination Section */}
          {productsCount > 6 && (
            <div className="flex justify-center mt-10">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={6}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="inline-block mx-1 px-3 py-2 border rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 transition duration-300"
                linkClass="page-link"
                activeClass="bg-blue-500 text-white"
                innerClass="flex space-x-2"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
