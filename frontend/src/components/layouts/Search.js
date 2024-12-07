import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`);
    };

    const clearKeyword = () => {
        setKeyword("");
    };

    useEffect(() => {
        if(location.pathname === '/') {
            clearKeyword();
        }
    }, [location]);

    return (
        <form onSubmit={searchHandler} className="w-full md:w-96 flex items-center">
            <div className="flex w-full">
                <input
                    type="text"
                    id="search_field"
                    className="w-full py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => { setKeyword(e.target.value); }}
                    value={keyword}
                />
                <button
                    type="submit"
                    id="search_btn"
                    className="py-2 px-4 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition duration-300"
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    );
}
