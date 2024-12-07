import { FaStar, FaRegStar } from 'react-icons/fa';

export default function ProductReview({ reviews }) {
  return (
    <div className="w-full lg:w-3/4 mx-auto mt-8">
      <h3 className="text-2xl font-semibold text-gray-900">Other's Reviews:</h3>
      <hr className="my-4" />
      {reviews && reviews.map((review) => (
        <div key={review._id} className="my-4 p-4 border border-gray-300 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {/* Render filled stars based on the rating */}
              {[...Array(5)].map((_, index) => (
                index < review.rating ? (
                  <FaStar key={index} className="text-yellow-500" />
                ) : (
                  <FaRegStar key={index} className="text-yellow-500" />
                )
              ))}
            </div>
            <p className="text-sm text-gray-600">{review.rating} / 5</p>
          </div>
          <p className="mt-2 text-lg font-medium text-gray-800">by {review.user.name}</p>
          <p className="mt-2 text-gray-700">{review.comment}</p>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}
