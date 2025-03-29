import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!city.trim()) return;
        onSearch(city);
        setCity("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4">
            <input
                type="text"
                className="p-2 border rounded w-full"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
