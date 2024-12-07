import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleProductDropdown = () => {
        setIsProductDropdownOpen(!isProductDropdownOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`bg-gradient-to-r from-blue-800 to-indigo-800 text-white min-h-screen p-6 shadow-lg rounded-r-3xl transition-all duration-300 ease-in-out transform ${isSidebarOpen ? 'w-64' : 'w-0'} md:w-64 md:flex-none`}>
                <nav id="sidebar" className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                    <ul className="space-y-6">
                        {/* Dashboard Link */}
                        <li>
                            <Link to="/admin/dashboard" className="flex items-center space-x-4 text-lg hover:bg-indigo-700 hover:text-white p-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105">
                                <i className="fas fa-tachometer-alt text-2xl"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        {/* Product Dropdown */}
                        <li>
                            <button
                                onClick={toggleProductDropdown}
                                className="flex items-center space-x-2 text-lg w-full text-left hover:bg-indigo-600 p-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                <i className="fa fa-product-hunt text-2xl"></i>
                                <span>Product</span>
                                <i className={`fa ${isProductDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'} ml-auto text-xl`}></i>
                            </button>
                            {isProductDropdownOpen && (
                                <ul className="space-y-2 ml-6">
                                    <li>
                                        <Link
                                            to="/admin/products"
                                            className="flex items-center space-x-4 text-lg hover:bg-indigo-400 hover:text-white p-3 rounded-md transition duration-200 ease-in-out"
                                        >
                                            <i className="fa fa-shopping-basket text-lg"></i>
                                            <span>All</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/products/create"
                                            className="flex items-center space-x-4 text-lg hover:bg-indigo-400 hover:text-white p-3 rounded-md transition duration-200 ease-in-out"
                                        >
                                            <i className="fa fa-plus text-lg"></i>
                                            <span>Create</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Orders Link */}
                        <li>
                            <Link to="/admin/orders" className="flex items-center space-x-4 text-lg hover:bg-indigo-600 hover:text-white p-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105">
                                <i className="fa fa-shopping-basket text-2xl"></i>
                                <span>Orders</span>
                            </Link>
                        </li>

                        {/* Users Link */}
                        <li>
                            <Link to="/admin/users" className="flex items-center space-x-4 text-lg hover:bg-indigo-600 hover:text-white p-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105">
                                <i className="fa fa-users text-2xl"></i>
                                <span>Users</span>
                            </Link>
                        </li>

                        {/* Reviews Link */}
                        <li>
                            <Link to="/admin/reviews" className="flex hover:text-white items-center space-x-4 text-lg hover:bg-indigo-600 p-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105">
                                <i className="fa fa-star text-2xl"></i>
                                <span>Reviews</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 md:hidden p-3 bg-indigo-700 text-white rounded-full shadow-lg"
                >
                    <i className={`fa ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6">
                {/* Your main content goes here */}
            </div>
        </div>
    );
}
