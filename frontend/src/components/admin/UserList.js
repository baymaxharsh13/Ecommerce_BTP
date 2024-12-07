import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteUser, getUsers } from "../../actions/userActions"
import { clearError, clearUserDeleted } from "../../slices/userSlice"
import Loader from '../layouts/Loader';
import {toast} from 'react-toastify'
import Sidebar from "./Sidebar"

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState)

    const dispatch = useDispatch()

    const setUsers = () => {
        return users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            actions: (
                <Fragment>
                    <Link
                        to={`/admin/user/${user._id}`}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <Button
                        onClick={(e) => deleteHandler(e, user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded ml-2 hover:bg-red-700"
                    >
                        <i className="fa fa-trash"></i>
                    </Button>
                </Fragment>
            )
        }))
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (isUserDeleted) {
            toast('User Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())
            })
            return
        }

        dispatch(getUsers)
    }, [dispatch, error, isUserDeleted])

    return (
        <div className="flex flex-row">
            <div className="w-full md:w-2/12">
                <Sidebar />
            </div>
            <div className="w-full md:w-10/12 px-4">
                <h1 className="my-6 text-4xl font-bold">User List</h1>
                <Fragment>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-lg font-semibold text-left text-gray-700">ID</th>
                                        <th className="px-6 py-3 text-lg font-semibold text-left text-gray-700">Name</th>
                                        <th className="px-6 py-3 text-lg font-semibold text-left text-gray-700">Email</th>
                                        <th className="px-6 py-3 text-lg font-semibold text-left text-gray-700">Role</th>
                                        <th className="px-6 py-3 text-lg font-semibold text-left text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {setUsers().map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-200 transition-all duration-300">
                                            <td className="px-6 py-4 text-lg text-gray-900">{user.id}</td>
                                            <td className="px-6 py-4 text-lg text-gray-600">{user.name}</td>
                                            <td className="px-6 py-4 text-lg text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4 text-lg text-gray-600">{user.role}</td>
                                            <td className="px-6 py-4 text-lg text-gray-600">{user.actions}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Fragment>
            </div>
        </div>
    )
}
