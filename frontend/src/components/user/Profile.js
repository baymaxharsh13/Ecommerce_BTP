import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user } = useSelector(state => state.authState);

    return (
        <div className="bg-gradient-to-r from-indigo-100 via-indigo-50 to-indigo-200 min-h-screen flex justify-center items-center mt-16 px-6 lg:px-20">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center w-full md:w-1/4 text-center">
                <figure className="avatar mb-6">
                    <img
                        className="rounded-full w-40 h-40 object-cover shadow-xl border-4 border-indigo-500 transform transition-all hover:scale-110 hover:shadow-2xl"
                        src={user.avatar ?? './images/default_avatar.png'}
                        alt="Avatar"
                    />
                </figure>
                <Link
                    to="/myprofile/update"
                    className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:shadow-2xl transform hover:scale-105"
                >
                    Edit Profile
                </Link>
            </div>

            {/* User Info Section */}
            <div className="flex flex-col w-full md:w-2/3 space-y-6 text-left bg-white p-10 rounded-xl shadow-xl transform hover:scale-105 transition-all">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Information</h2>

                <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-700">Full Name</h4>
                    <p className="text-xl text-gray-800">{user.name}</p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-700">Email Address</h4>
                    <p className="text-xl text-gray-800">{user.email}</p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-700">Joined</h4>
                    <p className="text-xl text-gray-800">{String(user.createdAt).substring(0, 10)}</p>
                </div>

                <div className="space-y-4 mt-6">
                    <Link
                        to="/orders"
                        className="bg-red-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105 w-full max-w-xs mx-auto"
                    >
                        My Orders
                    </Link>

                    <Link
                        to="/myprofile/update/password"
                        className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105 w-full max-w-xs mx-auto"
                    >
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    );
}
