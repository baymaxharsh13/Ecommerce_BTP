import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
   
    const { id: userId } = useParams();
    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState);
    const { user: authUser } = useSelector(state => state.authState);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        dispatch(updateUser(userId, formData));
    };

    useEffect(() => {
        if (isUserUpdated) {
            toast('User Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())
            });
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()); }
            });
            return;
        }

        dispatch(getUser(userId));
    }, [isUserUpdated, error, dispatch, userId]);

    useEffect(() => {
        if (user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    return (
        <div className="flex">
            <div className="w-full md:w-2/12 p-4">
                <Sidebar />
            </div>
            <div className=" w-6/12 mx-auto p-4">
                <Fragment>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <form onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="text-2xl font-semibold mb-4">Update User</h1>

                            <div className="mb-4">
                                <label htmlFor="name_field" className="block text-gray-700 font-medium">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email_field" className="block text-gray-700 font-medium">Email</label>
                                <input
                                    type="text"
                                    id="email_field"
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="role_field" className="block text-gray-700 font-medium">Role</label>
                                <select
                                    disabled={user._id === authUser._id}
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                    id="role_field"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                UPDATE
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
