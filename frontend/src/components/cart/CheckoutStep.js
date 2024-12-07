import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
    return (
        <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-12 mt-8">
            {/* Shipping Step */}
            {shipping ? (
                <Link to="/shipping" className="flex items-center group transform hover:scale-105 transition-all">
                    <div className="w-5 h-5 bg-green-600 rounded-full group-hover:ring-4 group-hover:ring-green-600 transition-all"></div>
                    <div className="ml-3 text-lg font-semibold text-green-600 group-hover:text-green-700 transition-all">Shipping Info</div>
                </Link>
            ) : (
                <Link to="/shipping" className="flex items-center group transform hover:scale-105 transition-all">
                    <div className="w-5 h-5 bg-gray-400 rounded-full group-hover:ring-4 group-hover:ring-gray-400 transition-all"></div>
                    <div className="ml-3 text-lg font-semibold text-gray-400 group-hover:text-gray-500 transition-all">Shipping Info</div>
                </Link>
            )}

            {/* Confirm Order Step */}
            {confirmOrder ? (
                <Link to="/order/confirm" className="flex items-center group transform hover:scale-105 transition-all">
                    <div className="w-5 h-5 bg-green-600 rounded-full group-hover:ring-4 group-hover:ring-green-600 transition-all"></div>
                    <div className="ml-3 text-lg font-semibold text-green-600 group-hover:text-green-700 transition-all">Confirm Order</div>
                </Link>
            ) : (
                <Link to="/order/confirm" className="flex items-center group transform hover:scale-105 transition-all">
                    <div className="w-5 h-5 bg-gray-400 rounded-full group-hover:ring-4 group-hover:ring-gray-400 transition-all"></div>
                    <div className="ml-3 text-lg font-semibold text-gray-400 group-hover:text-gray-500 transition-all">Confirm Order</div>
                </Link>
            )}

            {/* Payment Step */}
            {payment ? (
                <Link to="/payment" className="flex items-center group transform hover:scale-105 transition-all">
                    <div className="w-5 h-5 bg-green-600 rounded-full group-hover:ring-4 group-hover:ring-green-600 transition-all"></div>
                    <div className="ml-3 text-lg font-semibold text-green-600 group-hover:text-green-700 transition-all">Payment</div>
                </Link>
            ) : (
                <Link to="/payment" className="flex items-center group transform hover:scale-105 transition-all">
                    <div className="w-5 h-5 bg-gray-400 rounded-full group-hover:ring-4 group-hover:ring-gray-400 transition-all"></div>
                    <div className="ml-3 text-lg font-semibold text-gray-400 group-hover:text-gray-500 transition-all">Payment</div>
                </Link>
            )}
        </div>
    );
}
