import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Product from "../product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const { keyword } = useParams();
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

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [error, dispatch, currentPage, keyword, priceChanged, category, rating]);

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={'Buy Best Products'} />
          <h1 id="products_heading" className="text-4xl font-semibold text-center mt-5">Search Products</h1>
          <section id="products" className="container mt-10 px-4">
            <div className="flex flex-wrap justify-between gap-8">
              {/* Filter Section */}
              <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
                {/* Price Filter */}
                <div className="px-5 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Price Range</h3>
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      1000: "$1000"
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    onAfterChange={() => setPriceChanged(price)}
                    handleRender={renderProps => (
                      <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                        <div {...renderProps.props}></div>
                      </Tooltip>
                    )}
                  />
                </div>
                <hr className="my-5" />
                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Categories</h3>
                  <ul className="list-none p-0">
                    {categories.map(category =>
                      <li
                        key={category}
                        onClick={() => setCategory(category)}
                        className="cursor-pointer hover:text-blue-500 mb-2"
                      >
                        {category}
                      </li>
                    )}
                  </ul>
                </div>
                <hr className="my-5" />
               
              </div>

              {/* Product Display Section */}
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products && products.map(product => (
                    <Product col={4} key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pagination */}
          {productsCount > 0 && productsCount > resPerPage &&
            <div className="flex justify-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass={'page-item'}
                linkClass={'page-link'}
              />
            </div>
          }
        </Fragment>
      }
    </Fragment>
  );
}
