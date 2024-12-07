import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return;
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return;
        }
    }, [error, isAuthenticated, dispatch, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>

                <form onSubmit={submitHandler} encType='multipart/form-data' className="space-y-6">
                    <div>
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name="name"
                            onChange={onChange}
                            type="text"
                            id="name_field"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            name="email"
                            onChange={onChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password_field" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            onChange={onChange}
                            type="password"
                            id="password_field"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="avatar_upload" className="block text-sm font-medium text-gray-700">Avatar</label>
                        <div className="flex items-center space-x-3">
                            <div>
                                <figure className="avatar">
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar"
                                        className="rounded-full w-16 h-16 object-cover"
                                    />
                                </figure>
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={onChange}
                                    id="customFile"
                                    className="hidden"
                                />
                                <label htmlFor="customFile" className="bg-indigo-600 text-white py-2 px-4 rounded-md cursor-pointer">
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                    >
                        {loading ? 'Loading...' : 'REGISTER'}
                    </button>
                </form>
            </div>
        </div>
    );
}
