import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function Product({ product, col }) {
  // Calculate the average rating as a rounded number
  const avgRating = Math.round(product.ratings);

  return (
    <div className={`w-full lg:w-${col} my-3`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {product.images.length > 0 && (
          <img
            className="w-full h-64 object-contain"
            src={product.images[0].image}
            alt={product.name}
          />
        )}
        <div className="p-4">
          <h5 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="flex items-center my-2">
            {/* Display the stars for average rating */}
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) =>
                index < avgRating ? (
                  <AiFillStar key={index} className="text-yellow-400 text-lg" />
                ) : (
                  <AiOutlineStar key={index} className="text-yellow-400 text-lg" />
                )
              )}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
          <Link
            to={`/product/${product._id}`}
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
